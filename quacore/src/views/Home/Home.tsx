import React, { useCallback, useEffect, useRef, useState } from "react";
import { addQuack, getQuacksFeed } from "../../api/apiQuacks";
import Quack from "../../components/Quack/Quack";
import QuackInput from "../../components/QuackInput/QuackInput";
import QuacoreLayout from "../../components/QuacoreLayout/QuacoreLayout";
import { Quack as QuackType, GetFeedResponse } from "../../types/types";
import "./home.scss";

const Home = () => {
  const [quackInputValue, setQuackInputValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(quackInputValue === "");
  const [quacksFeed, setQuacksFeed] = useState<QuackType[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const lastQuackVisibleObserver = useRef<IntersectionObserver>();
  const isLoading = useRef(false);
  const areAnyQuacksLeft = useRef(true);

  const quackObserverHandler = useCallback((element: HTMLDivElement | null) => {
    if (!areAnyQuacksLeft.current) return;

    if (!element) {
      lastQuackVisibleObserver.current?.disconnect();
      return;
    }
    if (isLoading.current) return;
    if (lastQuackVisibleObserver.current === undefined) {
      lastQuackVisibleObserver.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lastQuackVisibleObserver.current?.disconnect();
            setShouldFetch(true);
          }
        },
        { rootMargin: "300px" }
      );
    }
    lastQuackVisibleObserver.current.observe(element);
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;

    isLoading.current = true;
    getQuacksFeed(quacksFeed[quacksFeed.length - 1]?.id)
      .then((response) => response.json())
      .then((response: GetFeedResponse) => {
        setShouldFetch(false);
        isLoading.current = false;
        areAnyQuacksLeft.current = response.areAnyQuacksLeft;
        setQuacksFeed((quacksFeed) => [...quacksFeed, ...response.quacks]);
      });
  }, [shouldFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuackInputValue(e.target.value);
    setButtonDisabled(e.target.value === "");
  };

  const submitQuackHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addQuack(quackInputValue)
      .then((response) => response.json())
      .then((response) => {
        setQuacksFeed((quacksFeed) => [response, ...quacksFeed]);
      });
    setQuackInputValue("");
    setButtonDisabled(true);
  };

  return (
    <QuacoreLayout>
      <>
        <QuackInput
          content={quackInputValue}
          changeHandler={changeHandler}
          submitQuackHandler={submitQuackHandler}
          buttonDisabled={buttonDisabled}
        />
        {quacksFeed.map((quack, index) => (
          <Quack
            key={quack.id}
            quack={quack}
            ref={index === quacksFeed.length - 1 ? quackObserverHandler : null}
          />
        ))}
      </>
    </QuacoreLayout>
  );
};

export default Home;

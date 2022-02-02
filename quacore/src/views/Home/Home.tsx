import React, { useCallback, useEffect, useRef, useState } from "react";
import { addQuack, getQuacksFeed } from "../../api/apiQuacks";
import NavBar from "../../components/NavBar/NavBar";
import Quack from "../../components/Quack/Quack";
import QuackInput from "../../components/QuackInput/QuackInput";
import { Quack as QuackType } from "../../types/types";
import "./home.scss";

const Home = () => {
  const [quackInputValue, setQuackInputValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(quackInputValue === "");
  const [quacksFeed, setQuacksFeed] = useState<QuackType[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const lastQuackVisibleObserver = useRef<IntersectionObserver>();
  const isLoading = useRef(false);

  const quackObserverHandler = useCallback((element: HTMLDivElement | null) => {
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
      .then((response) => {
        setShouldFetch(false);
        isLoading.current = false;
        setQuacksFeed((quacksFeed) => [...quacksFeed, ...response.quacks]);
      });
  }, [shouldFetch]);

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
    <div className="home">
      <NavBar />
      <div className="home-feed-wrapper">
        <div className="home-feed">
          <QuackInput
            content={quackInputValue}
            changeHandler={changeHandler}
            submitQuackHandler={submitQuackHandler}
            buttonDisabled={buttonDisabled}
          />
          {quacksFeed.map((quack, index) => (
            <Quack
              key={index}
              createdAt={quack.createdAt}
              user={quack.username}
              content={quack.content}
              ref={
                index === quacksFeed.length - 1 ? quackObserverHandler : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

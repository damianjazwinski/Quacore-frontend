import React, { useCallback, useEffect, useRef, useState } from "react";
import { addQuack, getQuacksFeed } from "../../api/apiQuacks";
import NavBar from "../../components/NavBar/NavBar";
import Quack from "../../components/Quack/Quack";
import QuackInput from "../../components/QuackInput/QuackInput";
import "./home.scss";

const Home = () => {
  const [quackInputValue, setQuackInputValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(quackInputValue === "");
  const [quacksFeed, setQuacksFeed] = useState<any[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const lastQuackVisibleObserver = useRef<IntersectionObserver>();

  const quackObserverHandler = useCallback(() => {
    lastQuackVisibleObserver.current = new IntersectionObserver((entires) => {
      if (entires[0].isIntersecting && true) {
        setShouldFetch(true);
        setIsLoading(true);
      }
    });
  }, []); // teraz trzeba to serio zaobserwować

  useEffect(() => {
    if (!shouldFetch) return;

    getQuacksFeed(quacksFeed[quacksFeed.length - 1])
      .then((response) => response.json())
      .then((response) =>
        setQuacksFeed((quacksFeed) => [...quacksFeed, ...response.quacks])
      );
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
            <>
              <Quack
                key={index}
                createdAt={quack.createdAt}
                user={quack.username}
                content={quack.content}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

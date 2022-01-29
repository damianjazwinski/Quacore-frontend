import React from "react";
import "./quack.scss";

type QuackProps = {
  user: string;
  createdAt: Date;
  content: string;
  ref?: any;
};

const Quack = ({ user, createdAt, content, ref }: QuackProps) => {
  return (
    <div className="quack" ref={ref}>
      <div className="quack-top">
        <span className="quack-user">{user}</span>
        <span>•</span>
        <span className="quack-timestamp">{createdAt}</span>
      </div>
      <div className="quack-body">{content}</div>
    </div>
  );
};

export default Quack;

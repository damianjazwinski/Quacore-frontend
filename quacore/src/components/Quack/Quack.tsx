import React from "react";
import "./quack.scss";

type QuackProps = {
  user: string;
  createdAt: Date;
  content: string;
};

const Quack = ({ user, createdAt, content }: QuackProps) => {
  return (
    <div className="quack">
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

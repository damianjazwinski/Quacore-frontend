import { TextField } from "@mui/material";
import React from "react";
import "./quack-input.scss";

type QuackInputProps = {
  content: string;
  changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  submitQuackHandler: React.FormEventHandler<HTMLFormElement>;
  buttonDisabled: boolean;
};

const QuackInput = ({
  content,
  changeHandler,
  submitQuackHandler,
  buttonDisabled,
}: QuackInputProps) => {
  return (
    <div className="quack-input">
      <form onSubmit={submitQuackHandler}>
        <div className="quack-input-area">
          <textarea
            placeholder="Quack something..."
            maxLength={420}
            onChange={changeHandler}
            value={content}
          />
        </div>
        <div className="quack-input-button">
          <button type="submit" disabled={buttonDisabled}>
            Quack!
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuackInput;

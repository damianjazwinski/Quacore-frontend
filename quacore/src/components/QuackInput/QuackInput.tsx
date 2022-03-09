import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Profile as ProfileType } from "../../types/types";
import { getProfile } from "../../api/apiProfiles";
import "./quack-input.scss";
import jwt_decode from "jwt-decode";
import { getUsernameFromClaims } from "../../helpers/getUserInfo";
import { Link } from "react-router-dom";

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
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    getProfile(getUsernameFromClaims())
      .then((response) => response.json())
      .then((response) => setProfile(response));
  }, []);

  return (
    <div className="quack-input">
      <form onSubmit={submitQuackHandler}>
        <div className="quack-input-profile">
          <Link to={`profile/${profile?.username!}`}>
            <img alt="p_f" src={profile?.avatarImageLink!} />
          </Link>
        </div>
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

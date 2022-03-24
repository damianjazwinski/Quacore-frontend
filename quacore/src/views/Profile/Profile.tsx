import React, { useEffect, useState } from "react";
import "./profile.scss";
import QuacoreLayout from "../../components/QuacoreLayout/QuacoreLayout";
import { getProfile } from "../../api/apiProfiles";
import { useParams } from "react-router-dom";
import { Profile as ProfileType, Quack as QuackType } from "../../types/types";
import moment from "moment";
import Quack from "../../components/Quack/Quack";
import { getQuacksFeedForUser } from "../../api/apiQuacks";
import { Button } from "@mui/material";
import { getUsernameFromClaims } from "../../helpers/getUserInfo";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const [quacks, setQuacks] = useState<QuackType[]>([]);
  const { username } = useParams();
  //__________________________________________________________
  useEffect(() => {
    (async () => {
      const response = await getProfile(username!);
      const profile = await response.json();
      setProfile(profile);
      // quacks fetching
      const quackResponse = await getQuacksFeedForUser(username!);
      const quacksData = await quackResponse.json();
      setQuacks(quacksData.quacks);
    })();
  }, [username]);
  //____________________________________________________
  function generateButton(): React.ReactNode {
    if (getUsernameFromClaims() === username)
      return <Button variant="contained">Edit</Button>;
    else return <Button variant="contained">Follow</Button>;
  }
  //____________________________________________________________
  return (
    <QuacoreLayout className="profile">
      <>
        <div className="profile-banner">
          {profile?.bannerImageLink ? (
            <img src={profile?.bannerImageLink!} alt="Banner" />
          ) : (
            <div className="profile-banner-placeholder"></div>
          )}
        </div>
        <div className="profile-header">
          <div className="profile-header-avatar">
            {profile?.avatarImageLink ? (
              <img src={profile?.avatarImageLink!} alt="Avatar" />
            ) : (
              <div className="profile-header-avatar-placeholder"></div>
            )}
          </div>
          <div className="profile-header-texts">
            <h1 className="profile-header-texts-username">
              {profile?.username}
            </h1>
            <div className="profile-header-texts-description">
              {profile?.description}
            </div>
          </div>
          <div className="profile-header-button">{generateButton()}</div>
        </div>
        <div className="profile-stats">
          <div className="profile-stats-followers">
            <span>
              <b>420</b>&nbsp;
            </span>
            <span>Followers</span>
          </div>
          <div className="profile-stats-followees">
            <span>
              <b>710</b>&nbsp;
            </span>
            <span>Followees</span>
          </div>
          <div className="profile-stats-joined">
            <span>Joined </span>
            <span>
              <b>{moment(profile?.joinDate).format("DD.MM.YYYY")}</b>
            </span>
          </div>
        </div>
        <div className="profile-feed">
          {quacks.map((quack, index) => (
            <Quack quack={quack} key={quack.id} />
          ))}
        </div>
      </>
    </QuacoreLayout>
  );
};

export default Profile;

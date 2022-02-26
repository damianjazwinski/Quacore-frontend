import React, { useCallback, useEffect, useRef, useState } from "react";
import "./profile.scss";
import NavBar from "../../components/NavBar/NavBar";
import QuacoreLayout from "../../components/QuacoreLayout/QuacoreLayout";
import { getProfile } from "../../api/apiProfiles";
import { useParams } from "react-router-dom";
import { Profile as ProfileType } from "../../types/types";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const { username } = useParams();

  useEffect(() => {
    getProfile(username!)
      .then((response) => response.json())
      .then((profile) => setProfile(profile));
  }, []);

  return (
    <QuacoreLayout className="profile">
      <>
        <div className="profile-banner">
          {profile?.bannerImageLink ? (
            <img src={profile?.bannerImageLink!} alt="Banner image." />
          ) : (
            <div className="profile-banner-placeholder"></div>
          )}
        </div>
        <div className="profile-header">
          <div className="profile-header-avatar">
            {profile?.avatarImageLink ? (
              <img src={profile?.avatarImageLink!} alt="Avatar image." />
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
        </div>
        <div className="profile-stats"></div>
      </>
    </QuacoreLayout>
  );
};

export default Profile;

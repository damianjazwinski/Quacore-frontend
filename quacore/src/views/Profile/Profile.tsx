import React, { useCallback, useEffect, useRef, useState } from "react";
import "./profile.scss";
import QuacoreLayout from "../../components/QuacoreLayout/QuacoreLayout";
import { editProfile, getProfile } from "../../api/apiProfiles";
import { useParams } from "react-router-dom";
import {
  Profile as ProfileType,
  Quack as QuackType,
  GetFeedResponse,
} from "../../types/types";
import moment from "moment";
import Quack from "../../components/Quack/Quack";
import { getQuacksFeedForUser } from "../../api/apiQuacks";
import { Button } from "@mui/material";
import { getUsernameFromClaims } from "../../helpers/getUserInfo";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const [quacks, setQuacks] = useState<QuackType[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const lastQuackVisibleObserver = useRef<IntersectionObserver>();
  const isLoading = useRef(false);
  const areAnyQuacksLeft = useRef(true);

  const { username } = useParams();

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

  //__________________________________________________________
  useEffect(() => {
    (async () => {
      const response = await getProfile(username!);
      const profile = await response.json();
      setProfile(profile);
    })();
  }, [username]);

  useEffect(() => {
    if (!shouldFetch) return;
    isLoading.current = true;
    (async () => {
      const quackResponse = await getQuacksFeedForUser(
        username!,
        quacks[quacks.length - 1]?.id
      );
      const quacksData: GetFeedResponse = await quackResponse.json();
      setShouldFetch(false);
      isLoading.current = false;
      areAnyQuacksLeft.current = quacksData.areAnyQuacksLeft;
      setQuacks([...quacks, ...quacksData.quacks]);
    })();
  }, [username, shouldFetch, quacks]);

  const editProfileHandler = () => {
    setIsDialogOpen(true);
  };

  const closeEditProfileDialogHandler = () => {
    setIsDialogOpen(false);
  };

  const submitProfileFormHandler = (data: any) => {
    setIsDialogOpen(false);

    editProfile(
      profile?.username!,
      data.description,
      data.avatarImageLink,
      data.bannerImageLink
    )
      .then((response) => response.json())
      .then((dataResponse: ProfileType) => {
        setProfile(dataResponse);
      });
    // rozkminić flow wysłania danych edytujących profil i chuj
  };

  //____________________________________________________
  function generateButton(): React.ReactNode {
    if (getUsernameFromClaims() === username)
      return (
        <Button variant="contained" onClick={editProfileHandler}>
          Edit
        </Button>
      );
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
            <Quack
              quack={quack}
              key={quack.id}
              ref={index === quacks.length - 1 ? quackObserverHandler : null}
            />
          ))}
        </div>
        <EditProfileDialog
          isDialogOpen={isDialogOpen}
          onCloseHandler={closeEditProfileDialogHandler}
          onSubmitHandler={submitProfileFormHandler}
          profile={profile}
        />
      </>
    </QuacoreLayout>
  );
};

export default Profile;

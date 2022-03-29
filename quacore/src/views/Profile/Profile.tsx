import React, { useCallback, useEffect, useRef, useState } from "react";
import "./profile.scss";
import QuacoreLayout from "../../components/QuacoreLayout/QuacoreLayout";
import { getProfile } from "../../api/apiProfiles";
import { useParams } from "react-router-dom";
import {
  Profile as ProfileType,
  Quack as QuackType,
  GetFeedResponse,
} from "../../types/types";
import moment from "moment";
import Quack from "../../components/Quack/Quack";
import { getQuacksFeedForUser } from "../../api/apiQuacks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { getUsernameFromClaims } from "../../helpers/getUserInfo";
import { Controller, useForm } from "react-hook-form";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const [quacks, setQuacks] = useState<QuackType[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});
  console.log(profile);
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
      fillEditFormWithStateData();
    })();
  }, [username]);

  const fillEditFormWithStateData = useCallback(() => {
    setValue("description", profile?.description);
    setValue("avatarImageLink", profile?.avatarImageLink);
    setValue("bannerImageLink", profile?.bannerImageLink);
  }, [profile]);

  useEffect(() => {
    console.log(shouldFetch);
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
      setQuacks(quacksData.quacks);
    })();
  }, [username, shouldFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const editProfileHandler = () => {
    setIsDialogOpen(true);
  };

  const closeEditProfileDialogHandler = () => {
    setIsDialogOpen(false);
    fillEditFormWithStateData();
  };

  const submitProfileFormHandler = (data: any) => {
    console.log(data);
    setIsDialogOpen(false);
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
        <Dialog
          open={isDialogOpen}
          onClose={closeEditProfileDialogHandler}
          maxWidth="sm"
          fullWidth
        >
          <form
            onSubmit={handleSubmit(submitProfileFormHandler)}
            id="edit-profile-dialog-form"
          >
            <DialogTitle>Edit profile</DialogTitle>
            <DialogContent>
              <div className="form-controls-wrapper">
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant="outlined"
                      multiline
                      label="Description"
                      rows={3}
                      id="description-edit-input"
                      margin="dense"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />

                <Controller
                  name="avatarImageLink"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant="outlined"
                      label="Avatar"
                      id="avatarImageLink-edit-input"
                      margin="dense"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  name="bannerImageLink"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant="outlined"
                      label="Banner"
                      id="bannerImageLink-edit-input"
                      margin="dense"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Save</Button>
              <Button onClick={closeEditProfileDialogHandler}>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    </QuacoreLayout>
  );
};

export default Profile;

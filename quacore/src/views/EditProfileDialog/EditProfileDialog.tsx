import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Profile } from "../../types/types";

type EditProfileDialogProps = {
  isDialogOpen: boolean;
  profile: Profile | undefined;
  onCloseHandler: () => void;
  onSubmitHandler: (data: any) => void;
};

const EditProfileDialog = ({
  isDialogOpen,
  profile,
  onCloseHandler,
  onSubmitHandler,
}: EditProfileDialogProps) => {
  const { handleSubmit, control, setValue } = useForm({});

  const fillEditFormWithStateData = useCallback(() => {
    setValue("description", profile?.description);
    setValue("avatarImageLink", profile?.avatarImageLink);
    setValue("bannerImageLink", profile?.bannerImageLink);
  }, [profile, setValue]);

  useEffect(() => {
    fillEditFormWithStateData();
  }, [profile, fillEditFormWithStateData]);

  const onCloseDialogHandler = () => {
    onCloseHandler();
    fillEditFormWithStateData();
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={onCloseDialogHandler}
        maxWidth="sm"
        fullWidth
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          id="edit-profile-dialog-form"
        >
          <DialogTitle>Edit profile</DialogTitle>
          <DialogContent>
            <div className="form-controls-wrapper">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    multiline
                    label="Description"
                    rows={3}
                    id="description-edit-input"
                    margin="dense"
                    {...field}
                  />
                )}
              />

              <Controller
                name="avatarImageLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Avatar"
                    id="avatarImageLink-edit-input"
                    margin="dense"
                    {...field}
                  />
                )}
              />
              <Controller
                name="bannerImageLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Banner"
                    id="bannerImageLink-edit-input"
                    margin="dense"
                    {...field}
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
            <Button onClick={onCloseDialogHandler}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;

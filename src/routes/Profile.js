import ProfileForm from "components/ProfileForm";
import { authService } from "fBase";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();

  //sign out
  const onSignOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <div className="profileContainer">
      <ProfileForm refreshUser={refreshUser} userObj={userObj}/>
      <span className="formBtn cancelBtn" onClick={onSignOutClick}>Sign Out </span>
    </div>
  );
};
export default Profile;
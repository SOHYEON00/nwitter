import { authService, dbService } from "fBase";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();

  //sign out
  const onSignOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async() => {
    const myNweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get(); 
    console.log(myNweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onSignOutClick}>S ign out</button>
    </>
  );
};
export default Profile;
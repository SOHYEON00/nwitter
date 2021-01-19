import { authService } from "fBase";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  //sign out
  const onSignOutClick = () => {
    authService.signOut();
    history.push("/");
  };

//   const getMyNweets = async() => {
//     const myNweets = await dbService
//       .collection("nweets")
//       .where("creatorId", "==", userObj.uid)
//       .orderBy("createdAt")
//       .get(); 
//     console.log(myNweets.docs.map((doc) => doc.data()));
//   };

//   useEffect(() => {
//     getMyNweets();
//   }, []);

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmitHandler = async(event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
        await userObj.updateProfile({
            displayName: newDisplayName,
        });
        refreshUser();
      }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className="profileForm">
        <input
          type="text"
          placeholder="Display your name"
          autoFocus
          required
          value={newDisplayName}
          onChange={onTextChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Name"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onSignOutClick}>Sign Out </span>
    </>
  );
};
export default Profile;
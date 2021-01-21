import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "fBase";
import FileUpload from "components/FileUpload";
import { useHistory } from "react-router-dom";

function ProfileForm({ refreshUser, userObj }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState(userObj.photoUrl);
  const originalProfile = userObj.photoUrl;

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent; //finishedEvent.currentTarget.result 값을 ES6로 표현한 것
      setNewPhoto(result);
    };

    if (files.length > 0) {
      //오류 수정 -> 파일선택하려다 취소한 경우
      const theFile = files[0];
      reader.readAsDataURL(theFile);
    }
  };
console.log(userObj);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let newPhotoUrl = "";

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }

    //FIND -> UPDATE USER INFO
    if (newPhoto !== originalProfile) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/userPhoto`);
      const response = await attachmentRef.putString(newPhoto, "data_url");
      newPhotoUrl = await response.ref.getDownloadURL();
   
    setNewPhoto(newPhotoUrl);
    }

    refreshUser();
    alert("프로필이 성공적으로 업데이트 되었습니다.");
    history.push("/");
  };

  const onClearAttachment = () => {
    setNewPhoto(originalProfile); //원래 사진으로 변경
  };
console.log(newPhoto);
  return (
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
      {newPhoto ? (
        <img src={newPhoto} alt="profile_photo" width="300" />
      ) : (
        <p>사진을 업로드 해주세요.</p>
      )}

      <FileUpload onFileChange={onFileChange} />

      {newPhoto !== originalProfile && (
        <div className="factoryForm_clear" onClick={onClearAttachment}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      )}

      <input type="submit" value="Update Profile" className="formBtn" />
    </form>
  );
}

export default ProfileForm;

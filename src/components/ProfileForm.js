import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { storageService } from "fBase";
import FileUpload from "components/FileUpload";
import { useHistory } from "react-router-dom";

function ProfileForm({ refreshUser, userObj }) {
  const history = useHistory();
  const [originProfile, setOriginProfile] = useState(""); //storage에서 받아온 사진 변수
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState(""); //새로 업로드한 사진 변수

  const getUrl = async() => {
    const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/userPhoto`); 
    await attachmentRef
    .getDownloadURL().then((url) => {
      setOriginProfile(url);
      setNewPhoto(url);
    });
  } 

  useEffect(() => {
    getUrl();
  }, []);

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }

    //FIND -> UPDATE USER INFO
    if (newPhoto !== originProfile) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/userPhoto`);
      await attachmentRef.putString(newPhoto, "data_url");
    }

    
    alert("프로필이 성공적으로 업데이트 되었습니다.");
    history.push("/");
  };

  const onClearAttachment = () => {
    setNewPhoto(originProfile); //원래 사진으로 변경
  };

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
        <img src={newPhoto} alt="profile_photo" width="300" id="profilePhoto"/>
      ) : (
        <h3>프로필 사진을 추가해주세요.</h3>
      )}

      <FileUpload onFileChange={onFileChange} />

      {newPhoto !== originProfile && (
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

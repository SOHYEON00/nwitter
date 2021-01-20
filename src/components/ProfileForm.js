import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dbService } from 'fBase';
import FileUpload from 'components/FileUpload';

function ProfileForm({ refreshUser, userObj }) {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [profileUrl, setProfileUrl] = useState(userObj.photoUrl);
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
      setProfileUrl(result);
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
    const editedUser = {
        userId: userObj.uid,
        userPhoto: profileUrl,
    };
    await dbService.collection("user").add(editedUser);
  };

  const onClearAttachment = () => {
    setProfileUrl(originalProfile); //원래 사진으로 변경
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
      {profileUrl ? (
        <img src={profileUrl} alt="profile_picture" />
      ) : (
        <p>사진을 업로드 해주세요.</p>
      )}

      <FileUpload onFileChange={onFileChange}/>

      {profileUrl !== originalProfile && (
        <div className="factoryForm_clear" onClick={onClearAttachment}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      )}

      <input type="submit" value="Update Profile" className="formBtn" />
    </form>
  );
}

export default ProfileForm

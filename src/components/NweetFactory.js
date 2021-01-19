import React, {useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState(""); //only for the form
    const [attachment, setAttachment] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let attachmentURL = "";

    if (nweet === "") {
      return;
    }

    if (attachment !== "") {
      // Upload Image
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); //child: 이미지의 path - folder
      const response = await attachmentRef.putString(attachment, "data_url"); //.putString(data, data format)
      attachmentURL = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("nweets").add(nweetObj);

    setNweet("");
    setAttachment("");
  };

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  }

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent; //finishedEvent.currentTarget.result 값을 ES6로 표현한 것
      setAttachment(result);
    };

    // if (files.lenght > 0) {
    //   //오류 수정 -> 파일선택하려다 취소한 경우
    //   const theFile = files[0];
      reader.readAsDataURL(theFile);
    // }
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="factoryForm">
      <div className="factoryInput_container">
        <input
          className="factoryInput_input"
          value={nweet}
          onChange={onTextChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput_arrow"/>
      </div>
      <label htmlFor="attach-file" className="factoryInput_label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus}/>
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
        />
        {attachment && (
          <div className="factoryForm_attachment">
            <img src={attachment} style={{backgroundImage: attachment,}} />
            <div calssName="factoryForm_clear" onClick={onClearAttachment} >
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes}/>
            </div>
          </div>
        )}
    </form>
  );
}

export default NweetFactory

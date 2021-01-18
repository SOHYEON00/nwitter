import React, {useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";

function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState(""); //only for the form
    const [attachment, setAttachment] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let attachmentURL = "";

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
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={nweet}
        onChange={onTextChange}
        placeholder="What's on your mind?"
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="attachment" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
      {/* attachment가 존재하는 경우만 이미지 출력 */}
    </form>
  );
}

export default NweetFactory

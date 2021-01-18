import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fBase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); //only for the form
  const [nweets, setNweets] = useState([]); //nweets array from db
  const [attachment, setAttachment] = useState("");

  // const getNweets = async () => {
  //   //get documents from 'nweets'collections
  //   const dbNweets = await dbService.collection("nweets").get(); //get all info of 'nweet'collection
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]); //make an array of documents.datas
  //   });

  // };

  useEffect(() => {
    //Listening to DB on real time
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        // getNweets()대신 snapShot사용, realtime으로 db 정보 가져올 수 있음
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let attachmentURL = "";

    if(attachment !== "") {
      // Upload Image
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); //child: 이미지의 path - folder
      const response = await attachmentRef.putString(attachment, "data_url"); //.putString(data, data format)
      attachmentURL = await response.ref.getDownloadURL();
    };

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

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent; //finishedEvent.currentTarget.result 값을 ES6로 표현한 것
      setAttachment(result);
    };

    if(files.lenght > 0) { //오류 수정 -> 파일선택하려다 취소한 경우
      const theFile = files[0];
      reader.readAsDataURL(theFile); 
    }    
    
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <div>
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
            <img src={attachment} width="50px" height="50px" alt="attachment"/>
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        {/* attachment가 존재하는 경우만 이미지 출력 */}
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;

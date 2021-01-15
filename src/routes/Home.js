import Nweet from "components/Nweet";
import { dbService } from "fBase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); //only for the form 
  const [nweets, setNweets] = useState([]); //nweets array from db

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
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({ // getNweets()대신 snapShot사용, realtime으로 db 정보 가져올 수 있음
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
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
          );
        })}
      </div>
    </div>
  );
};
export default Home;

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fBase";
import React, { useState, useEffect } from "react";


const Home = ({ userObj }) => {
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
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);


  return (
    <>
      <NweetFactory userObj={userObj} />
      <>
        {nweets.map((nweet) => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
              creatorName={nweet.creatorName}
            />
          );
        })}
      </>
    </>
  );
};
export default Home;

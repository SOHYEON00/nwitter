import { dbService } from "fBase";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    //get documents from 'nweets'collections
    const dbNweets = await dbService.collection("nweets").get(); //get all info of 'nweet'collection
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]); //make an array of documents.datas
    });
  };

  useEffect(() => {
    getNweets();
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
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };
  console.log(nweets);
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
            <div key={nweet.id}>
              <h4>{nweet.nweet}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;

import { dbService, storageService } from "fBase";
import React, { useState } from "react";

function Nweet({ nweetObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false); //Is editing or not
  const [newNweet, setNewNweet] = useState(nweetObj.text); //수정될 nweet

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete(); //id를 알고 있기 때문에 가능./
      await storageService.refFromURL(nweetObj.attachmentURL).delete(); //Delete file
    }
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  onChange={onTextChange}
                  required
                  placeholder="당신의 Nweet을 수정하세요."
                  value={newNweet}
                />
                <input type="submit" value="Nwee 수정" />
              </form>
              <button onClick={toggleEditing}>취소</button>{" "}
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet;

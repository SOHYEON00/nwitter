import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import LikeComponent from "components/LikeComponent";

function Nweet({ nweetObj, isOwner, creatorName }) {
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
    <article className="nweet">
      {isEditing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmitHandler} className="container nweetEdit">
                <input
                  type="text"
                  onChange={onTextChange}
                  required
                  autoFocus
                  placeholder="당신의 Nweet을 수정하세요."
                  value={newNweet}
                  className="formInput"
                />
                <input type="submit" value="Nweet 수정" className="formBtn"/>
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h3 className="creatorName">{creatorName ? `${creatorName}` : "Undefined"}</h3>
          <h4 className="nweetText">{nweetObj.text}</h4>
          <LikeComponent nweetObj={nweetObj}/>
          {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} alt="nweet_attachment"/>}
          {isOwner && (
            <>
              <div className="nweet_actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash}/>
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </article>
  );
}

export default Nweet;

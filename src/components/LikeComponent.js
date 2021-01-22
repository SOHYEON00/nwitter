import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {dbService} from "fBase";

function LikeComponent({nweetObj}) {
    let like = nweetObj.like;

    const onLikeClick = () => {
        like += 1;
        updateDB();
    };

    const updateDB = async() => {
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            like: like,
        });
    }
    
    return (
      <div className="like">
        <span onClick={onLikeClick}>
          <FontAwesomeIcon icon={faThumbsUp} />{like}
        </span>
      </div>
    );
}

export default LikeComponent

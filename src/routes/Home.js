import { dbService } from "fBase";
import React, {useState} from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onTextChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    const onSubmitHandler = async(event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now()
        });
        setNweet("");
    } ;

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" value={nweet} onChange={onTextChange} placeholder="What's on your mind?"/>
                <input type="submit" value="Nweet"/> 
            </form>
        </div>
    )
};
export default Home;
import { authService } from "fBase";
import React from "react";
import {useHistory} from "react-router-dom";

const Profile = () => {
    const history = useHistory();

    const onSignOutClick = () => {
        authService.signOut();
        history.push('/');
    };
    return (
        <>
            <button onClick ={onSignOutClick}>Sign out</button>
        </>
    )
}
export default Profile;
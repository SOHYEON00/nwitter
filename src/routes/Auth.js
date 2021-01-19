import React from "react";
import { firebaseInstance, authService } from "fBase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

  const onSocialClick = async(event) => {
    const {target: {name}} = event;
    let provider;
    
    if(name === 'google'){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === 'github'){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        className="icon_twitter"
      />
      <AuthForm />
      <article className="socialSignInBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="socialSignInBtn"
        >
          Google 이메일로 로그인하기
          <FontAwesomeIcon icon={faGoogle} className="socialIcon"/>
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="socialSignInBtn"
        >
          Github 이메일로 로그인하기
          <FontAwesomeIcon icon={faGithub} className="socialIcon"/>
        </button>
      </article>
    </div>
  );
};
export default Auth;

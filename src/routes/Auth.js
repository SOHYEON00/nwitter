import React from "react";
import { firebaseInstance, authService } from "fBase";
import AuthForm from "components/AuthForm";

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
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">Google 이메일로 로그인하기</button>
        <button onClick={onSocialClick} name="github">Github 이메일로 로그인하기</button>
      </div>
    </div>
  );
};
export default Auth;

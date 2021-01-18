import React, {useState} from 'react';
import { authService } from "fBase";

const AuthForm = () => {
  //value를 사용하기 위해 state 사용
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); //새로운 유저인지 true: 계정 생성, false: 로그인

  const onValueChanged = (event) => {
    const {
      target: { name, value }, //target: 변경이 일어난 부분
    } = event; //get name and value

    if (name === "email") {
      setEmail(value); //input의 value가 변경될 때마다 state의 값도 변한다. -> 리렌더링
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // seetPersistance : 유저가 저장되는 방식 설정 local / session / none
  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = newAccount
        ? await authService.createUserWithEmailAndPassword(email, password) // Create account
        : await authService.signInWithEmailAndPassword(email, password); // Log in
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  //newAccount를 이전값과 반대인 값으로 바꿔주는 함수. true <-> false
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onValueChanged}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onValueChanged}
        />
        <input
          type="submit"
          value={newAccount ? "Create new account" : "Log in"}
        />
      </form>
      {/* 반대의 기능 사용 create new account <-> sign in */}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create new account"}
      </span>
      {error}
    </>
  );
}

export default AuthForm

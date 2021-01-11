import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onValueChanged = (event) => { 
        const {
            target: {name, value}
        } = event; //get name and value from changed JSX dom

        if(name === 'email'){
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input name="email" type="text" placeholder="Email" required onChange={onValueChanged}/>
        <input name="password" type="password" placeholder="Password" required onChange={onValueChanged}/>
        <input type="submit" />
      </form>
      <div>
        <button>Google 이메일로 로그인하기</button>
        <button>Github 이메일로 로그인하기</button>
      </div>
    </div>
  );
};
export default Auth;

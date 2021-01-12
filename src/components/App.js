import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

// App.js 가 모든 로직들을 다룰 예정
function App() {
  // authService.currentUser : 현재 로그인 한 유저를 가리키나, 실제로 firebase를 통해 로그인/로그아웃한 지는 알 수 없다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); // 초기화 상태

  //onAuthStateChanged : 사용자의 로그인 상태를 관찰하는 관찰자를 추가해줌
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>
        &copy; {new Date().getFullYear()} Nwitter - nomardcoders.com
      </footer>
    </div>
  );
}

export default App;

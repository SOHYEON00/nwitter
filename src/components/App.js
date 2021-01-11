import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

// App.js 가 모든 로직들을 다룰 예정
function App() {
  // authService.currentUser : 현재 로그인 한 유저
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div className="App">
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter - nomardcoders.com</footer>
    </div>
  );
}

export default App;

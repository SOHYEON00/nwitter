import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService, dbService } from "fBase";

// App.js 가 모든 로직들을 다룰 예정
function App() {
  // authService.currentUser : 현재 로그인 한 유저를 가리키나, 실제로 firebase를 통해 로그인/로그아웃한 지는 알 수 없다.
  
  const [init, setInit] = useState(false); // 초기화 상태
  const [userObj, setUserObj] = useState(null); //유저 정보를 가지는 상태

  //onAuthStateChanged : 사용자의 로그인 상태를 관찰하는 관찰자를 추가해줌
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) { //로그인한 유저 정보를 저장
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
          photoUrl: user.photoUrl,
        }); 
      } else{ //로그아웃
        setUserObj(null); 
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    //setUserObj(authService.currentUser); //Not Working! but {displayName: "asdf"}는 작동함.
    //authService.currentUser가 너무 커서 바꾸ㅟ넋을 판단하기가 어렵다.
    //option1. authService.currentUser object의 크기를 줄여준다.
    //useEffect에서 setUserObj할때 첨부터 크기가 큰 user를 다 데려오는게 아니라 필요한 것만 데려오기.
    const user = authService.currentUser;
  
    dbService
      .doc(`users/${user.uid}`)
      .get()
      .then((doc) => {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: doc.data().photoUrl,
          updateProfile: (args) => user.updateProfile(args),
        });
      });

    // option2 빈 {}안에 원래 user의 사본이 새 {}형태로 생성되는데 이 덕에 react가 새로운 {}가 생성됐네! 하고 재렌더링해줌
    /* 하지만 오류 발생할 수 있음
    setUserObj(Object.assign({}, user));
    */
  };

  return (
    <div className="App">
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer>
        &copy; {new Date().getFullYear()} Nwitter - nomardcoders.com
      </footer>
    </div>
  );
}

export default App;

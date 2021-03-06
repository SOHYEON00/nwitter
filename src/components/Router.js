import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  //   Router가 Routes를 보여주는 용도로만 사용되기 위해 state 이동 -> App.js
  return (
    <main>
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        {/* A && B : B를 실행하기 위해선 A가 TRUE여야 한다. */}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router>
    </main>
  );
};

export default AppRouter;

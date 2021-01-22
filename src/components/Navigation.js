import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router-dom";

function Navigation({ userObj }) {
  const location = useLocation();
  const currentPage = location.pathname;

    return (
      <nav>
        <ul className="navMenu">
          <li id="liHome">
            <Link to="/" className="navLink">
              <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
              {currentPage === "/" ? (
                <span className="navBar currentPage" id="pathHome">
                  HOME
                </span>
              ) : (
                <span className="navBar" id="pathHome">
                  HOME
                </span>
              )}
            </Link>
          </li>
          <li id="liProfile">
            <Link to="/profile" className="navLink">
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
              {currentPage === "/profile" ? (
                <span className="navBar currentPage" id="pathProfile">
                  {userObj.displayName
                    ? `${userObj.displayName}의 Profile`
                    : "Profile"}
                </span>
              ) : (
                <span className="navBar" id="pathProfile">
                  {userObj.displayName
                    ? `${userObj.displayName}의 Profile`
                    : "Profile"}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navigation

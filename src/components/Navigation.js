import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router-dom";

function Navigation({ userObj }) {
  const location = useLocation();

  const showCurrentPage = () => {
    const pathHome = document.getElementById("pathHome");
    const pathProfile = document.getElementById("pathProfile");
 
    if(location.pathname === "/"){
      pathHome.classList.add("currentPage");
      pathProfile.classList.remove("currentPage")
    } else if(location.pathname === "/profile"){
      pathHome.classList.remove("currentPage");
      pathProfile.classList.add("currentPage");
    }
  }

  showCurrentPage();
  
    return (
      <nav>
        <ul className="navMenu">
          <li>
            <Link to="/" className="navLink" >
              <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
              <span className="navBar" id="pathHome">HOME</span>
            </Link> 
          </li>
          <li>
            <Link to="/profile" className="navLink" >
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
              <span className="navBar" id="pathProfile">
                {userObj.displayName
                  ? `${userObj.displayName}의 Profile`
                  : "Profile"}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navigation

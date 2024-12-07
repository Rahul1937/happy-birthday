import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import Home from "./Home";
import Home2 from "./Home2";

const Layout = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isBirthday, setIsBirthday] = useState(false);

  useState(()=>{
    const year = new Date().getFullYear();
    if(new Date().getDate() >= new Date(`${year}-12-14T00:00:00+05:30`).getDate()){
      setIsBirthday(true)
    }
  }, [])

  const navigate = useNavigate();

  const unlockTabs = () => {
    setIsUnlocked(true);
    
    if(isBirthday){
      setIsHome(false);
      navigate("/happy-birthday");
    } else {
      setIsHome(true);
      navigate("/");
    }
  };

  const onSecretAccess = () => {
    setIsUnlocked(true);
    setIsBirthday(true);
    setIsHome(false);
    navigate("/happy-birthday");
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" onClick={() => setIsHome(true)}>
              Home
            </Link>
          </li>
          <li className={isUnlocked && isBirthday ? "" : "locked"}>
            <Link to="/happy-birthday" onClick={() => setIsHome(false)}>
              Happy Birthday
            </Link>
          </li>
          <li className={isUnlocked && isBirthday ? "" : "locked"}>
            <Link to="/gallery" onClick={() => setIsHome(false)}>
              Gallery
            </Link>
          </li>
          <li className={isUnlocked && isBirthday ? "" : "locked"}>
            <Link to="/wishes" onClick={() => setIsHome(false)}>
              Come Here!
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="content">
        {(isHome && !isUnlocked) && (
          <Home onUnlock={unlockTabs} onSecretAccess={onSecretAccess} />
        )}
        {(isHome && isUnlocked) && (
            <Home2 isBirthday={isBirthday}/>
        )}
        {(!isHome && isUnlocked && isBirthday) && (
            <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;

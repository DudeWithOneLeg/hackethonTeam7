import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="user-icon">
        <i className="bx bxs-user-circle"></i>
      </button>
      {showMenu && (
        <div className={ulClassName} ref={ulRef}>
          <ul className="profile-container">
            <li>{user.username}</li>
            {/* <li>
              {user.firstName} {user.lastName}
            </li> */}
            <li>{user.email}</li>
            <li>

              <button className="user-btn">
                Profile
              </button>
            </li>
            <li>
              <button onClick={logout} className="user-btn">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;

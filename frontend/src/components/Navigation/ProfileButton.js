import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/session";
import './Navigation.css';

const ProfileButton = ({ user, setLogin, setShowModal, setHostSpot }) => {
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    };

    const mySpotsClick = (e) => {
        e.preventDefault();
        history.push(`/users/${user.id}`)
      };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false)
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)

    }, [showMenu]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="whole-dropdown">
            <button className='profile-btn clickable' onClick={openMenu}>
                <i className="fa-sharp fa-solid fa-user"></i>
            </button>
            {showMenu && ( user ? 
               ( <div className="dropdown logged-in">
                <div className="drop-content-div user"> 
                    <p className="drop-content">{user.username}</p>
                </div>
                <div className="drop-content-div">
                    <p className="drop-content">{user.email}</p>
                </div>
                <div onClick={mySpotsClick} className="drop-content-div">
                    <p className='drop-content clickable'>My Spots</p>
                </div>
                <div className="drop-content-div logoutbtn">
                    <button className="btn" onClick={handleClick}><span className='lgText'>Log Out</span></button>
                </div>
                </div>) :
                (<div className="dropdown login-logout">
                    <button className="btn" onClick={() => {
                        setLogin(true);
                        setShowModal(true);
                    }}>Log In</button>
                    <button className="btn" onClick={() => {
                        setLogin(false);
                        setShowModal(true)
                    }}>Sign Up</button>
                </div>)
            )}
        </div>
    )
    
};

export default ProfileButton;

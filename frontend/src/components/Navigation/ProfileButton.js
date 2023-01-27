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

    const myBookingsClick = (e) => {
        e.preventDefault();
        history.push('/bookings')
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
                <div className="drop-content-div user-email">
                    <p className="drop-content">{user.email}</p>
                </div>
                <div onClick={mySpotsClick} className="drop-content-div clickable">
                    <p className='drop-content clickable'>My Spots</p>
                </div>
                <div onClick={myBookingsClick} className="drop-content-div clickable">
                    <p className='drop-content clickable'>My Bookings</p>
                </div>
                <div onClick={handleClick} className="drop-content-div logoutbtn clickable"> 
                    <p className="drop-content clickable">Log Out</p>
                </div>
                </div>) :
                (<div className="dropdown login-logout">
                    <div onClick={() => {
                        setLogin(true);
                        setShowModal(true)
                    }} className="drop-content-div user clickable">
                        <p className="drop-content clickable">Log In</p>
                    </div>
                    <div onClick={() => {
                        setLogin(false);
                        setShowModal(true)
                    }} className="drop-content-div logoutbtn clickable">
                        <p className="drop-content clickable">Sign Up</p>
                    </div>
                </div>)
            )}
        </div>
    )
    
};

export default ProfileButton;

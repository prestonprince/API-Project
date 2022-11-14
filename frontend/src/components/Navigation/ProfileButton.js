import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";
import './Navigation.css';
import DropdownModal from "./DropdownModal";

const ProfileButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
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
        <div>
            <button className='profile-btn' onClick={openMenu}>
                <i className="fa-sharp fa-solid fa-user"></i>
            </button>
            {showMenu && (
                <DropdownModal props={{handleClick, user}}/>
            )}
        </div>
    )
};

export default ProfileButton;

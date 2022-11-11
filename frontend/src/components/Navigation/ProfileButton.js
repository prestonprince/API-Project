import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";

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
            <button onClick={openMenu}>
                <i className="fa-sharp fa-solid fa-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={handleClick}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    )
};

export default ProfileButton;

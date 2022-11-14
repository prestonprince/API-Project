import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css"

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
            <div className="btn-box">
                <LoginFormModal />
                <SignupFormModal />
            </div>
            </>
        );
    };

    return (
        <div className="nav-container">
            <div className='home'>
                <NavLink exact to='/'>
                    {/* <i className="fa-solid fa-house fa-lg" inverse='true'></i> */}
                    <img  className="logo" alt="logo" src="https://cdn.discordapp.com/attachments/1021817221082779668/1041441675580538970/someone.jpg"></img>
                </NavLink>
            </div>
            <div className="sesh">
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
};

export default Navigation;

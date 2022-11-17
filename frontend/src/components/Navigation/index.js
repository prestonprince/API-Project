import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";

import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { Modal } from "../../context/Modal";

import "./Navigation.css"
import LoginForm from "../LoginFormModal/LoginForm";
import SignUpForm from "../SignupFormModal/SignUpForm";
import AddSpotForm from "../AddSpotForm.js";

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [showSpotForm, setShowSpotForm] = useState(false)
    const [login, setLogin] = useState(true)

    return (
        <div className="big-nav">
            <div className="nav-container">
                <div className='home'>
                    <NavLink exact to='/'>
                        {/* <i className="fa-solid fa-house fa-lg" inverse='true'></i> */}
                        <img  className="logo" alt="logo" src="https://cdn.discordapp.com/attachments/1021817221082779668/1041441675580538970/someone.jpg"></img>
                    </NavLink>
                </div>
                <div className="search">
                    <h4>placeholder for search bar</h4>
                </div>
                <div className="sesh">
                    {isLoaded && (
                        <>
                            <div className='host'>
                                <p className="clickable" onClick={() => setShowSpotForm(true)}>BingusBnB your home</p>
                            </div>
                            <div className="profile">
                                <ProfileButton 
                                    user={sessionUser} 
                                    setLogin={setLogin} 
                                    setShowModal={setShowModal}
                                />
                            </div>
                        </>
                    )}
                    {showModal && 
                    <Modal onClose={() => setShowModal(false)}>
                        {login ? <LoginForm setShowModal={setShowModal}/> : <SignUpForm setShowModal={setShowModal} />}
                    </Modal>}
                    {showSpotForm && (
                        <Modal onClose={() => setShowSpotForm(false)}>
                            <AddSpotForm />
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Navigation;

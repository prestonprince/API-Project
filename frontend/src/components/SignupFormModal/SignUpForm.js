import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { signupUser } from '../../store/session';

import './SignUpForm.css'

const SignupFormPage = ({ setShowModal }) =>  {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    if (sessionUser) <Redirect to='/'/>

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (confirmPassword !== password) setPasswordError({error: "Passwords must match"});
        else {
            return dispatch(signupUser({
                firstName,
                lastName,
                username,
                email,
                password
            }))
            .then(() => {
                setPasswordError({})
                setFirstName('');
                setLastName('');
                setEmail('');
                setusername('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                setShowModal(false)
                history.push('/')
            })
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        };
    };

    return (
        <div className='signup-form'>
            <div className='header-box'>
                <button onClick={handleClick} className='x-button'>
                    <i className='fa-duotone fa-x'></i>
                </button>
                <h3 className='header'>Sign up</h3>
            </div>
            <hr></hr>
            <h3 className='title'>Welcome to BingusBnB</h3>
            <ul>
                {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
                {Object.values(passwordError).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form 
                onSubmit={onSubmit}
                className='form'
            >
            <label htmlFor="email">
                    <input
                        className='input'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder=' Email'
                    />
                </label>
                <label htmlFor="firstName">
                    <input
                        className='input'
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder=' First name'
                    />
                </label>
                <label htmlFor='lastName'>
                    <input
                        className='input' 
                        type='text'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder=' Last Name'
                    />
                </label>
                <label htmlFor='username'>
                    <input 
                        className='input'
                        type='text'
                        onChange={(e) => setusername(e.target.value)}
                        value={username}
                        placeholder=' username'
                    />
                </label>
                <label htmlFor='password'>
                    <input 
                        className='input'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder=' Password'
                    />
                </label>
                <label htmlFor='confirm-password'>
                    <input
                        className='input' 
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder=' Confirm Password'
                    />
                </label>
                <button className='button'>Continue</button>
            </form>
        </div>
    )
};

export default SignupFormPage;

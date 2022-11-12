import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

import './LoginForm.css';

const LoginForm = ({props: {setShowModal}}) => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        return dispatch(login({credential, password}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    return (
        <div>
            <div className='header-box'>
                <button onClick={handleClick} className='x-button'>
                    <i className='fa-duotone fa-x'></i>
                </button>
                <h3 className='header'>Log In</h3>
            </div>
            <hr></hr>
            <h2>Welcome to BingusBnB</h2>
            <ul>
                {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form className='login-form' onSubmit={onSubmit}>
                <label className='credential' htmlFor='credential'>
                    <input
                        type='text'
                        className='input'
                        onChange={(e) => setCredential(e.target.value)}
                        value={credential}
                        placeholder=' Username or Email'
                        required
                    />  
                </label>
                <label className='password' htmlFor='password'> 
                    <input
                        className='input'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder=' Password'
                        required
                    />
                </label>
                <button className='button' type='submit'>Log In</button>
            </form>
        </div>
    )
};

export default LoginForm;

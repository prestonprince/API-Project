import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';

import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    if (sessionUser) return (<Redirect to ='/' />);

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
        <div className='login-form'>
            <h2>Log In</h2>
            <ul>
                {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form onSubmit={onSubmit}>
                <label className='credential' htmlFor='credential'>
                    <span className='credential-label'>Username or Email: </span> 
                    <input
                        type='text'
                        onChange={(e) => setCredential(e.target.value)}
                        value={credential}
                        required
                    />  
                </label>
                <label className='password' htmlFor='password'>
                <span className='password-label'>Username or Email: </span>  
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
};

export default LoginFormPage;

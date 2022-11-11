import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signupUser } from '../../store/session';

const SignupFormPage = () =>  {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    if (sessionUser) <Redirect to='/'/>

    const onSubmit = (e) => {
        e.preventDefault();

        if (confirmPassword !== password) setPasswordError({error: "Passwords must match"});
        else {
            setPasswordError({})
            return dispatch(signupUser({
                firstname,
                lastname,
                username,
                email,
                password
            }))
            .catch(async(res) => {
                const data = await res.json();
                console.log(data);
                if (data && data.errors) setErrors(data.errors);
            })
        }
    };

    return (
        <div>
            <ul>
                {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
                {Object.values(passwordError).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form onSubmit={onSubmit}>
            <label htmlFor="email">Email: 
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label htmlFor="firstname">First Name: 
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstname}
                    />
                </label>
                <label htmlFor='lastname'>Last Name:
                    <input 
                        type='text'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastname}
                    />
                </label>
                <label htmlFor='username'>Username:
                    <input 
                        type='text'
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />
                </label>
                <label htmlFor='password'>Password:
                    <input 
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <label htmlFor='confirm-password'>Confirm Password:
                    <input 
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </label>
                <button>Let's Go</button>
            </form>
        </div>
    )
};

export default SignupFormPage;

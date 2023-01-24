import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterForm = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*+]).{6,16}$/.test(password)) {
            setPasswordError("Please provide at least 6 character, one uppercase and lowercase latter, and one special character!");
            return;
        }

        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                emailVerification();
                updateUserProfile(name);
            })
            .catch(error => {
                console.log(error)
                setPasswordError(error.message)
            })
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("Please check your email and verify email address")
            });
    }

    const updateUserProfile = (name) => {

        updateProfile(auth.currentUser, {
            displayName: name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            alert("Display name updated")
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='your name' />
                <br />
                <input type="email" name="email" id="" placeholder='your email' />
                <br />
                <input type="password" name="password" id="" placeholder='pass' />
                <br />
                <h3>{passwordError}</h3>
                {success && <h3>Successfully account created!</h3>}
                <button type="submit">Register</button>
            </form>
            <h4>Already have an account? <Link to="/login">Log in</Link></h4>
        </div>
    )
}

export default RegisterForm
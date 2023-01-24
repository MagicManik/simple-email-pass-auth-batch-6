import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const LoginForm = () => {
    // const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // setPasswordError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (!user?.emailVerified) {
                    alert("Please verify your email before log in!");
                }
                else {
                    setSuccess(true);
                }

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log("error message manik", errorMessage)
            });
    }

    const handleForgetPassword = () => {
        if (!email) {
            alert("Please enter your password");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent! Please check your email')
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <div>
            <h1>Please Log in</h1>
            <form onSubmit={handleLogin}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="" placeholder='your email' />
                <br />
                <input type="password" name="password" id="" placeholder='pass' />
                <br />
                {/* <h3>{passwordError}</h3> */}
                {/* {
                    success && <h3>Successfully account created!</h3>
                } */}
                <button type="submit">Log in</button>
            </form>
            {
                success && <h1>Successfuly log in</h1>
            }
            <h4>New to this website? <Link to="/register">Register</Link></h4>

            <p>Forget password? <button onClick={handleForgetPassword}>Reset password</button></p>
        </div>
    )
}

export default LoginForm
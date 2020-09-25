import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import classes from './Signup.module.scss';
 
import * as ROUTES from '../../routes';
 
function SignUpPage() {
  return (
    <div className={classes.container}>
      <h1>Sign Up</h1>
      <SignUpForm/>
    </div>
  )
};
 
function SignUpFormBase(props) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
  
  const resetState = () => {
    setUsername('');
    setEmail('');
    setPasswordOne('');
    setPasswordTwo('');
    setError(null);
  }
 
  const onSubmit = event => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        resetState();
        history.push('/shortlist');
      })
      .catch(error => {
        setError({ error });
      });
 
    event.preventDefault();
  }
 
  return (
    <div className={classes.form_container}>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Full Name"/>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"/>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          type="password"
          placeholder="Password"/>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm Password"/>
        <button type="submit" disabled={isInvalid}>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

const SignUpForm = withFirebase(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm };
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import classes from './Signin.module.scss';

import * as Routes from '../../routes';
 
function SignInPage() {
  return (
    <div className={classes.container}>
      <h1>Sign In</h1>
      <SigninForm/>
    </div>
  )
};
 
function SigninFormBase(props) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = password === '' || email === '';
  
  const resetState = () => {
    setEmail('');
    setPassword('');
    setError(null);
  }
 
  const onSubmit = event => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        resetState();
        history.push(Routes.SHORTLIST);
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
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"/>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"/>
        <button type="submit" disabled={isInvalid}>Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
      <p>
        Don't have an account? <Link to={Routes.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
}

const SigninForm = withFirebase(SigninFormBase);
 
export default SignInPage;
 
export { SigninForm };
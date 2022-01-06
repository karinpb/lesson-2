import React from 'react';
import { useNavigate } from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './signin.styles.scss';

const SignInAndSignUpPage = () => {
    const navigate = useNavigate();
    // TODO If the user is not available redirect
    //navigate("/");

    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>);
}

export default SignInAndSignUpPage;
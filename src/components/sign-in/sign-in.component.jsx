import React from "react";

import "./sign-in.styles.scss"
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    handleSumit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: "", password: "" });
        } catch (error) {
            console.log.error(error);
        }

        this.setState({ email: "", password: "" });
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });

    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form>
                    <FormInput name="email" value={this.state.email} handleChange={this.handleChange} required label="email" />
                    <FormInput name="password" type="password" value={this.state.password} handleChange={this.handleChange} label="password" required />
                    <div className='buttons'>
                        <CustomButton type="button" value="Submit form" onClick={this.handleSumit}>Sign in</CustomButton>
                        <CustomButton type="button" value="Submit form" isGoogleSignIn onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                    </div>
                </form>


            </div>
        )
    }

}

export default SignIn;
import { useState} from "react";
import {
  signInWithGooglePopup,
  // createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utlis";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.style.scss'


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;
  // console.log(formFields);



  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInwithGoogle = async ()=>{
    await signInWithGooglePopup();
       };
  const handleSubmit = async (event) => {
    event.preventDefault();  

    try {
    const {user} = await signInAuthUserWithEmailAndPassword(email,password)
    // setCurrentUser(user)  
      resetFormField();

    } 
    catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign Up with your email and Password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label='Email'
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />

        <FormInput
          label='Password'
          type="Password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />
        <div className="buttons-container">
        <Button  buttonType='inverted'type="submit">Sign In </Button>
        <Button   buttonType='google' onClick={signInwithGoogle}>Google Sign In</Button>
        </div>
 
      </form>
    </div>
  );
};
export default SignInForm;

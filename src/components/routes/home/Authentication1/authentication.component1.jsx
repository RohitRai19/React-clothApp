
import'./authentication.style.scss'
import SignInForm from "../../../sign-in-form/sign-in-form.component";
import SignUpForm from "../../../sign-up-form/sign-up-form.component";
 const Authentication=()=>{
    return(
        <div className="authentication-conatiner">
           <SignInForm/>
            <SignUpForm/>
            </div>
    );
}

 export default Authentication;
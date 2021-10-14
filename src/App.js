import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile  } from "firebase/auth"; 
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user =  result.user;
      console.log(user);
    })

  }

  const toggleLogin = e => {
    setIsLogin(e.target.checked)
  }

  const handleNameChange = e =>{
    setName(e.target.value);
  }

  const handleEmailChange = e =>{
      setEmail(e.target.value);
  }

  const handlePassworcChange = e =>{
    setPassword(e.target.value);
  }

  const handleRegistration = e =>{
    console.log(email, password);
    e.preventDefault();
    if (password.length < 6){
      setError('Password must be at least 6 charcter long.')
      return;
    }

    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Password must contain 2 upper case')
      return;
    }
      // isLogin? processLogin(email, password): createNewUser(email, password);
      if (isLogin){
        processLogin(email, password)
      }
      else{
          registerNewUser(email, password);
      }
      return;
  }
  
  const processLogin =(email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then( result =>{
      const user = result.user;
      console.log(user);
      setError("");
    })
    .catch(error=>{
     setError(error.message)
    })

  }
  const registerNewUser =(email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then( result => {
      const user = result.user;
      console.log(user);
      setError('');
      verifyEnail();
      setUserName();
      
    })
    .catch(error =>{
      setError(error.message);
    })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser,{displayName:name})
    .then(result=> { })
  }
 const verifyEnail = () =>{
  sendEmailVerification(auth.currentUser)
  .then(result=>{
    console.log(result);
  })
 }

 const handleResetPassword = () =>{
   sendPasswordResetEmail(auth, email)
   .then(result=> {})
 }
  return (

  <div className="mx-5">
     <form onSubmit={handleRegistration}>
       <h3 className="text-primary">Please {isLogin? "Login" : "Register"}</h3>

  {!isLogin &&<div className="row mb-3">
    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" onBlur={handleNameChange} placeholder="Your Name" className="form-control" id="inputName" required/>
    </div>
  </div>}

  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePassworcChange} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>
  <div>
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Register?
        </label>
      </div>
    </div>
  </div>
  <div  className="row mb-3 text-danger">{error}</div>
  <button type="submit" className="btn btn-primary">{isLogin? "Login" : "Register"}</button> 

  <button onClick={handleResetPassword} type="button" className="ml-2 btn btn-danger">Reset Password</button>

</form>



  <div>------------------------------</div>
  <br /><br /><br />
    <button onClick={handleGoogleSignIn}>Google Sign In</button>

  </div>
    
  );
}

export default App;


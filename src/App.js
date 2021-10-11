import { GoogleAuthProvider, getAuth,  signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuthentication  from './Firebase/firebase.initialize';
import './App.css';
import { useState } from "react";

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const auth = getAuth();


function App() {
  
  const [user, setUser] = useState({})
  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
    const {displayName, email, photoURL} = result.user;
    const loggedInUser ={
      name:displayName,
      email: email,
      photo: photoURL,
    }
    setUser(loggedInUser);
    })
    
    .catch(error =>{
      console.log(error.message)
    })
  }


  const handleGitHubSignIn = () =>{
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
    const {displayName, email, photoURL} = result.user;
    const loggedInUser ={
      name:displayName,
      email: email,
      photo: photoURL,
    }
    setUser(loggedInUser);
    })
    
    .catch(error =>{
      console.log(error.message)
    })
  }

  const handleSignOut =()=>{
    signOut(auth)
    .then( ()=>{
      setUser({});
    })
  }
   
  return (

  <div className="App">
  
  
 {!user.name?
 <div> <button onClick={handleGoogleSignIn} >Sign In Google</button>
  <button onClick={handleGitHubSignIn}>Sign In GitHub</button>
  </div>:
  <button onClick={handleSignOut}>Sign Oute</button>}

  <br />
     
     
     { user.name && <div>
       <h1> Welcome: {user.name}</h1>
     <p>Your email is: {user.email}</p>
     <img src={user.photo} alt="" />
     </div>
     }

  </div>
    
  );
}

export default App;


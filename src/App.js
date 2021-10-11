import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
// import { useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();
 
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const auth = getAuth();


function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn =()=>{
    signInWithPopup(auth, googleProvider)
    .then( result =>{
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loggedInUser);
    })

    .catch(error =>{
      console.log(error.message);
    })
  }

  const handleGitHubSignIn =()=>{
    signInWithPopup(auth, gitHubProvider)
    .then( result =>{
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loggedInUser);
    })

    .catch(error =>{
      console.log(error.message);
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })

  }
  return (

  <div className="App">
    { !user.name?
    <div>
    <button onClick={handleGoogleSignIn}>Google Sign In</button>
    <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
    </div>:
    <button onClick={handleSignOut}> Sign Out</button>}
     <br />

    { 
    user.name && 
      <div>
      <h2>Welocme {user.name}</h2>
      <p>Your email is : {user.email}</p>
      <img src={user.photo} alt="" />
      </div>
    }
  

  </div>
  
  );
}

export default App;


import { initializeApp} from "firebase/app";
import firebaseConfig from "./firebase.config";

const initilaizeAuthentication = () =>{
    initializeApp(firebaseConfig);
}

export default initilaizeAuthentication;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  createUserWithEmailAndPassword,
    getAuth, signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD6oDZcnEbwvwrc55HLHiUXnL_fYUV6GSU",
  authDomain: "netflix-clone-3d38b.firebaseapp.com",
  projectId: "netflix-clone-3d38b",
  storageBucket: "netflix-clone-3d38b.firebasestorage.app",
  messagingSenderId: "201840497768",
  appId: "1:201840497768:web:35e184ebbd82e52c5dd7dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
   try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
       uid: user.uid,
       name,
       authprovider: "local",
       email,
    });
   } catch (error) {
    console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(' '));
   }
};

const login = async (email, password) => { 
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const logout = () => {
   signOut(auth);
};

export {auth, db, signup, login, logout};
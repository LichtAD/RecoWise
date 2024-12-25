import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    // const [user, setUser] = useState('avc');
    const [loading, setLoading] = useState(true);

    // console.log(loading, user);

    // ! register with email and password
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // ! log in with email and password
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // ! sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle)
    }

    // ! update profile
    const updateMyProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }

    // ! log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const AuthInfo = {
        user,
        setUser,
        loading,
        createNewUser,
        logInUser,
        signInWithGoogle,
        updateMyProfile,
        logOut,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data)
                        setLoading(false);
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
                    .then(res => {
                        console.log('logout', res.data)
                        setLoading(false);
                    })
            }
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return <AuthContext.Provider value={AuthInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;
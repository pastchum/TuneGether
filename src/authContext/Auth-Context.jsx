import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext(null);

// provider to wrap app with context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //set user state based on firebase auth context
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
            setUser(authenticatedUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // signin function
    const signIn = async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Login failed: ', error);
            throw error;  
        }
    };

    // create account function
    const createAcc = async (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Create account failed: ', error);
            throw error;
        }
    };

    // signout function
    const signOut = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.error('Sign out failed: ', error);
            throw error;  
        }
    };

    // fetch profile function
    const fetchUserProfile = async (user) => {
        try {
            await firestore().collection('users').doc(userId).get()
        } catch (error) {
            console.error('Fetching user profile failed: ', error);
            throw error;
        }
    };

    // create user profile function
    const createUserProfile = async(userId, profileData) => {
        try {
            await firestore().collection('users').doc(userId).set(profileData);
        } catch (error) {
            console.error('Creating user profile failed: ', error);
            throw error;
        }
    }

    // context object:
    const value = {
        user,
        loading,
        signIn,
        createAcc,
        signOut,
        fetchUserProfile,
        createUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// export hook for authentication
export const useAuth = () => useContext(AuthContext);
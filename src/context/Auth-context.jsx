import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext(null);

// Provider component that wraps your app and provides an AuthContext
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to the Firebase Auth state and set the user state
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
            setUser(authenticatedUser);
            setLoading(false);
        });

        return unsubscribe; // Unsubscribe on unmount
    }, []);

    // Sign in function
    const signIn = async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Login failed: ', error);
            throw error;  // Propagate error
        }
    };

    // Create account function
    const createAcc = async (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Create account failed: ', error);
            throw error;
        }
    };

    // Sign out function
    const signOut = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.error('Sign out failed: ', error);
            throw error;  // Propagate error
        }
    };

    // Make the context object:
    const value = {
        user,
        loading,
        signIn,
        createAcc,
        signOut,
    };

    // Return the provider component
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => useContext(AuthContext);
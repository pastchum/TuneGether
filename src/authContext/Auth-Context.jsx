import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext(null);

// provider to wrap app with context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCreated, setProfileCreated] = useState(false);
    const [profileData, setProfileData] = useState(null);

    //set user state based on firebase auth context
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
            setUser(authenticatedUser);
            if (authenticatedUser) {
                fetchUserProfile(authenticatedUser);
            }
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
            return (await firestore()
                            .collection('users')
                            .doc(user.uid)
                            .onSnapshot(snapshot => {
                                setProfileData(snapshot.data());
                                setProfileCreated(snapshot.exists);
                            }));
        } catch (error) {
            console.error('Fetching user profile failed: ', error);
            throw error;
        }
    };

    // create user profile function
    const createUserProfile = async(user, name, instrument, bio) => {
        const userId = user.uid;
        try {
            const profileData = {
                 name,
                 instrument, 
                 bio,
                 userId
            };

            await addProfileData(user, profileData);
        } catch (error) {
            console.error('Creating user profile failed: ', error);
            throw error;
        }
    }

    // add profile data function
    const addProfileData = async(user, profileData) => {
        try {
            await firestore().collection('users').doc(user.uid).set(profileData).then(() => {
                    setProfileCreated(true);
                });
        } catch (error) {
            console.error('Adding profile data failed: ', error);
            throw error;
        }
    }

    // context object:
    const value = {
        user,
        loading,
        profileCreated,
        profileData,
        signIn,
        createAcc,
        signOut,
        fetchUserProfile,
        createUserProfile,
        addProfileData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// export hook for authentication
export const useAuth = () => useContext(AuthContext);
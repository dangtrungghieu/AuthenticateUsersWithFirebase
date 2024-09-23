import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBXO_AL2OCV3Ts_AosmfrHfBLOg9nZgaLQ",
  authDomain: "fir-auth-tutorial-79b1b.firebaseapp.com",
  projectId: "fir-auth-tutorial-79b1b",
  storageBucket: "fir-auth-tutorial-79b1b.appspot.com",
  messagingSenderId: "885481274711",
  appId: "1:885481274711:web:a40eba6aa1754d932ed212",
  measurementId: "G-7J7BP3HWP3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

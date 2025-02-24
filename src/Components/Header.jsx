import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import React from 'react';
import Chat from './Chat';
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Giriş Xətası:", error.message);
        }
    };

    const [user] = useAuthState(auth);

    return (
        <div className='header'>
            {user ? (
                <div className='user-section'>
                    <button className='logout-button' onClick={() => signOut(auth)}>
                        Çıxış et
                    </button>
                    <Chat />
                </div>
            ) : (
                <div className='login-section'>
                    <h1>Söhbətgah Tətbiqinə Xoş Gəldiniz :) </h1>
                    <h2>Davam etmək üçün zəhmət olmasa Google hesabınızla daxil olun.</h2>
                    <button className='login-button' onClick={handleClick}>
                        Google ile Giriş et
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;

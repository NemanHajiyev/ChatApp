import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" }); // Hesap seçme ekranını aç

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Giriş hatası:", error.message);
        }
    };

    const [user] = useAuthState(auth);

    return (
        <div className='header'>
            <header>
                <h1>Sohbet tetbiqi</h1>
            </header>
            <div>
                {user ? (
                    <button onClick={() => signOut(auth)}>
                        Sign out
                    </button>
                ) : (
                    <button onClick={handleClick}>
                        Google ile giriş yap
                    </button>
                )}
            </div>
        </div>
    );
}

export default Chat;

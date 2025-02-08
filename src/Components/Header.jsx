import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import React from 'react';
import Chat from './Chat'
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Giris Xetasi:", error.message);
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
                    <div>
                        <button onClick={() => signOut(auth)}>
                            Sign out
                        </button>
                        <Chat />
                    </div>

                ) : (
                    <button onClick={handleClick}>
                        Google ile giris ele
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;

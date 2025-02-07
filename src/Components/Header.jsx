import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../Firebase/Firebase'
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";



const Chat = () => {
    const handleClick = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider);
    }

    const [user] = useAuthState(auth)

    return (
        <div className='chat'>
            <header>
                <h1>Sohbet tetbiqi</h1>
            </header>
            <div>
                {user ? (
                    <button
                        onClick={() => signOut(auth)}>
                        sign out
                    </button>
                ) : (
                    <button
                        onClick={handleClick}>
                        Google ile giris ele
                    </button>
                )}
            </div>
        </div>
    )
}

export default Chat

import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../Firebase/Firebase';
import { collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth } from '../Firebase/Firebase';

const Chat = () => {
    const msgs = collection(db, "Messages");
    const [messages] = useCollection(query(msgs, orderBy("creat")));
    const [text, setText] = useState("")

    const sendMessage = () => {
        setDoc(
            doc(msgs),
            {
                msg: text,
                creat: serverTimestamp(),
                userId: auth.currentUser.uid,
                userPhoto: auth.currentUser.photoURL
            }
        )
        setText('')
    }

    return (
        <div className='chat'>
            <div>
                {
                    messages?.docs.map((doc) => (
                        <div key={doc.id} className='messages'>
                            <div>
                                <img src={doc.data().userPhoto} alt="" />
                            </div>
                            <div>
                                <h3>
                                    {auth.currentUser.uid === doc.id ? (
                                        doc.data().msg
                                    ) : (null)
                                    }
                                </h3>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <input
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                    type="text" />
                <button
                    onClick={sendMessage}
                >Send</button>
            </div>

        </div>
    )
}

export default Chat

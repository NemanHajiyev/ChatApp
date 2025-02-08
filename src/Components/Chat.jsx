import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../Firebase/Firebase';
import { collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth } from '../Firebase/Firebase';

const Chat = () => {
    const msgs = collection(db, "Messages");
    const [messages] = useCollection(query(msgs, orderBy("creat")));
    const [text, setText] = useState("");
    const messageRef = useRef(null);
    const chatContainerRef = useRef(null);

    const sendMessage = () => {
        if (!text.trim()) return;
        setDoc(
            doc(msgs),
            {
                msg: text,
                creat: serverTimestamp(),
                userId: auth.currentUser?.uid,
                userPhoto: auth.currentUser?.photoURL
            }
        )
        setText('')
    }


    useEffect(() => {
        messageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const Text = ({ doc }) => {
        const ClassName = auth.currentUser.uid === doc.data().userId ? ("equal") : ("equal2");
        return (
            <div className={`${ClassName}`}>
                <img src={doc.data().userPhoto} alt="" />
                <h3>{doc.data().msg}</h3>
            </div>
        )
    }

    return (
        <div className='chat' ref={chatContainerRef}>
            <div>
                {
                    messages?.docs.map((doc) => (
                        <div className='messages' key={doc.id}>
                            <Text doc={doc} />
                        </div>
                    ))
                }
                <div ref={messageRef}></div>
            </div>
            <div>
                <input
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                    type="text" />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat;

import { useEffect, useRef } from "react";
import Message from "./Message";
import "./MessagesList.css";

function MessagesList({messages}) {
    let prevId = null;
    const endOfMessages = useRef();
    useEffect(() => {
        if(!endOfMessages) return;

        endOfMessages.current.scrollIntoView();
    }, [messages]);

    return (
        <div className="MessagesList">
            {messages.map(message => {
                if(message.sender.id === prevId) {
                    return <Message isDisabledTitle={true} key={message.id} message={message}/>
                }

                prevId = message.sender.id;
                return <Message key={message.id} message={message}/>
            })}
            {
                messages.length === 0 &&
                <div className="MessagesList__empty">
                    Список сообщений пуст
                </div>
            }
            <div ref={endOfMessages}></div>
        </div>
    );
}

export default MessagesList;
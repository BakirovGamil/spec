import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatLists from "../../components/ChatLists/ChatLists";
import Header from "../../components/Header/Header";
import MessagesList from "../../components/MessagesList/MessagesList";
import Button from "../../components/UI/Button/Button";
import {useChat} from "../../hooks/useChat";
import { useChats } from "../../hooks/useChats";
import "./Messages.css";

// const messages = [
//     {
//         "id": "1654476824312",
//         "chatId": "1654476821308",
//         "sender": {
//             "id": "1654112441205",
//             "lastName": "Вася",
//             "firstName": "Пупкин",
//             "middleName": "",
//             "phoneNumber": "+71231231231",
//             "role": "specialist",
//             "date": "Wed Jun 01 2022"
//         },
//         "content": "asd",
//         "date": "Mon Jun 06 2022",
//         "currentUser": true
//     },

//     {
//         "id": "1654477455481",
//         "chatId": "1654476821308",
//         "sender": {
//             "id": "1654112441205",
//             "lastName": "Вася",
//             "firstName": "Пупкин",
//             "middleName": "",
//             "phoneNumber": "+71231231231",
//             "role": "specialist",
//             "date": "Wed Jun 01 2022"
//         },
//         "content": "asd",
//         "date": "Mon Jun 06 2022",
//         "currentUser": true
//     },


//     {
//     "id": "1654476825842",
//     "chatId": "1654476821308",
//     "sender": {
//         "id": "1654475432233",
//         "lastName": "Крутой",
//         "firstName": "НЕЕЕ",
//         "middleName": "",
//         "phoneNumber": "+79627172741",
//         "role": "user",
//         "date": "Mon Jun 06 2022"
//     },
//     "content": "asd",
//     "date": "Mon Jun 06 2022"
// }
// ]

function Messages() {
    const {userId} = useParams();
    const {messages, sendMessage} = useChat(userId);
    const chats = useChats();
    const navigator = useNavigate();

    const formRef = useRef(null);

    async function handleSendMessage() {
        const form = formRef.current;

        sendMessage(form.content.value);
        form.reset();
    }

    function handleKeyDown(e) {
        if (e.keyCode == 13 && !e.shiftKey)
        {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (<>
        <Header/>
        <main className="main MessagesMain">
            <div className="container">
                <div className="Messages">
                    <div className="Messages__users">
                        <ChatLists chats={chats} userId={userId}/>
                    </div>
                    <div className="Messages__body">
                        {
                            userId !== "0" &&
                            <>
                            <div className="Messages__header">
                                <Button onClick={() => navigator('/messages/0')} style={{display: "flex", gap: 10}}>
                                    <i className="gg-chevron-left"></i>
                                    Выйти
                                </Button>
                            </div>
                            <div className="Messages__list">
                                <MessagesList messages={messages}/>
                            </div>
                            <form className="Messages__form" onSubmit={(e) => {e.preventDefault(); handleSendMessage()}} ref={formRef}>
                                <textarea className="Messages__textArea" type="text" name="content" placeholder="Напишите сообщение..." onKeyDown={handleKeyDown}/>
                                <Button isBackground>Отправить</Button>
                            </form>
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Messages;
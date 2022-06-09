import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import useAuthUser from './useAuthUser';

const SERVER_URL = 'ws://localhost:3000/messages';

// хук принимает id специалиста
export const useChat = (secondUserId) => {
  const [messages, setMessages] = useState([]);
  const [authUser, setAuthUser] = useAuthUser();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!authUser) return;
    if(!secondUserId) return;

    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.secondUserId
    const curSocket = io(SERVER_URL, {
      query: { secondUserId }
    });  

    setTimeout(() => curSocket.emit('message:get'), 200);

    curSocket.on('messages', (messages) => {
      console.log("Получил сообщения");
      const newMessages = messages.map((msg) =>
        msg.sender.id === authUser.id ? { ...msg, currentUser: true } : msg
      )

      setMessages(newMessages);
    })

    curSocket.on("connect_error", (error) => {
      console.log(error);
    });

    setSocket(curSocket);

    return () =>  {curSocket.disconnect(); setSocket(null)};
  }, [secondUserId, authUser])

  const sendMessage = (content) => {
    socket.emit('message:add', {content});
  }

  return {messages, sendMessage}
}


  // // функция удаления сообщения по id
  // const removeMessage = (id) => {
  //   socketRef.current.emit('message:remove', id)
  // }
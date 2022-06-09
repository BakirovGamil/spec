import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import useAuthUser from './useAuthUser';

const SERVER_URL = 'ws://localhost:3000/chats';

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [authUser, setAuthUser] = useAuthUser();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!authUser) return;

    const curSocket = io(SERVER_URL);  
    console.log(curSocket)

    setTimeout(() => curSocket.emit('chats:get'), 200);

    curSocket.on('chats', (chats) => {
        console.log(chats);

        setChats(chats);
    })

    curSocket.on("connect_error", (error) => {
      console.log(error);
    });

    setSocket(curSocket);

    return () =>  {curSocket.disconnect(); setSocket(null)};
  }, [authUser])

  return chats;
}
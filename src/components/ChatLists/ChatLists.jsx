import ChatListItem from "./ChatListItem";
import "./ChatList.css";

function ChatLists({chats}) {
    return (
        <div className="ChatLists">
            {
                chats.map((chat) => <ChatListItem chat={chat}/>)
            }
        </div>
    );
}

export default ChatLists;
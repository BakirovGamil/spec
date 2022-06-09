function Message({isDisabledTitle = false, message, ...props}) {
    return (
        <div className="Message" {...props}>
            {
                !isDisabledTitle && 
                <div className="Message__title">
                    <span className="Message__name">
                        {message.sender.firstName}
                    </span>
                    <span className="Message__time">
                        {(new Date(+message.id)).toLocaleString()}
                    </span>
                </div>
            }
            <div className="Message__content" style={message.isRead ? {} : {backgroundColor: "var(--c-bg)"}}>
                {message.content}
            </div>
        </div>
    );
}

export default Message;
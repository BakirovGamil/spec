import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import AuthorizationModal from "../AuthorizationModal/AuthorizationModal";
import Button from "../UI/Button/Button";

function WriteMessage({userId}) {
    const navigator = useNavigate();
    const [isAuthVisible, setIsAuthVisible] = useState(false);
    const [authUser, setAuthUser] = useAuthUser();

    function handleClick() {
        if(!authUser) return setIsAuthVisible(true);

        navigator(`/messages/${userId}`);
    }

    return (<>
        <Button className="profile__comment-btn" onClick={handleClick}>
            <i className="gg-comment"></i>
            Написать
        </Button>
        <AuthorizationModal isVisible={isAuthVisible} setIsVisible={setIsAuthVisible}/>
    </>);
}

export default WriteMessage;
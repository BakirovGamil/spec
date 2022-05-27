import Comment from "../../components/Comment/Comment";
import Header from "../../components/Header/Header";
import "./ProfileComments.css";

function ProfileComments() {
    return (<>
        <Header/>
        <main>
            <div className="comments">
                <div className="container">
                    <div className="comments__title title">
                        Отзывы NAME
                    </div>
                    <div className="comments__body">
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default ProfileComments;
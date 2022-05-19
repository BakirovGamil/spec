import { useNavigate } from "react-router-dom";

function Logo({className, ...props}) {
    const classNameCat = className ? ["logo", className].join(' ') : "logo";
    const navigate = useNavigate();

    return (
        <button className={classNameCat} {...props} onClick={() => navigate("/")}>
                <span className="logo__text">
                    спец
                </span>
        </button>
    )
}

export default Logo;
function AuthorizationListItem({isInvalid, children}) {
    return (
        <li className="authorization__list-item">
            {
                isInvalid
                ?
                <span className="authorization__icon authorization__icon_red">
                    <i className="gg-close-o"></i>
                </span>
                :
                <span className="authorization__icon authorization__icon_green">
                    <i className="gg-check-o"></i>
                </span>
            }

            <span className="authorization__text">
                {children}
            </span>
        </li>
    );
}

export default AuthorizationListItem;
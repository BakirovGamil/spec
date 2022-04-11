function Logo({className, ...props}) {
    const classNameCat = className ? ["logo", className].join(' ') : "logo";

    return (
        <button className={classNameCat} {...props}>
            <span className="logo__text">
                спец
            </span>
        </button>
    )
}

export default Logo;
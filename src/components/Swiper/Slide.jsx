function Slide({children, className}) {
    const fullClassName = className ? [className, "slide"].join(" ") : "slide";
    
    return (
        <div className={fullClassName}>
            {children}
        </div>
    )
}

export default Slide;
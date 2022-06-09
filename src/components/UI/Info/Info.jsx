import cls from "./Info.module.css";

function Info({placeholder, className, children, isValid=false}) {
    const classFullName = className ? [cls.info, className].join(' ') : cls.info;

    return (
        <div className={classFullName}>
            <div className={cls.text}>
                <span className={cls.icon} style={isValid ? {} : {alignSelf: "center"}}>
                    {
                        isValid ?
                        <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9651 4.83824C13.739 4.17941 12.5549 3.98382 12.135 3.43824C11.7152 2.88235 11.8767 1.73971 11.3061 1.33824C10.7356 0.936765 9.65912 1.44118 8.97017 1.23529C8.29198 1.01912 7.7322 0 7.00019 0C6.26818 0 5.7084 1.01912 5.04098 1.23529C4.35203 1.44118 3.27554 0.936765 2.69424 1.33824C2.1237 1.73971 2.28517 2.88235 1.86534 3.43824C1.45627 3.98382 0.261371 4.17941 0.0353084 4.83824C-0.179989 5.47647 0.659672 6.3 0.659672 7C0.659672 7.7 -0.179989 8.52353 0.0353084 9.16177C0.261371 9.82059 1.44551 10.0162 1.86534 10.5618C2.28517 11.1176 2.1237 12.2603 2.69424 12.6618C3.26477 13.0632 4.34126 12.5588 5.03022 12.7647C5.7084 12.9809 6.26818 14 7.00019 14C7.7322 14 8.29198 12.9809 8.9594 12.775C9.64835 12.5588 10.7248 13.0632 11.2954 12.6721C11.8767 12.2706 11.7044 11.1279 12.1243 10.5721C12.5441 10.0265 13.7282 9.83088 13.9543 9.17206C14.1696 8.53382 13.3299 7.71029 13.3299 7.01029C13.3299 6.3103 14.1804 5.47647 13.9651 4.83824ZM10.7141 5.84706L5.9237 10.4279L3.2863 7.90588C2.98489 7.61765 2.98489 7.16471 3.2863 6.87647C3.58772 6.58824 4.06138 6.58824 4.36279 6.87647L5.9237 8.36912L9.63759 4.81765C9.939 4.52941 10.4127 4.52941 10.7141 4.81765C11.0155 5.10588 11.0155 5.55882 10.7141 5.84706Z" fill="currentColor"></path></svg>
                        : 
                        <i className="gg-danger" style={{color: "orange"}}></i>
                    }
                </span>
                <span className={cls.data}>
                    {placeholder}
                </span>
                <span>
                    <svg width="1em" height="1em" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9999 6L9.00006 11L4.00006 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </span>
            </div>
            <div className={cls.extra}>
                {children}
            </div>
        </div>
    );
}

export default Info;
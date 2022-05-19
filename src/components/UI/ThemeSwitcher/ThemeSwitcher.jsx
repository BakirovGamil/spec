import { useMemo, useState, useId } from "react";
import cls from "./ThemeSwitcher.module.css"

function ThemeSwitcher({className, ...props}) {
    const id = useId();
    const [checked, setChecked] = useState(false);
    const classNameCat = className ? [cls["switch"], className].join(' ') : cls["switch"];

    useMemo(() => {
        const theme = window.localStorage.getItem('theme'); // если пусто, то null
        
        changeTheme(theme);
    }, [checked]);

    function changeTheme(theme) {
        document.body.className = "";
        switch(theme) {
            case 'light':
                document.body.classList.add('light');
                setChecked(false);
                break;
            case 'dark':
                document.body.classList.add('dark');
                setChecked(true);
                break;
            default: 
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(isDark) {
                    document.body.classList.add('dark');
                    setChecked(true);
                    break;
                }

                document.body.classList.add('light');
                setChecked(false);
                break;
        }
    }

    function handleChange() {
        if(!checked) {
            window.localStorage.setItem('theme', 'dark');
            changeTheme('dark');
        }  else {
            window.localStorage.setItem('theme', 'light');
            changeTheme('light');
        }
    }

    return (
        <div className={classNameCat}>
            <input 
                id={id} 
                checked={checked} 
                onChange={handleChange}
                className={[cls["cmn-toggle"], cls["cmn-toggle-round-flat"]].join(" ")} 
                type="checkbox"
            />
            <label htmlFor={id}></label>
        </div>
    );
}

export default ThemeSwitcher;
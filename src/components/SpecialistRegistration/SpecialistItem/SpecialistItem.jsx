import "./SpecialistItem.css";

function SpecialistItem({title, children, className}) {
    const classNameFull = className ? ["SpecialistItem", className].join(" ") : "SpecialistItem";

    return (
        <div className={classNameFull}>
            <div className="SpecialistItem__title">
               {title}
            </div>
            <div className="SpecialistItem__body">
               {children} 
            </div>
        </div>
    );
}

export default SpecialistItem;
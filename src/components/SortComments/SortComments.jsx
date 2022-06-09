import "./SortComments.css";

function SortComments({sort, setSort, className}) {
    const fullClassName = className ? ["sortComments", className].join(" ") : "sortComments";

    function handleChangeSort(field) {
        const currentOreder = sort.order;
        const currentFiled = sort.field;

        if(currentFiled === field) {
            if(currentOreder === 0) return setSort({field, order: 1});
        
            if(currentOreder === 1) return setSort({field, order: 0});
        }

        return setSort({field, order: currentOreder});    
    }

    return (
        <div className={fullClassName}>
            <div className="sortComments__title">Сортировка по : </div>
            <div className="sortComments__options">
                <button className={sort.field === "date" ? "sortComments__btn sortComments__btn_active" : "sortComments__btn"} onClick={() => handleChangeSort("date")}>
                    Дате
                </button>
                <button className={sort.field === "rating" ? "sortComments__btn sortComments__btn_active" : "sortComments__btn"} onClick={() => handleChangeSort("rating")}>
                    Оценке
                </button>
                <button className="sortComments__btn" onClick={(e) => handleChangeSort(sort.field)}>
                    {
                        sort.order
                        ? " ↑"
                        : " ↓"
                    }
                </button>
            </div>
        </div>
    );
}

export default SortComments;
function FinderSort({sort, setSort}) {
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
        <div className="finder__sortBy">
            <span>
                Сортировка по : 
            </span>
            <button  className={sort.field === "name" ? "sortComments__btn sortComments__btn_active" : "sortComments__btn"} onClick={() => handleChangeSort("name")}>
                Имени
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
    )
}

export default FinderSort;
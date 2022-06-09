import { useMemo } from "react";

function useFilterSortComments(comments, filter, sort) {
    const filteredComments = useMemo(() => {
        if(!comments) return comments;

        if(Object.values(filter).every(filter => filter === false)) return comments; // Если ничего не выбрано, иначе ничего не будет показывать
        
        return comments.filter(comment => filter[comment.rating]);
    }, [comments, filter]);


    const sortedAndFilteredComments = useMemo(() => {    
        if(!comments) return comments;
          
        if(sort.field === "date") 
            return [...filteredComments].sort((comment1, comment2) => sortDate(comment1.date, comment2.date, sort.order));

        if(sort.field === "rating")
            return  [...filteredComments].sort((comment1, comment2) => sortNumber(comment1.rating, comment2.rating, sort.order));

        return filteredComments;
    }, [filteredComments, sort]);

    return sortedAndFilteredComments;
}

export default useFilterSortComments;

function sortDate(date1, date2, order) {
    if(order === 0) 
        return new Date(date2) - new Date(date1);
    
    if(order === 1)
        return new Date(date1) - new Date(date2);
}

function sortNumber(number1, number2, order) {
    if(order === 0)
        return number2 - number1;

    if(order === 1)
        return number1 - number2;
}
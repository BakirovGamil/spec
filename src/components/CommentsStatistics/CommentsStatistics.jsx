import { useState } from "react";
import Rating from "../Rating/Rating";
import "./CommentsStatistics.css";

function CommentsStatistics({comments, filter, setFilter, className}) {
    const arrayOfRating = [5, 4, 3, 2, 1];
    const classNameFull = className ? ["commentStatistics", className].join(" ") : "commentStatistics";

    //Вовзращает строку с типа "1 отзыв", "3 отзыва"
    function getNumbersOfComments(rating) {
        const numbers =  comments.filter(comment => comment.rating === rating).length;

        let sNumbersOfComments;
        switch (numbers) {
        case 0:
            sNumbersOfComments = '0 отзывов';
            break;
        case 1:
            sNumbersOfComments = `1 отзыв`;
            break;
        case 2:
        case 3:
        case 4:
            sNumbersOfComments = `${numbers} отзыва`;
            break;
        default:
            sNumbersOfComments = `${numbers} отзывов`;
        }
    
        return sNumbersOfComments;
    }

    function handleChangeFilter(rating) {
        setFilter({...filter, [rating]: !filter[rating]});
    }

    return (
        <div className={classNameFull}>
            {
                arrayOfRating.map(rating => {
                    return (
                        <div key={rating} className={`commentStatistics__ratingContainer commentStatistics__ratingContainer-${rating}`} onClick={() => handleChangeFilter(rating)}>
                            <input type="checkbox" className="commentStatistics__checkbox" checked={filter[rating]} onChange={() => handleChangeFilter(rating)}/>
                            <Rating className={"commentStatistics__rating"} isDisabled value={rating}/>
                            {
                                getNumbersOfComments(rating)
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default CommentsStatistics;
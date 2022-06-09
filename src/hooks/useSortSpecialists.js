//{field, order}

import { useMemo } from "react";

function useSortSpecialists(sort, specialists) {
    const sortedSpecialists = useMemo(() => {
        if(sort.field === "rating") {
            return sortByRating(specialists, sort.order);
        }

        if(sort.field === "name") {
            return sortByName(specialists, sort.order);
        }
    }, [specialists, sort]);

    return sortedSpecialists;
}

export default useSortSpecialists;


function sortByRating(specialists, order) {
    if(order === 0) {
        return [...specialists].sort((spec1, spec2) => spec2.stats.averageRating - spec1.stats.averageRating);
    } else {
        return [...specialists].sort((spec1, spec2) => spec1.stats.averageRating - spec2.stats.averageRating);
    }
}

function sortByName(specialists, order) {
    if(order === 0) {
        return [...specialists].sort((spec1, spec2) => getFullName(spec1).localeCompare(getFullName(spec2)));
    } else {
        return [...specialists].sort((spec1, spec2) => getFullName(spec2).localeCompare(getFullName(spec1)));
    }
}

function getFullName(specialist) {
    const user = specialist.user;

    return [user.lastName, user.firstName, user.middleName].join(" ").toLowerCase();
}
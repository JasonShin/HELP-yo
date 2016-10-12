import moment from 'moment';

export const dayOfWeekAsString = (dayIndex) => {
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
};

export const monthOfYearString = (monthIndex) => {
    return ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][monthIndex];
};


export const getBuildingNumber = (building) => {
    return building.split('\.')[0];
}

//TODO: Possibly refactored
export const getMonthDate = (rawDate) => {
    let momentDate = moment(rawDate);
    let monthAsString = monthOfYearString(momentDate.month()).substring(0,3);
    let date = momentDate.date();

    return {monthAsString, date};
}

/**
 * To uppercase was used for return value to make sure dddd is all uppercase
 * @param rawStartDate
 * @returns {string}
 */
export const getFormattedStartDate = (rawStartDate) => {
    let momentDate = moment(rawStartDate);
    let formattedDate = momentDate.format('dddd, DD/MM/YYYY');
    return formattedDate.toUpperCase();
};

export const getFormattedEndDate = (rawEndDate) => {
    let momentDate = moment(rawEndDate);
    let formattedDate = momentDate.format('DD/MM/YYYY');
    return formattedDate;
};

export const getFormattedRangeDate = (rawStartDate, rawEndDate, delimeter) => {
    let start = getFormattedStartDate(rawStartDate);
    let end = getFormattedEndDate(rawEndDate);
    return [start, end].join(delimeter);
};

//TODO: Optimize this for 'firebase.js:353 Uncaught Error: Firebase.child failed: First argument was an invalid path: "/workshopBookings/demo@student.uts.edu.au/23". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"'
export const parseEmailForFirebase = (userId) => {
    return userId.replace(/\./g, '_');
};
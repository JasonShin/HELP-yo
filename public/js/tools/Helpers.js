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
    let formattedDate = momentDate.format('dddd, DD/MM/YYYY h:mm a');
    return formattedDate.toUpperCase();
};

export const getFormattedEndDate = (rawEndDate) => {
    let momentDate = moment(rawEndDate);
    let formattedDate = momentDate.format('DD/MM/YYYY h:mm a');
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

export const getDuration = (dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diff = Math.abs((date2.getTime() - date1.getTime()));

    let x = diff / 1000;
    let seconds = x % 60;
    x = Math.floor(x / 60);
    let minutes = x % 60;
    x = Math.floor(x / 60);
    let hours = x % 24;
    x = Math.floor(x / 24);
    let days = x;

    let daysStr;
    let hoursStr;
    let minutesStr;
    let secondsStr;

    if (days > 0) {
        daysStr = `${days} days`;
        if (days === 1) {
            daysStr = `${days} day`;
        }
    }
    if (hours > 0) {
        hoursStr = `${hours} hours`;
        if (hours === 1) {
            hoursStr = `${hours} hour`;
        }
    }
    if (minutes > 0) {
        minutesStr = `${minutes} minutes`;
        if (minutes === 1) {
            minutesStr = `${minutes} minute`;
        }
    }
    if (seconds > 0) {
        secondsStr = `${seconds} seconds`;
        if (seconds === 1) {
            secondsStr = `${seconds} second`;
        }
    }

    const duration = `${daysStr || ''} ${hoursStr || ''} ${minutesStr || ''} ${secondsStr || ''}`;
    return duration;
};

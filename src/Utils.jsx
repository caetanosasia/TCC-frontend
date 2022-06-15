const getDate = (timestamp) => {
    var date = new Date(timestamp * 1000);
    const time = date.toLocaleDateString("pt-BR");
    return time;
}

const dateToTimeStamp = (date) => {
    const dateWithoutTime = date.setHours(0, 0, 0, 0);
    const timestamp = Math.floor(dateWithoutTime / 1000);
    return timestamp;
}

const Utils = {
    getDate: getDate,
    dateToTimeStamp: dateToTimeStamp
};

export default Utils;
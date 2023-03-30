export function addDays(date, days){
    var date = new Date(date.valueOf());
    date.setDate(date.getDate() + days);
    return new Date(date.setHours(0,0,0,0));
};
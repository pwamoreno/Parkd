function Datestamp(){

    let datestamp = Date.now()

    let months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    }
    
    let full_date = new Date(datestamp);

    let date = full_date.getDate();
    let month = full_date.getMonth();
    let year = full_date.getFullYear();

    let current_date = `${date}, ${months[month]}, ${year}`


    return current_date;
}

export default Datestamp;
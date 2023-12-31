function Timestamp() {
    let today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();

    let newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    let newHours = hours < 10 ? `0${hours}` : `${hours}`

    let current_time = `${newHours}:${newMinutes}`

    return current_time
}

export default Timestamp;
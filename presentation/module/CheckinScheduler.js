import { hoyoRepository } from "../../data/HoyolabRepository.js"

export class CheckInScheduler {
    timerId = "check_in"

    /** Public */
    startReminder(checkInTime, callback) {
        let time 
        try {
            time = checkInTime.split(":")[0]
        } catch (error) {
            console.log(error)
            time = "00:00"
        }

        setInterval(() => {
            let hourNow = new Date().getHours()
            if (time !== hourNow) return
            
            hoyoRepository.checkInAllUser(callback)
        }, 2000) //3600000
    }

    isAnyUserRegistered() { // True if it has user, false if user is empty
        return hoyoRepository.hasUser()
    }
}
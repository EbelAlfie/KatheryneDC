import { hoyoRepository } from "../../data/HoyolabRepository.js"

export class CheckInScheduler {
    timerId = "check_in"
    scheduler = null
    lastCheckin = null

    /** Public */
    startReminder(checkInTime, callback) {
        if (this.scheduler) return 

        this.scheduler = setInterval(async () => {
            const now = new Date()
            const hour = now.getHours()
            const today = now.toDateString()
            if (hour !== 1 || lastCheckin == today) return
            this.lastCheckin = today

            hoyoRepository.checkInAllUser(callback)
        }, 3600000) //3600000
    }

    stopReminder() {
        if (!this.scheduler) return
        clearInterval(this.scheduler)
        this.scheduler = null
    }

    isAnyUserRegistered() { // True if it has user, false if user is empty
        return hoyoRepository.hasUser()
    }
}
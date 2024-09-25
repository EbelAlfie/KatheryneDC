class HoyolabRepository {
    time: number | null = null
    timerId: string = "check_in"

    constructor() {}

    setCheckInHour(checkInTime: string) {
        clearInterval(this.timerId) 
        let time = Date.parse(checkInTime) 
    }

    remindCheckIn(callback: BasicCallback<CheckInResponse>) {
        this.time = Date.parse("12:00 am")
        console.log(this.time)
        setInterval(() => {
            let hourNow = new Date().getHours()
            console.log(this.time, hourNow)
            console.log(this.time === hourNow)
            if (this.time === hourNow) 
                this._checkIn()
                .catch((error : Error) => callback.onError(error))
                .then((result: CheckInResponse) => callback.onSuccess(result))
        }, 60000)
    }

    _checkIn() {
        onlineApi.checkIn()
    }

    _login() {
        onlineApi.login()
    }

    _register() {

    }

}

const hoyoRepository = new HoyolabRepository()

module.exports = hoyoRepository
export const TaskType = Object.freeze({ 
    CHECK_IN: "CHECK_IN",
    DAILY: "DAILY"
})

export class TaskModel {
    constructor(userModel, type, date) {
        this.userModel = userModel
        this.type = type
        this.date = date
    }
}

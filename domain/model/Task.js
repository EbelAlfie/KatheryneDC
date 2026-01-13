export const TaskType = Object.freeze({ 
    CHECK_IN: "CHECK_IN",
    DAILY: "DAILY"
})

export function newTask(userModel, type, date) {
    return {
        userModel: userModel,
        type: type,
        date: date
    }
}
export class TaskRepository {
    localApi

    constructor(config) {
        const { localApi } = config
        this.localApi = localApi
    }

    addTask(newTask) { 
        this.localApi.addTask(newTask)
    }

    removeTask() {
        this.localApi.removeTask({ time: Date.now() })
    }

    getTask() {
        return this.localApi.getTask({ by: Date.now() })
    }
}
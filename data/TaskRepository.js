export class TaskRepository {
    localApi

    constructor(config) {
        const { localApi } = config
        this.localApi = localApi
    }

    async addTask(newTask) { 
        await this.localApi.addTask({
            userId: newTask.userModel.userId,
            newTask: newTask
        })
    }

    async removeTask() {
        await this.localApi.removeTask({ time: new Date() })
    }

    async getTask() {
        return await this.localApi.getTask({ by: new Date() })
    }
}
const Task = require('../model/Tasks');
const User = require('../../user/model/User');
const userService = require('../../user/services/UserService')
const taskUtils = require('../utils/TaskUtils');

class TaskService {
    async createTask(userId, taskType, dateStart, note, managerId) {
        try{
            const taskCode = await taskUtils.generateTaskCode(taskType);
            const status = "backlog";
            const owner =  await userService.getUserById(userId)
            // const manager = await userService.getUserById(managerId)

            const task = new Task({
                taskCode,
                taskType,
                dateStart,
                status,
                note,
                owner: owner.userName,
                manager: managerId
            });

            
            await task.save();
            return task;
        } catch (error){
            throw error
        }
    }

    async getTaskByOwner(userId) {
        try{
            const user = await userService.getUserById(userId)
            if(!user){
                return 'User don`t exist';
            }
            const owner = user.userName;
            const tasks = Task.find({owner})

            return tasks;

        } catch (error){
            throw error
        }
    }
    async getTaskById(taskCode) {
        try{
            const task = Task.findOne({taskCode})
            if(!task) throw 'No tasks found for this code';
            return await task;
        } catch (error){
            throw error
        }
    }
    async updateTask(taskCode, status) {
        try {

            const task = await Task.findOne(
                {
                    taskCode
                }
            );
            if (!task) {
                return 'Task not found'
            }

            const idTask = task._id;
            let dateStart;
            let dateEnd;

            if (status === 'doing') {
                const dateStart = Date.now();
                dateEnd = new Date(dateStart);
                dateEnd.setDate(dateEnd.getDate() + 5);
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateStart, dateEnd, status }, { new: true });
                return taskUpdate;
            }

            if (status === 'review') {
                dateEnd = new Date(Date.now());
                dateEnd.setDate(dateEnd.getDate() + 3);
                dateStart = new Date(Date.now());
                const note = `review the task ${task}`
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                const taskType = 'review';
                const owner = task.manager;
                const manager = null;
                const newTask = await this.createTask(owner, taskType, dateStart, note, manager)
                return {taskUpdate , newTask};
            }

            if (status === 'onDeployment') {
                dateEnd = new Date(Date.now());
                dateEnd.setDate(dateEnd.getDate() + 2);
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                return taskUpdate;
            }

            if (status === 'done') {
                dateEnd = Date.now();
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                return taskUpdate;
            }

            throw new Error('Invalid status');
        } catch (error) {
            throw new Error(`Error updating task: ${error}`);
        }
    }
    // async deleteTaskByCode(taskCode) {
    //     try{
    //         const task = Task.findOne({taskCode});
    //         if(!task) {
    //             return "Tarefa não encontrada";
    //         }
    //         await Task.deleteOne(task._id)
    //         return "Sucesso ao deletar a tarefa"
    //     } catch (error){
    //         throw error
    //     }
    // }
}

module.exports = new TaskService();
/**
 * TaskService test suite
 *
 * @description Test suite for TaskService module
 */

const TaskService = require('../src/modules/tasks/service/TaskService');
const TaskUtils = require('../src/modules/tasks/utils/TaskUtils');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
jest.setTimeout(10000);
/**
 * Before all tests, create a new MongoDB instance and connect to it
 */
beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create();
    const mongouri = mongoServer.getUri();
    mongoose.connect(mongouri);
})
/**
 * TaskService test suite
 */
describe('TaskService', () => {
    /**
     * Test generateTaskCode function
     */
    describe('generateTaskCode', () => {
        it('Should generate a Task Code with 6 characters begining with the three first of the type of the Task', async () => {
            const taskType = "test";
            const taskCode = await TaskUtils.generateTaskCode(taskType);
            expect(taskCode).toBe("TES001"); 
        });
    });
    describe('createTask', () => {
        /**
         * Test createTask with valid task data
         */
        it("Should create a new Task", async () => {
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            expect(newTask).toBeDefined();
            expect(newTask.taskCode).toBe(taskData.taskCode);
            expect(newTask.taskType).toBe(taskData.taskType);
            expect(new Date(newTask.dateStart).toISOString()).toBe(taskData.dateStart.toISOString());
            expect(newTask.note).toBe(taskData.note);
            expect(newTask.userId).toBe(taskData.userId);
        });
    });
    describe('getTaskByUser', () => {
        /**
         * Test getTaskByUser with a valid user ID
         */
        it("Should return all tasks of a user", async () => {
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const tasks = await TaskService.getTaskByIdUser(taskData.userId);
            expect(newTask).toBeDefined();
            expect(tasks).toBeDefined();
        });
    });
    describe('getTaskByCode', () =>{
        /**
         * Test getTaskByCode with a valid task code
         */
        it("Should return a task by its code", async () => {
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const task = await TaskService.getTaskById(taskData.taskCode);
            expect(task).toBeDefined();
            expect(newTask).toBeDefined();
        });
    });
    describe('updateTask', () => {
        /**
         * Test updateTask with a valid task code and status
         */
        it("Should update a task' status to doing", async () => {
            /**
             * Test suit in case of "doing" status
             */
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const status = 'doing';
            const taskUpdated = await TaskService.updateTask(taskData.taskCode, status);
            expect(newTask).toBeDefined();
            expect(taskUpdated).toBeDefined();
            expect(taskUpdated.status).toBe(status);
        });
        it("Should update a task' status to review", async () => {
            /**
             * Test suit in case of "review" status
             */
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const status = 'review'
            const taskUpdated = await TaskService.updateTask(taskData.taskCode, status);
            expect(newTask).toBeDefined();
            expect(taskUpdated).toBeDefined();
            expect(taskUpdated.status).toBe(status);

        });
        it("Should update a task' status to onDeployment", async () => {
            /**
             * Test suit in case of "onDeployment" status
             */
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const status = 'onDeployment'
            const taskUpdated = await TaskService.updateTask(taskData.taskCode, status);
            expect(newTask).toBeDefined();
            expect(taskUpdated).toBeDefined();
            expect(taskUpdated.status).toBe(status);
        });
        it("Should update a task' status to done", async () => {
             /**
             * Test suit in case of "done" status
             */
            const dateNow = new Date();
            const taskData = {
                taskCode : 'TES001',
                taskType : 'test',
                dateStart : dateNow,
                note : 'Testng',
                userId : '661e646fb3ec4f89b3b57445'
            }
            const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
            const status = 'done'
            const taskUpdated = await TaskService.updateTask(taskData.taskCode, status);
            expect(newTask).toBeDefined();
            expect(taskUpdated).toBeDefined();
            expect(taskUpdated.status).toBe(status);
        });
    });
    // describe('deleteTaskByCode', () => {
    //     it('should delete the task by his code', async() => {
    //         const dateNow = new Date();
    //         const taskData = {
    //             taskCode : 'TES001',
    //             taskType : 'test',
    //             dateStart : dateNow,
    //             note : 'Testng',
    //             userId : '661e646fb3ec4f89b3b57445'
    //         }
    //         const newTask = await TaskService.createTask(taskData.taskCode, taskData.taskType, taskData.dateStart, taskData.note, taskData.userId);
    //         const deletedTask = await TaskService.deleteTaskByCode(taskData.taskCode);
    //         expect(newTask).toBeDefined();
    //         expect(deletedTask).toBe("Sucesso ao deletar a tarefa")
    //     });
    // });
});

afterAll(async () => {
    /**
     * After all tests, disconnects to MongoDB instance and closes it.
     **/    
    await mongoose.disconnect();
    await mongoServer.stop();
  });
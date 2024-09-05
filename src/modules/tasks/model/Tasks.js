const mongoose  = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskCode: {type: String},
    taskType: {type: String, enum:['dev', 'arch', 'database', 'test', 'review', 'implementation']},
    dateStart: {type: Date},
    dateEnd: {type: Date, default: null},
    status: {type: String, enum: ['backlog', 'doing', 'review', 'onDeployment', 'done']},
    note: {type: String},
    owner: {type: String, ref: 'User', required: true},
    manager: {type: String, ref: 'User'}
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
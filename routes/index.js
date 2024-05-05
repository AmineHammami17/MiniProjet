const departmentRoute = require('./departmentRoute');
const specialityRoute = require('./specialityRoute');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const levelRoute = require('./levelRoute');
const groupeRoute = require('./groupeRoute');
const studentRoute = require('./studentRoute');
const teacherRoute = require('./teacherRoute');
const subjectRoute = require('./subjectRoute');
const teachingRoute = require('./teachingRoute');
const noteRoute = require('./noteRoute');
const classroomRoute = require('./classroomRoute');
const documentRoute = require('./documentRoute');

const mountRoutes = (app) => {
    app.use('/api/v1/departments', departmentRoute);
    app.use('/api/v1/specialities', specialityRoute);
    app.use('/api/v1/users',userRoute);
    app.use('/api/v1/auth',authRoute);
    app.use('/api/v1/levels',levelRoute);
    app.use('/api/v1/groups',groupeRoute);
    app.use('/api/v1/students',studentRoute);
    app.use('/api/v1/teachers',teacherRoute);
    app.use('/api/v1/subjects',subjectRoute);
    app.use('/api/v1/teaching',teachingRoute);
    app.use('/api/v1/notes',noteRoute);
    app.use('/api/v1/classrooms',classroomRoute);
    app.use('/api/v1/documents',documentRoute);
   
    


};

module.exports = mountRoutes;

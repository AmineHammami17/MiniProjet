const departmentRoute = require('./departmentRoute');
const specialityRoute = require('./specialityRoute');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const levelRoute = require('./levelRoute');
const groupeRoute = require('./groupeRoute');

const mountRoutes = (app) => {
    app.use('/api/v1/departments', departmentRoute);
    app.use('/api/v1/specialities', specialityRoute);
    app.use('/api/v1/users',userRoute);
    app.use('/api/v1/auth',authRoute);
    app.use('/api/v1/levels',levelRoute);
    app.use('api/v1/groups',groupeRoute);




};

module.exports = mountRoutes;

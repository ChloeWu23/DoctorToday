var bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();


// app.use(require('cors'));
// var corsOptions = {
//     // origin: "http://localhost:8081/"
//     origin: "*"
//   };
// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)) // Use this after the variable declaration



// app.use((req, res, next) => {
//     console.log('Hello from the middleware');
//     next();
// })


const serviceRouter = require('./routes/serviceRoutes');
const adminServiceRouter = require('./routes/adminServiceRoutes');
const adminSubServiceRouter = require('./routes/adminSubServiceRoutes');
const adminDisableTimeRouter = require('./routes/appointmentRoutes');
const emailServiceRouter = require('./routes/emailServiceRoutes');

const registerEmailRouter = require('./routes/registerEmailRoutes');

const openingHoursRouter = require('./routes/openingHoursRoutes');
const faqRouter = require('./routes/faqRoutes');
const travelRouter = require('./routes/travelRoutes');
const otherInfoRouter = require('./routes/otherInfoRoutes');
const peopleRouter = require('./routes/peopleRoutes');

// app.use('/', serviceRouter);
app.use('/service', serviceRouter); 
app.use('/admin/service', adminServiceRouter) ;
app.use('/admin/sub-service', adminSubServiceRouter);
app.use('/sendEmail', emailServiceRouter)

app.use('/sendRegisterEmail', registerEmailRouter)

app.use('/disable-time-slot', adminDisableTimeRouter);
app.use('/opening-hours', openingHoursRouter);
app.use('/faq', faqRouter);
app.use('/travel', travelRouter);
app.use('/other-info', otherInfoRouter);
app.use('/people', peopleRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

// connect the database
const db = require("./app/models");
db.sequelize.sync();
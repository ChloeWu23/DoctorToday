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


app.use(cors(corsOptions)) // Use this after the variable declaration


app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log('Hello from the middleware');
//     next();
// })


const serviceRouter = require('./routes/serviceRoutes');
const adminServiceRouter = require('./routes/adminServiceRoutes');
const emailServiceRouter = require('./routes/emailServiceRoutes');
// app.use('/', serviceRouter);
app.use('/service', serviceRouter); // serviceRouter.get()

app.use('/admin/service', adminServiceRouter) // adminServiceRouter.post()

app.use('/sendEmail', emailServiceRouter) //emailServiceRoutes.get()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

// connect the database
const db = require("./app/models");
db.sequelize.sync();
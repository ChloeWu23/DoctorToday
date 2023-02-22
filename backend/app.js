const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


const serviceRouter = require('./routes/serviceRoutes');
const adminServiceRouter = require('./routes/adminServiceRoutes');
const adminSubServiceRouter = require('./routes/adminSubServiceRoutes');
const emailServiceRouter = require('./routes/emailServiceRoutes');
const registerEmailRouter = require('./routes/registerEmailRoutes');

const faqRouter = require('./routes/faqRoutes');
const travelRouter = require('./routes/travelRoutes');
const otherInfoRouter = require('./routes/otherInfoRoutes');
const peopleRouter = require('./routes/peopleRoutes');
const newsRouter = require('./routes/newsRoutes');

const keywordSearchRouter = require('./routes/keywordSearchRoutes');

// app.use('/', serviceRouter);
app.use('/service', serviceRouter); 
app.use('/admin/service', adminServiceRouter) ;
app.use('/admin/sub-service', adminSubServiceRouter);
app.use('/sendEmail', emailServiceRouter)
app.use('/sendRegisterEmail', registerEmailRouter)
app.use('/faq', faqRouter);
app.use('/travel', travelRouter);
app.use('/other-info', otherInfoRouter);
app.use('/people', peopleRouter);
app.use('/news', newsRouter);
app.use('/keywordSearch', keywordSearchRouter);

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to our the backend 2.0 app',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

// connect the database
const db = require("./app/models");
db.sequelize.sync();

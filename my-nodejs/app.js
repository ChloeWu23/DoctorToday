const express = require("express");
const cors = require("cors");
const app = express();


// app.use(require('cors'));
// var corsOptions = {
//     // origin: "http://localhost:8081/"
//     origin: "*"
//   };
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log('Hello from the middleware');
//     next();
// })


const serviceRouter = require('./routes/serviceRoutes');

app.use('/', serviceRouter);
app.use('/service', serviceRouter); // serviceRouter.get()
/*
app.use('/admin/service') // adminServiceRouter.post()
*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});
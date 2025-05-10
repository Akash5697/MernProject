const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-rouet");

const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');


const corsOptions = {
    origin: "http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};
app.use(cors(corsOptions));


require("dotenv").config();
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/form/",contactRoute);
app.use("/api/data/",serviceRoute);

//admin route for getting users
app.use("/api/admin/",adminRoute);






app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

//call connectDb to astablish the connection with DB
connectDb().then(() =>{
    app.listen(PORT, () =>{
        console.log(`server is running at port : ${PORT}`);
    });
});

//jut for see every thing is working
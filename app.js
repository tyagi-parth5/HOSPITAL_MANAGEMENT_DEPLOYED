import express from "express"
import { config } from "dotenv";  //import config.env
import cors from "cors"       //connect frontend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js'
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"

//import config port,uri,etc...
const app=express();
config({path:"./config/config.env"});

//middleware -- connect frontend
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL,process.env.DOCTOR_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true,
}));

//get middleware by cookie-parser
app.use(cookieParser()); 
//data parse in string format as actual in json
app.use(express.json());
//date(date format),name(string) ---
app.use(express.urlencoded({extended:true}));
//fileUpload
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",  //docs written
    })
);

app.use("/api/v1/message",messageRouter);  //use message router
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

//connect to dasbase
dbConnection();


app.use(errorMiddleware);
export default app;
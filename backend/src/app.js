import express from 'express';
import { createServer } from 'node:http';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRouter  from './routes/auth.route.js';
import errorHanlder from "./middlewares/errorHandling.js";
import morgan from "morgan";
import roomRouter from "./routes/room.route.js";
import messageRouter from "./routes/message.route.js";
import codeRouter from "./routes/code.route.js";
import { initSocket } from "./sockets/index.js";



const app = express();
const server = createServer(app);
initSocket(server)



/** application middleware */
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use('/api/auth', authRouter);
app.use("/api/room",roomRouter)
app.use("/api/messages",messageRouter )
app.use("/api/code",codeRouter)









app.use(errorHanlder)
export {app,server};
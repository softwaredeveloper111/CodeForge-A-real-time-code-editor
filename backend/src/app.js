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
import path from "path";
import { fileURLToPath } from "url";



const app = express();
const server = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
initSocket(server)



/** application middleware */
app.use(cors({
    origin: 'https://codeforge-a-real-time-code-editor.onrender.com',
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


app.use((req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/socket.io")) {
    return next(); // ✅ API calls pass karo
  }
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});



app.use(errorHanlder)
export {app,server};
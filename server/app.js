import express from 'express'
import mongoose from 'mongoose';
import config from './config'
import helmet from 'helmet';

const app = express();
const { MONGO_URI } = config;

app.use(hpp())
app.use(helmet())

app.use(cors({orgin: true, cretentials: true}))
app.use(morgan("dev"))

app.use(express.json())


mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(()=> console.log("MongoDB connecting Success"))
.catch((e) => console.log(e));

// 라우터 사용
app.get("/")

export default app;  
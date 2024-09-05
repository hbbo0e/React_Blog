import app from "./app";
import config from './config/index';

const { PORT } = config;

app.listen(PORT, ()=>{
    console.log(`----- 여기는 ${PORT}번 포트에용 -----`)
});
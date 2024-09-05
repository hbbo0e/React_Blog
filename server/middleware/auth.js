import jwt from 'jsonwebtoken';
import config from '../config/index';
import router from '../routes/api/post';
import User from '../models/user';

const { JWT_SECRET } = config

const auth = (req, res, next) => {
    
    // 토큰 값은 브라우저 헤더에 저장되기 때문에 헤더에서 토큰 값을 가져옴
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg : "토큰 값이 없습니다 !" });
    }
    try{
        // 토큰이 있을 경우, 토큰 해석
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 토큰과 서버에서 발행했다는 인증 값 (시크릿 값) 을 같이 넣어서 토큰을 해석하고 요청한 유저와 일치하면 넘어가도록
        req.user = decoded;
        next();

    } catch(e){
        console.log(e);
        res.status(400).json({ msg : "토큰이 유효하지 않습니다 ! 다시 로그인 하세용" });
    }
}


export default auth;
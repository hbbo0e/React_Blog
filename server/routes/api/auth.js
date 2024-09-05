import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from "../../middleware/auth";
import config from "../../config";

const { JWT_SECRET } = config;

// model
import User from "../../models/user";

const router = express.Router();

/**
 * @routes POST api/auth
 * @desc 로그인
 * @access public
 */

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // 인증
    if(!email || !password){
        return res.status(400).json({ msg : "이메일과 비밀번호를 입력해주세요 !" });
    };

    // 확인
    User.findOne({ email }).then((user) => {
        if(!user)
            return res.status(400).json({ msg : "가입된 이메일이 아닙니다 !" });

        // 비밀번호 확인
        // password = 현재 유저가 입력한 비밀번호
        // user.password = 유저가 입력한 이메일의 암호화된 비밀번호
        bcrypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch) 
                // compare 의 반환 값은 boolean, 두 값이 일치하지 않을 경우
                return res.status(400).json({ msg : "비밀번호가 일치하지 않습니다 !" });
            // 비밀번호 일치할 경우, 로그인
            jwt.sign(
                { id : user.id },
                JWT_SECRET,
                { expiresIn : "2 days" },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id : user.id,
                            name : user.name,
                            email : user.email,
                            role : user.role,
                        }
                    })
                }
            )
        })
    })
})

router.post('/logout', (req, res) => {
    res.json("로그아웃 됐습니다 !");
})

router.get('/user', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password")
        if(!user) throw Error (" 해당 아이디를 가진 유저는 없습니다 !" )
        res.json(user)
    } catch(e) {
        console.log(e);
        res.status(400).json({ msg : e.message })
    }
})

export default router;
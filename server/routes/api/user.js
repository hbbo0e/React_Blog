import express from "express";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from '../../config/index';

const { JWT_SECRET } = config;


// model
import User from '../../models/user';

const router = express.Router(); // express 에서 라우터 불러오기

/**
 * @routes GET api/user
 * @desc 모든 유저 가져오기
 * @access public
 */

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        if(!users) throw Error("사용자가 없어용");
        res.status(200).json(users);
    } catch(e){
        console.log(e);
        res.status(400).json({ msg : e.message });
    }
});

/**
 * @routes POST api/user
 * @desc 회원가입
 * @access public
 */

router.post('/', (req, res) => {
    console.log(req.body); // 브라우저에서 express 로 뭔가의 정보를 넘길 때 대부분 이 body 에 담겨있음
    const { name, email, password } = req.body;

    // 필수 항목 확인
    if(!name || !email || !password){
        return res.status(400).json({ msg : "필수 항목을 입력해주세요 !" });
    };

    // 유저 확인 후 가입
    User.findOne({email}).then((user => {
        if(user) 
            return res.status(400).json({ msg : "해당 이메일은 이미 가입되어 있습니다 !"});
        const newUser = new User({
            name, email, password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign(
                        { id : user.id },
                        JWT_SECRET,
                        { expiresIn : 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user : {
                                    id : user.id,
                                    name : user.name,
                                    email : user.email,
                                }
                            })
                        }
                    )
                })
            })
        })
    }));

})

export default router;
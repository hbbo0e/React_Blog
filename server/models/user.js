import moment from 'moment';
import mongoose from 'mongoose';
// mongoDB 를 사용해서 JS 로만 관리해줄 것이기 때문에 mongoose 라이브러리를 import 함

// Schema 생성
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["system", "manager", "customer"],
        default: "User"
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm")
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post"
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "commnets"
            },
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

const User = mongoose.model("user", UserSchema);

export default User;
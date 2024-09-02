import express from 'express'

// Model
import Post from '../../models/post'

const router = express.Router()

// api/post 
router.get('/', async(req, res)=> {
    const postFindResult = await Post.find()
    console.log(postFindResult, "All Post Get")
    res.json(postFindResult)
})


// post routes
router.post('/', async(req, res) => {
    try{
        console.log(req, "----- req -----");
        const { title, contents, fileUrl, creator } = req.body;
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost)
    } catch(e) {
        console.log(e);
    }
}) 

// 모듈화하여 내보내기
export default router;
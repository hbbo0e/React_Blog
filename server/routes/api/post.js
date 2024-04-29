import express from 'express'

// 글을 작성하기 위해 mongoDB 모델을 불러와야 한다.
import Post from '../../models/post'

const router = express.Router()

// 모든 post 를 검색하는 라우터
router.get('/', async(req, res)=> {
    const postFindResult = await Post.find()
    console.log(postFindResult, "전체 게시글을 조회했습니다.")
    res.json(postFindResult)
})


// 게시글 작성 라우터
router.post('/', async(req, res) => {
    
})
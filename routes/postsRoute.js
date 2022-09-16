const router = require('express').Router()
const Post = require('../model/Post')
const myLogger = require('../utils/myLogger')
const authMiddleWare = require('../middleware/AuthenticationMiddleWare')


router.get('/', async (req, res) => {
    try {
        myLogger.info('Get all posts')
        const listPost = await Post.find().sort({time : -1}).populate('user')
        res.json(listPost)
    } catch (error) {
        myLogger.error(`Get data from DB failed : ${error}`)
        res.json({message : error.message})
    }
})

router.post('/', authMiddleWare ,async (req, res) =>{
    try {
        myLogger.info('insert post with data : ' + req.body)
        const userInfo = req.user?.data[0]
        let data = req.body
        data.user = userInfo['_id']
        const post = new Post(data);
        const result = await post.save();
        myLogger.info(`Insert post to DB successfully` )
        res.json(result)
    } catch (error) {
        myLogger.error(`Insert post to DB failed : ${error}` )
        res.json({message : error.message})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.params.id, req.body)
        res.json(result)
    } catch (error) {
        res.json({message : error.message})
    }
})


// router.get('/:id', async (req, res) => {
//     try {
//         const result = await Post.findById(req.params.id)
//         if(result == null){
//             res.json({})
//             return
//         }
//         res.json(result)
//     } catch (error) {
//         res.json({message : error.message})
//     }
// })

router.get('/post', authMiddleWare, async (req, res) => {
    try {
        myLogger.info('Get posts of user')
        const userInfo = req.user?.data[0]

        const posts = await Post.find({userId : userInfo['_id']})
        res.json(posts)

    } catch (error) {
        res.json({message : error.message})
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const result = await Post.findByIdAndDelete(req.params.id)
        res.json(result)
    } catch (error) {
        res.json({message : error.message})
    }
})

module.exports = router
const {Router} = require('express')
const {getPosts, getCreatePostForm, createPost, getPost, deletePost, editPost, getEditPostForm} = require('../controllers/index.controller')
const router = Router()


// router.get('/users', getUsers)
// router.get('/users/:id', getUserById)
// router.post('/users', createUsers)
// router.delete('/users/:id', deleteUser)
// router.put('/users/:id', editUser)

router.get('/', (req, res) => {
  res.render('hello.pug', { title: 'BLOG'})
});

router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)

router.get('/edit-post/:id', getEditPostForm)
router.put('/posts/:id', editPost)

router.get('/create-post', getCreatePostForm)
router.post('/create-post', createPost)

// router.get('/urlparam', (req, res) => {
//   res.send(req.query)
// });

// router.post('/urljson', (req, res) => {
//   res.send(req.body)
// });

module.exports = router
const router = require('express').Router();
const Post = require('mongoose').model('Post');
const Author = require('mongoose').model('Author')
// const Author = require('../index').models.Author;

//get all posts
const getPosts = (req, res)=>{
    Post.find((err,data)=>{
        res.send(data.map((a)=>
         a
        )
    )
    })
}

const getPostsByAuthors = (req, res)=>{
    Post.find({}).populate('author').exec((err, data)=>{
        res.send(data)

        console.log('get posts by author',data)
    })
}

//get all posts sorted by date
const getPostsSortByDate = (req, res)=>{
    Post.find((err,data)=>{
        res.send(data.map((a)=>
        a
        ).sort((a,b)=> b.date>a.date))
    })
}



//get all posts sorted alphabetically
const getPostsAZ = (req, res)=>{
    Post.find((err,data)=>{
        res.send(data.map((a)=>
        a.title
        ).sort())
    })
}
//get all posts that have a react tag
const getPostsReactTag = (req, res)=>{
    Post.find({"tags": 'react'},(err,data)=>{
        res.send(data)
    })
}

//get all posts that have a specific tag
const getPostsByTag = (req, res)=>{
    Post.find({"tags": req.body},(err,data)=>{
        res.send(data)
        console.log('request by tag')
    })
}
const getPostsByText = (req, res)=>{
    Post.find({"body": req.params.txt},(err,data)=>{
        res.send(data)
        console.log('request by text')
    })
}

//get one post
const getOnePost = (req,res)=>{
    Post.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
}

//create one post
const createOnePost = (req, res) => {
    Post.create(req.body, (err,data)=>{

        res.send(data)
        console.log('Post created',data)
    })
}

//delete one post
const deleteOnePost = (req,res)=>{
    Post.remove({_id:req.params.id},(err,data)=>{
        res.send(data)
    })
}

//delete one post
const updateOnePost = (req,res)=>{
    Post.findOneAndUpdate({_id:req.params.id}, req.body,{new: true},(err,data)=>{
        res.send(data)
})
}
// , {$set:{title:"luis",body:"have a good night"}}
router.route('/posts_with_authors')
    .get(getPostsByAuthors)



router.route('/')
    .get(getPosts)
    .post(createOnePost)


router.route('/sort/by-date')
    .get(getPostsSortByDate)

router.route('/sort/a-z')
    .get(getPostsAZ)

router.route('/:id')
    .get(getOnePost)
    .put(updateOnePost)

router.route('/tags/react')
    .get(getPostsReactTag)

router.route('/tags/:tag')
    .get(getPostsByTag)

router.route('/texts/:txt')
    .get(getPostsByText)


router.route('/:id')
    .delete(deleteOnePost)




module.exports = router;
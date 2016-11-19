const router = require('express').Router();
const Author = require('mongoose').model('Author');


//get all Authors
const getAuthors = (req, res)=>{
    Author.find((err,data)=>{
        res.send(data.map((a)=>
        a
    )
)
})
}

//get all Authors sorted by date
const getAuthorsSortByDate = (req, res)=>{
    Author.find((err,data)=>{
        res.send(data.map((a)=>
            a
         ).sort((a,b)=> a._id.getTimeStamp()>b._id.getTimeStamp())
         )
    })
}

//get all Authors sorted alphabetically
const getAuthorsAZ = (req, res)=>{
    Author.find((err,data)=>{
        res.send(data.map((a)=>
        a.name
    ).sort()
)
})
}

//get one Author

const getOneAuthor = (req,res)=>{
    Author.findById(req.params.id,(err,data)=>{
        res.json(data)
})
}

router.route('/')
    .get(getAuthors)


router.route('/sort/by-date')
    .get(getAuthorsSortByDate)

router.route('/sort/a-z')
    .get(getAuthorsAZ)

router.route('/:id')
    .get(getOneAuthor)




module.exports = router;
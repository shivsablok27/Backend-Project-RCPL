const express = require ('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
const blog = require('./Models/blog') 

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blogApp')
.then(()=>{
    console.log("DB connected")
}).catch(()=>{
    console.log("DB not connected")
})
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// Task 1 ---> display all the blogs___________________________________
app.get('/blogs', async(req,res)=>{
    let allBlogs = await blog.find({})
    res.render('index', {allBlogs});
})

//show form
app.get('/blogs/new', (req,res)=>{
    res.render('new');
})

//add blog on db
app.post('/blogs', (req,res)=>{
    let {title,author,content} = req.body
    let newBlog = blog.create({title,author,content})
    res.redirect('/blogs')
})


 //show a particular blog
 app.get('/blogs/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await blog.findById(id);
    res.render('show' , {foundProduct})
})

//edit
app.get('/blogs/:idd/edit' , async(req,res)=>{
    let {idd} = req.params;
    let foundProduct =  await blog.findById(idd);
    res.render('edit' , {foundProduct});
})

//update a blog
app.patch('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    // console.log(req.params.id);
    let {content} = req.body;
    // console.log(req.body.content)
    await blog.findByIdAndUpdate(id , {content});
    res.redirect('/blogs')
})

// deleting
app.delete('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    await blog.findByIdAndDelete(id);
    res.redirect('/blogs')
})

app.listen(8080, ()=>{
    console.log("Server Connected to port 8080!")
})
const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/nodeSocialNetwork';

//CHECK ISAUTH
const isAuth = (req,res,next) => {
    if(req.session.isAuth) {
        next()
    }else{
        res.redirect('/')
    }
}

//MONGODB MONGOOSE
mongoose.connect(mongoURL)
    .then(res => {console.log('MongoDB connected')});

const store = new MongoDBSession({
    uri: mongoURL,
    collection: 'MySessions'
})

// ROUTES
const login = require('./route/login')
const profile = require('./route/profile')

// EXPRESS SESSION
app.use(session({
    secret: 'key that will sign',
    resave: false,
    saveUninitialized: false,
    store: store
}))

// JSON AND URLENCODE SET
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// STATIC
app.use(express.static(`${__dirname}/node_modules/bootstrap/dist/css`))
app.use(express.static(`${__dirname}/node_modules/bootstrap/dist/js`))
app.use(express.static(`${__dirname}/fontawesome`))
app.use(express.static(`${__dirname}/public`))


// PAGES
app.use('/', login)
app.use('/profile', profile)

app.get('/home', isAuth, (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(process.env.PORT || 3000)
const express = require('express');
const app = express();
const birds = require('./birds');

app.use('/birds', birds)

app.get('/', (req, res) => {
    res.send("welcome to simplelearn");
});

app.listen(4000, () => {
    console.log("listening to port 4000")
});

// GET method route
app.get('/wish', (req, res) => {
    res.send('Good Morning')
})

// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

// all() for all http methods
app.all('/secret', (req, res, next) => {
    res.send('all http methods')
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

//some examples of route paths based on strings

//This route path will match requests to /about.
app.get('/about', (req, res) => {
    res.send('about string path')
})

//This route path will match requests to /random.text
app.get('/random.text', (req, res) => {
    res.send('random.text')
})

//some examples of route paths based on string patterns

//This route path will match acd and abcd
app.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
})

//This route path will match abcd, abbcd, abbbcd, and so on
app.get('/ab+cd', (req, res) => {
    res.send('ab+cd')
})

//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on
app.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
})

//This route path will match /abe and /abcde.
app.get('/ab(cd)?e', (req, res) => {
    res.send('ab(cd)?e')
})

//Examples of route paths based on regular expressions:

//This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {
    res.send('/a/')
})

//This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
})

//Route parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

app.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})

//Route handlers

//A single callback function can handle a route. For example:
app.get('/exmple/h', (req, res) => {
    res.send('Hello from A!')
})

//More than one callback function can handle a route (make sure you specify the next object)For example:
app.get('/exmple/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res) => {
    res.send('Hello from B!')
})

//An array of callback functions can handle a route For example:
const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

const cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/exmple/c', [cb0, cb1, cb2])


//A combination of independent functions and arrays of functions can handle a route For example:

const cb00 = function (req, res, next) {
    console.log('cb00')
    next()
}

const cb11 = function (req, res, next) {
    console.log('cb11')
    next()
}

app.get('/exmple/d', [cb00, cb11], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res) => {
    res.send('Hello from D!')
})

app.get('/exmple/json', (req, res) => {
    //res.json(null)
    //res.json({ user: 'tobi' })
    res.status(500).json({ error: 'message' })
})

app.route('/book')
    .get((req, res) => {
        res.send('Get a random book')
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })

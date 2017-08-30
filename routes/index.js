var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Got a GET request for /views/index.html');
    res.render('index');
});

/* GET Accounts page. */
var Account = require('../model/account');

router.get('/accounts', function(req, res, next) {
    console.log('Got a GET request for accounts/index');
    res.render('accounts/index');
})

// Return JSON of all Accounts
function getAccounts(res){
    mongoose.model('Account').find({}, function(err, accounts){
        if(err){
            res.send(err);
        }
        console.log('Get JSON request for all Accounts');
        res.json(accounts);
    });
}

router.get('/accounts.json', function(req, res, next) {
    getAccounts(res);
})

// Create new Account
router.post('/accounts', function(req, res) {
    mongoose.model('Account').create({
        name: req.body.name,
        currency: req.body.currency,
        createdDate: req.body.createdDate,
        paymentTerm: req.body.paymentTerm,
        comments: req.body.comments,
        active: req.body.active,
        done: false
    }, function(err, account) {
        if (err){
            res.send(err);
        }
        // Update accounts
        getAccounts(res);
    });
});

function showAccount(res){
    mongoose.model('Account').find( { _id: res } , function(err, account){
        //db.accounts.find({ _id: ObjectId("5995c9d054e2e10915621827")}) # mongo query
        if (err){
            console.log('GET Error: There was a problem retrieving:'+err);
        }else{
            console.log('GET Retrieving ID: ' + res);
            res.render('accounts/edit');
        }
    });
}

router.get('/accounts/edit.json', function(req, res, next) {
    var id = "5995c9d054e2e10915621827"
     mongoose.model('Account').find( { _id: id } , function(err, account){
        //db.accounts.find({ _id: ObjectId("5995c9d054e2e10915621827")}) # mongo query
        if (err){
            console.log('GET Error: There was a problem retrieving:'+err);
        }else{
            console.log('GET Retrieving ID: ' + id);
            console.log('Account retrieved is: ' + account);
            res.json(account);
        }
    });
})

/* Set routes for edit page */
router.get('/accounts/edit/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('Request Id:', id);
    res.render('accounts/edit');
   // showAccount(req.params.id);
   /* 
    mongoose.model('Account').findById(req.params.id, function(err, account){
     //   _id: req.params.account_id;
        if (err){
            console.log('GET Error: There was a problem retrieving:'+err);
        }else{
            console.log('GET Retrieving ID: ' + account._id);
            res.render('accounts/edit');
        }
    });*/
});

/* Set routes for updating the account */
router.put('/accounts/:account_id/edit.json', function(req,res){
    mongoose.model('Account').findById(req.id, function(err, account){
        var name = req.body.name;
        var currency = req.body.currency;
        var active = req.body.active;
        var paymentTerm = req.body.paymentTerm;
        
        Account.update({
            name: name,
            currency: currency,
            active: active,
            paymentTerm: paymentTerm
        });
        
        if(err){
            console.log('Error in PUT request updating account');
        }else{
            console.log('Success sending JSON of updated account');
            res.json(res);
        }
    })
})

router.delete('/accounts/:account_id', function(req, res){
    mongoose.model('Account').remove({
        _id: req.params.account_id
    }, function(err, account) {
        if (err){
            res.send(err);
        }
        getAccounts(res);
    });
});

/* To-Do */
var Todo = require('../model/todo');

function getTodos(res) {
    mongoose.model('Todo').find({}, function(err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        console.log('Get JSON request for all Todos');
        res.json(todos); // return all todos in JSON format
    });
}
// display todos page
router.get('/todos', function(req, res, next) {
    console.log('Render todo page');
    res.render('todo/todo');
});


// get all todos
router.get('/todos.json', function(req, res) {
    // use mongoose to get all todos in the database
    getTodos(res);
});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    mongoose.model('Todo').create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err){
          res.send(err);
        }
        // get and return all the todos after you create another
        getTodos(res);
    });

});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {
    mongoose.model('Todo').remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err){
            res.send(err);
        }
        getTodos(res);
    });
});

module.exports = router;

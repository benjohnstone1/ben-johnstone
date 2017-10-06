var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/login', function(req, res) {
    // res.render('login/index', { user: req.user });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
            // return res.status(401);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});


router.get('/signup', function(req, res) {
    // res.render('login/signup', {});
});

router.post('/signup', function(req, res) {
    User.register(new User({
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname
        }),
        req.body.password,
        function(err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

router.get('/profile', function(req, res) {
    // res.render('login/profile', {
    //     user: req.user // get the user out of session and pass to template
    // });
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('/profile.json', function(req, res, next) {
    getUser(res, req.user.username);
});

//UPDATE
router.put('/profile/:_id', function(req, res) {
    User.findById(req.params._id, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (req.body.fname) {
            user.fname = req.body.fname;
        }
        if (req.body.fname) {
            user.lname = req.body.lname;
        }
        user.save(function(err) {
            if (err) {
                return res.send(err);
            }
            return res.send('User updated');
        });

    });
});

router.delete('/profile/:_id', function(req, res) {
    mongoose.model('User').remove({
        _id: req.params._id
    }, function(err, user) {
        if (err) {
            res.send("Error deleting user " + err);
        }
        res.status(200).send("User deleted!");
    });
});

var User = require('../model/user');

function getUser(res, username) {
    mongoose.model('User').find({ "username": username }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Logged out successfully'
    });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}


/* GET Accounts page. */
var Account = require('../model/account');

/*
router.get('/accounts', function(req, res, next) {
    // res.render('accounts/index');
});
*/

router.get('/accounts', function(req, res, next) {
    getAccounts(res);
});

router.get('/accounts/edit/:accountID', function(req, res, next) {
    getAccountsEdit(res, req.params.accountID);
});

// Return JSON of all Accounts
function getAccounts(res) {
    mongoose.model('Account').find({}, function(err, accounts) {
        if (err) {
            res.send(err);
        }
        res.json(accounts);
    });
}

function getAccountsEdit(res, id) {
    mongoose.model('Account').find({ "_id": id }, function(err, accounts) {
        if (err) {
            res.send(err);
        }
        res.json(accounts);
    });
}

// Update Existing Account
router.post('/accounts/edit/:accountID', function(req, res, next) {
    var Account = mongoose.model('Account');
    var id = req.params.accountID;
    var body = req.body;

    Account.findById(id, function(error, account) {
    // Handle the error using the Express error middleware
    if(error) return next(error);
    // Render not found error
    if(!account) {
      return res.status(404).json({
        message: 'Account with id ' + id + ' can not be found.'
      });
    }
    // Update the account model
    account.update(body, function(error, account) {
      if(error) return next(error);
      res.json(account);
    });
  });
});

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
        if (err) {
            res.send(err);
        }
        // Update accounts
        getAccounts(res);
    });
});

function showAccount(res) {
    mongoose.model('Account').find({ _id: res }, function(err, account) {
        //db.accounts.find({ _id: ObjectId("5995c9d054e2e10915621827")}) # mongo query
        if (err) {
            console.log('GET Error: There was a problem retrieving:' + err);
        }
        else {
            console.log('GET Retrieving ID: ' + res);
            res.render('accounts/edit');
        }
    });
}

/* Set routes for updating the account */
router.put('/accounts/:account_id/edit.json', function(req, res) {
    mongoose.model('Account').findById(req.id, function(err, account) {
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

        if (err) {
            console.log('Error in PUT request updating account');
        }
        else {
            console.log('Success sending JSON of updated account');
            res.json(res);
        }
    });
});

router.delete('/accounts/:account_id', function(req, res) {
    mongoose.model('Account').remove({
        _id: req.params.account_id
    }, function(err, account) {
        if (err) {
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
        res.json(todos); // return all todos in JSON format
    });
}
// display todos page
router.get('/todos', function(req, res, next) {
    res.render('todo/todo');
});


// get all todos
router.get('/todos.json', function(req, res) {
    getTodos(res);
});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    mongoose.model('Todo').create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err) {
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
        if (err) {
            res.send(err);
        }
        getTodos(res);
    });
});

module.exports = router;
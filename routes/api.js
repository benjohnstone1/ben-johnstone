var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');

//=======================  Home Routes =================================

router.get('/', function(req, res, next) {
    res.render('index');
});
//=======================  Login Routes =================================

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
                status: 'Login successful!',
                admin: user.admin
            });
        });
    })(req, res, next);
});

//=======================  Signup Routes =================================

function sendEmail(username, fName, lName) {
    var fullName = fName + ' ' + lName;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ENTER USERNAME HERE',
            pass: 'ENTER PASSWORD HERE'
        }
    });
    var mailOptions = {
        from: 'benji.forrest@gmail.com',
        to: 'benji.forrest@gmail.com',
        subject: 'New User Signup!',
        html: '<p>A new user has signed up at <a href="http://ben-johnstone.herokuapp.com/">http://ben-johnstone.herokuapp.com</a></p><p>Username: ' + username + '</p><p>Name: ' + fullName
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);

        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/signup', function(req, res, next) {
    var username = req.body.username;
    var fname = req.body.fname;
    var lname = req.body.lname;

    User.register(new User({
            username: username,
            fname: fname,
            lname: lname
        }),
        req.body.password,
        function(err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            // Send signup email so I know who has registered
            // sendEmail(username, fname, lname);
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

//=======================  Profile Routes =================================

router.get('/profile', function(req, res) {
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

router.put('/profile/:_id', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
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

router.get('/profile/edit/:profileID', function(req, res) {
    mongoose.model('User').find({ "_id": req.params.profileID }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

router.post('/profile/edit/:profileID', function(req, res, next) {
    var User = mongoose.model('User');
    var id = req.params.profileID;
    var body = req.body;
    User.findById(id, function(error, user) {
        // Handle the error using the Express error middleware
        if (error) return next(error);
        // Render not found error
        if (!user) {
            return res.status(404).json({
                message: 'User with id ' + id + ' can not be found.'
            });
        }
        // Update the account model
        user.update(body, function(error, user) {
            if (error) return next(error);
            res.json(user);
        });
    });
});

// We want to query all todos that match the user profile and delete them also
router.delete('/profile/:_id', function(req, res) {
    var id = req.params._id;
    var User = mongoose.model('User');
    var Todo = mongoose.model('Todo');

    // Find username corresponding to _id of user
    User.find({ _id: id }, function(err, user) {
        if (err) {
            res.send("Error could not find user " + err);
        }
        // Remove all todo's that match the user_id
        Todo.remove({ user_id: user[0].username }, function(err, todo) {
            if (err) {
                res.send("Error deleting todos " + err);
            }
            // Remove user
            User.remove({ _id: id }, function(err, user) {
                if (err) {
                    res.send("Error deleting user " + err);
                }
                res.status(200).send("User deleted");
            });
        });
    });
});

//=======================  User Routes =================================

require('../model/user');
var User = mongoose.model('User');

router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

function getUser(res, username) {
    mongoose.model('User').find({ "username": username }, function(err, user) {
        if (err) {
            console.log("couldn't find user");
            res.send(err);
        }
        res.json(user);
    });
}

//=======================  Logout Routes =================================

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Logged out successfully'
    });
});

//=======================  Account Routes =================================

require('../model/account');
var Account = mongoose.model('Account');

router.get('/accounts', function(req, res, next) {
    getAccounts(res);
});

router.get('/accounts/edit/:accountID', function(req, res, next) {
    getAccountsEdit(res, req.params.accountID);
});

function getAccounts(res) {
    Account.find({}, function(err, accounts) {
        if (err) {
            res.send(err);
        }
        res.json(accounts);
    });
}

function getAccountsEdit(res, id) {
    Account.find({ "_id": id }, function(err, accounts) {
        if (err) {
            res.send(err);
        }
        res.json(accounts);
    });
}

router.post('/accounts/edit/:accountID', function(req, res, next) {
    var id = req.params.accountID;
    var body = req.body;

    Account.findById(id, function(error, account) {
        // Handle the error using the Express error middleware
        if (error) return next(error);
        // Render not found error
        if (!account) {
            return res.status(404).json({
                message: 'Account with id ' + id + ' can not be found.'
            });
        }
        // Update the account model
        account.update(body, function(error, account) {
            if (error) return next(error);
            res.json(account);
        });
    });
});

router.post('/accounts', function(req, res) {
    Account.create({
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

router.delete('/accounts/:account_id', function(req, res) {
    Account.remove({
        _id: req.params.account_id
    }, function(err, account) {
        if (err) {
            res.send(err);
        }
        getAccounts(res);
    });
});

router.delete('/accounts/view/:account_id', function(req, res) {
    Account.remove({
        _id: req.params.account_id
    }, function(err, account) {
        if (err) {
            res.send(err);
        }
        getAccounts(res);
    });
});


//=======================  Todos Routes =================================

require('../model/todo');
var Todo = mongoose.model('Todo');

function getTodos(res, user) {
    Todo.find({ user_id: user }, function(err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
}

router.get('/todos.json', function(req, res) {
    getTodos(res, req.user.username);
});

router.post('/todos', function(req, res) {
    Todo.create({
        text: req.body.text,
        user_id: req.user.username,
        done: false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        getTodos(res, req.user.username);
    });

});

router.get('/todos/edit/:todo_id', function(req, res) {
    Todo.find({ '_id': req.params.todo_id }, function(err, editTodo) {
        if (err) {
            res.send(err);
        }
        res.json(editTodo);
    });
});

router.post('/todos/edit/:todo_id', function(req, res, next) {
    var id = req.params.todo_id;
    Todo.update({ _id: id }, { $set: { rank: req.body[0].rank } }, function(error, todo) {
        getTodos(res, req.user.username);
    });
});

router.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        getTodos(res, req.user.username);
    });
});

//=======================  Export Routes =================================

module.exports = router;
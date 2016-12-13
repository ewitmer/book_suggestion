//change file name
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const TempUser = require('../models/tempuser.js');
const decision = require('../models/decision.js');
const User = require('../models/user.js');

var mongoose = require('mongoose');


let tempUser;

router.get('/', function(req, res) {
    res.status(200).render('index');
});


router.get('/category', function(req, res) {
    
    res.render('categoryView');

});

router.get('/tempuser', function(req, res) { 
    res.json(tempUser.category);
});

router.post('/category', function(req, res) {
	
    if ( decision.categories.includes(req.body.categoryName) ) {
        tempUser = new TempUser(req.body.categoryName, req.body.email);

    	//pass into function
        const currentChoice = decision.getNextChoice(tempUser);

        res.status(200).render('choiceView', {
    	  	user: tempUser,
    	  	bookChoices: currentChoice
    	});

    } else {

        res.status(404).send('Please select a valid category');
    
    }
});



router.get('/login', function(req, res) {

	res.render('login');

});


router.post('/choice', function(req, res) {
	
    choiceIndex = decision.getChoiceIndex(tempUser, req.body.bookChoice);

    tempUser.addLike(req.body.bookChoice, choiceIndex);

	if (tempUser.bookLikes.length < 3) {

		let currentChoice = decision.getNextChoice(tempUser);

		res.render('choiceView', {
	  		user: tempUser,
	  		bookChoices: currentChoice
	 	});

	}

	else if (tempUser.bookLikes.length === 3) {
		
		let computedDecision = decision.getDecision(tempUser.bookLikes);

		if (tempUser.email === undefined) {
		res.render('recommendView', {
	  		user: tempUser,
	  		decision: computedDecision
	 	});
		} else {
			res.render('updateView', {
				user: tempUser,
				decision: computedDecision
			})
		}
}

})

router.post('/save', function(req, res) {

	User.create({
        category        : tempUser.category,
    	bookLikes       : tempUser.bookLikes,
    	email           : req.body.email,
    	firstName		: req.body.firstName,
    	lastName		: req.body.lastName
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }
        res.status(201).send('ok');
    });

});

router.post('/myLibrary', function(req, res) {

	User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err || !user) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).render('myLibrary', {
	  		user: user,
	 	});
    })

});

router.put('/user/:email', function(req, res) {
	console.log(req.params.email);
	User.findOneAndUpdate(
		{email: req.params.email},
  		{$set: {category: tempUser.category,
  				bookLikes: tempUser.bookLikes}}
		, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }

    });
    res.status(201).render('login');
});

router.delete('/user/:email', function(req, res) {

    User.findOneAndRemove({
        email: req.params.email
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }
        res.status(201).render('login');

    });
});

module.exports = router;
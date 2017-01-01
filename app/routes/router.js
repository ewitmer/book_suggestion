//change file name
const unirest = require('unirest');
const express = require('express');
const router = express.Router();
const path = require('path');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const TempUser = require('../models/tempuser.js');
const decision = require('../models/decision.js');
const User = require('../models/user.js');
const book =  require('../models/book.js')

const mongoose = require('mongoose');


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
        var currentChoice = decision.getNextChoice(tempUser);
        
        function getAllData() {
            return Promise.resolve().then (function(){
                return book.getBookData(currentChoice);  
             }).then(function(data){
                res.status(200).render('choiceView', {
                    user: tempUser,
                    bookChoices: currentChoice,
                    bookData: data
                });
            })
         }

        getAllData();
        

    } else {

        res.status(404).send('Please select a valid category!');
    
    }
});



router.get('/login', function(req, res) {

	res.render('login');

});


router.get('/testApi', function(req, res) {

    res.sendFile(path.join(__dirname, '../public', 'thanks.html'));
    
    
   
});




router.post('/choice', function(req, res) {


    choiceIndex = decision.getChoiceIndex(tempUser, req.body.bookChoice.toString());

    tempUser.addLike(req.body.bookChoice.toString(), choiceIndex);

	if (tempUser.bookLikes.length < 3) {

		var currentChoice = decision.getNextChoice(tempUser);
        
        function getAllData() {
            return Promise.resolve().then (function(){
                return book.getBookData(currentChoice);  
             }).then(function(data){
                res.status(200).render('choiceView', {
                    user: tempUser,
                    bookChoices: currentChoice,
                    bookData: data 
                }); 
            })
         }

        getAllData();

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
            console.log(err)
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }
        res.status(201).sendFile(path.join(__dirname, '../public', 'thanks.html'));

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
	  		user: user
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
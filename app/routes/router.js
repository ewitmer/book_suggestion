/**
  * The router contains all of the routing logic for the application.
  * See specific routes for more detail.
*/

const unirest = require('unirest');
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const TempUser = require('../models/tempuser.js');
const decision = require('../models/decision.js');
const User = require('../models/user.js');
const book =  require('../models/book.js')

// creating a variable in memory for when the instance is created
let tempUser;

router.get('/', (req, res) => {
    res.status(200).render('index');
});


router.get('/category', (req, res) => {   
    res.render('categoryView');
});

router.post('/category', (req, res) => {
	
    // when a user selects a category (baby, etc.) a new tempUser instance is created
    if ( decision.categories.includes(req.body.categoryName) ) {
        tempUser = new TempUser(req.body.categoryName, req.body.email);

    	/* the set book choices the user is shown are retrieved based on the user category
         * preference (baby etc.), and how many books they have already selected.
        */
        let currentChoice = decision.getNextChoice(tempUser);
        
        /* once the next book choices have been retrieved, this anonymous function runs
         * and returns the array of API based on the book selections to be shown
         * the book data is passed into the view template and populates the front end
        */ 
        (() => {
            return Promise.resolve().then (() => {
                return book.getBookData(currentChoice);  
             }).then((data) => {
                res.status(200).render('choiceView', {
                    user: tempUser,
                    bookChoices: currentChoice,
                    bookData: data 
                }); 
            })
        })();
        
    // this is only if a user selects an invalid category, radio buttons should prevent this
    } else {

        res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
    
    }
});



router.get('/login', (req, res) => {

	res.render('login');

});




router.post('/choice', (req, res) => {

    /* the current index position is used to ensure that if a user hits the 
     * back button on the browser, and is shown the same choice again, that choice
     * overwrites the current selection, rather than saving it at the next position 
     * in the array. The decision tree would not work properly if that were the case.
    */ 
    choiceIndex = decision.getChoiceIndex(tempUser, req.body.bookChoice.toString());

    // pushes the current selection to the array in the correct position (choiceIndex)
    tempUser.addLike(req.body.bookChoice.toString(), choiceIndex);

	if (tempUser.bookLikes.length < 3) {

		let currentChoice = decision.getNextChoice(tempUser);
        
        /* once the next book choices have been retrieved, this anonymous function runs
         * and returns the array of API based on the book selections to be shown
         * the book data is passed into the view template and populates the front end
        */ 
        (() => {
            return Promise.resolve().then (() => {
                return book.getBookData(currentChoice);  
             }).then((data) => {
                res.status(200).render('choiceView', {
                    user: tempUser,
                    bookChoices: currentChoice,
                    bookData: data 
                }); 
            })
        })();

	}

	else if (tempUser.bookLikes.length === 3) {
		
        /* once the user has selected three valid choices, a recommendation is generated
         * based on the decision tree function
         * this recommendation is saved to the tempUser profile.
        */
		let computedDecision = decision.getDecision(tempUser.bookLikes);

        tempUser.addRec(computedDecision);

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

});


// Collects name and email information from the front end, saves with tempUser info to MongoDB
router.post('/save', (req, res) => {

	User.create({
        category        : tempUser.category,
    	bookLikes       : tempUser.bookLikes,
        bookRecs        : tempUser.bookRecs,
    	email           : req.body.email,
    	firstName		: req.body.firstName,
    	lastName		: req.body.lastName
    }, (err, item) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
             // Duplicate username error
            return res.status(500).sendFile(path.join(__dirname, '../public', 'user.html'));
            }

            // Any other error
            return res.status(500).send(err);
        }
        res.status(201).sendFile(path.join(__dirname, '../public', 'thanks.html'));

    }); 


});

// Login logic that retrieves a user document based on provided email
router.post('/myLibrary', (req, res) => {

	User.findOne({
        email: req.body.email
    }, (err, user) => {
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

// Updates user preferences if they go through the process while logged in
router.put('/user/:email', (req, res) => {

	User.findOneAndUpdate(
		{email: req.params.email},
  		{$set: {category: tempUser.category,
  				bookLikes: tempUser.bookLikes}}
		, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }

    });
    res.status(201).render('login');
});

// Deletes user record from the database
router.delete('/user/:email', (req, res) => {

    User.findOneAndRemove({
        email: req.params.email
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err

            });
        }
        res.status(201).render('login');

    });
});

// Renders 404 error for all other routes
router.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
})

module.exports = router;
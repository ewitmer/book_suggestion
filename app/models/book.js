/**
  * The getApiData() function uses a Promise function to get the Google Books API data for one ISBN.
  * The getBookData() function uses a Promise all function to get the Google Books API data for an array of ISBNs
*/

const unirest = require('unirest');
const express = require('express');

// Gets API data for one ISBN
function getApiData(isbn) {

  return new Promise((resolve, reject) => {  

    unirest.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
           .end((response) => {
                if (response.ok) {
                    resolve(response.body);
                }
                else {
                    reject(Error(response.code));
                }
            });
    });

};

// Uses map to transform an array of ISBNs into an array of API data for each ISBN.
function getBookData(isbnArray) {
	
	return Promise.all(isbnArray.map((isbn) => {
		return getApiData(isbn);
	}))
};



module.exports = {getBookData, getApiData};


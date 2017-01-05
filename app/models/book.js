var unirest = require('unirest');
var express = require('express');


function getApiData(isbn) {

  return new Promise(function(resolve, reject) {  

    unirest.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
           .end(function(response) {
                if (response.ok) {
                    resolve(response.body);
                }
                else {
                    reject(Error(response.code));
                }
            });
    });

};


function getBookData(isbnArray) {
	
	return Promise.all(isbnArray.map(function(isbn){
		return getApiData(isbn);
	}))
};



module.exports = {getBookData, getApiData};


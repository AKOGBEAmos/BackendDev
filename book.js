const mysql =  require ('mysql');
/* Work with siqelize or trying creating a class for the book structure. */
const Book = {
    title: {type: String, required: true},
    author: {type : String, required : true},
    genre: {type : String, required : true},
    year:  {type : Number, required : true}
};


module.exports= Book;
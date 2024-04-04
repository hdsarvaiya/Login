const mongoose = require( 'mongoose' );


var todoSchema = mongoose.Schema

var usertodo = new todoSchema({

    todo: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model( "Todo", usertodo);
module.exports = Todo;
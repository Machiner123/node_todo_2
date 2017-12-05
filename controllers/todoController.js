var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// connect to db
mongoose.connect('mongodb://test:test@ds131826.mlab.com:31826/todo')

// create scheme
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)

var data =[{item: 'get milk'}, {item: 'get catfood'}, {item: 'shine shoes'}]

var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todos: data})
  })

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    console.log(data)
    res.json(data)
  })

  app.delete('/todo', function(req, res){

  })
}

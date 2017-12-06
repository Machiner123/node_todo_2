var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// connect to db
//mongoose.connect('mongodb://test:test@ds131826.mlab.com:31826/todo')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds131826.mlab.com:31826/todo', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
// create scheme
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)



//var data =[{item: 'get milk'}, {item: 'get catfood'}, {item: 'shine shoes'}]

var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){

  app.get('/todo', function(req, res){
    // get data from mongodb and pass to view
    Todo.find({}, function(err, data){
      if(err) throw err
      res.render('todo', {todos: data})
    })
  })

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from view and pass it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data)
    })
  })

  app.delete('/todo/:item', function(req, res){
    // deete requrested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err
      res.json(data)
    })
  })
}

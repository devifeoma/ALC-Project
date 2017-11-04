var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');
var path = require('path');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080;        

// ROUTES FOR OUR API
var router = express.Router();     

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

router.get('/', function(req, res) {
    res.sendfile('public/main.html');   
});

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

//database setup
var mongoose   = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://ifeoma:judith1994@ds161164.mlab.com:61164/judith', {
    socketTimeoutMS: 3000,
    keepAlive: true,
    reconnectTries: 30
})

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection eroor:'))
conn.once('open', function(){

})

var Student    = require('./app/models/student');


router.route('/student')

    // create a bear (accessed at POST http://localhost:8080/api/students)
    .post(function(req, res) {
        console.log("I am Testing Post")
        var student = new Student();     
        student.name = req.body.name; 
        student.regno = req.body.regno;  
        student.department = req.body.department; 
        student.phone = req.body.phone;  
        student.age = req.body.age;  
        console.log(student);

        student.save(function(err) {
            if (err){
                console.log("Another post test")
                res.send(err, "here");
            }
             else{
                 console.log("Another post test")
                 res.json({ message: 'School created!' });
             }   
        });
        console.log("Another post")

    });



router.route('/school/:student_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Student.findById(req.params.student_id, function(err, student) {
            if (err)
                res.send(err);
            res.json(student);
        });
    })

    // update the studeents with this id (accessed at PUT http://localhost:8080/api/students/:student_id)
    .put(function(req, res) {
        
                Student.findById(req.params.student_id, function(err, student) {
        
                    if (err)
                        res.send(err);
        
                    student.name = req.body.name;  
                    student.regno = req.body.regno;  
                    student.department = req.body.department;  
                    student.phone = req.body.phone;  
                    student.age = req.body.age; 
        
                    student.save(function(err) {
                        if (err)
                            res.send(err);
        
                        res.json({ message: 'School updated!' });
                    });
        
                });
            })


            // delete the student with this id (accessed at DELETE http://localhost:8080/api/students/:student_id)
    .delete(function(req, res) {
        Student.remove({
            _id: req.params.student_id
        }, function(err, student) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/students')

   

    // get all the students (accessed at GET http://localhost:8080/api/students)
    .get(function(req, res) {
        Student.find(function(err, student) {
            if (err)
                res.send(err);

            res.json(student);
        });
    });

app.use('/api', router);

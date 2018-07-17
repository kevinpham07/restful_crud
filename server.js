const path = require('path')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/dist/public')));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true });

const TaskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, default: ''},
	completed: { type: Boolean, default: false}
}, { timestamps: true });
var Task = mongoose.model("Task", TaskSchema);

app.get('/tasks', function(req, res){
	Task.find({}, function(err, task){
		if(err){
			console.log(err);
		}
		else{
			res.json({ task });
		}
	})
})

app.post('/tasks', function(req, res){
	var task = new Task();
	task.title = req.body.title;
	task.description = req.body.description;
	task.save(function(err, task){
		if(err){
			console.log(err);
		}
		else{
			res.json({ task });
		}
	})
})

app.get('/tasks/:id', function(req, res){
	Task.findOne({_id: req.params.id }, function(err, task){
		if(err){
			console.log(err);
		}
		else{
			res.json({ task });
		}
	})
})

app.put('/tasks/:id', function(req, res){
	var task = Task.findOne({ _id: req.params.id }, function(err, task){
		task.title = req.body.title;
		task.description = req.body.description;
		task.save(function(err, task){
			if(err){
				console.log(err);
			}
			else{
				res.json({ task });
			}
		})
	})
})
app.delete('/tasks/:id', function(req, res){
	Task.findOneAndDelete( {_id: req.params.id }, function(err, task){
		if(err){
			console.log(err);
		}
		else{
			res.json({ task });
		}
	})
})

app.listen(1337);
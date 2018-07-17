const mongoose = require('mongoose');
var Task = mongoose.model("Task");

module.exports = {

	index: (req, res) => {
		Task.find({}, function(err, task){
			if(err){
				console.log(err);
			}
			else{
				res.json({ task });
			}
		})
	},

	create: (req, res) => {
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
	},

	read: (req, res) => {
		Task.findOne({_id: req.params.id }, function(err, task){
			if(err){
				console.log(err);
			}
			else{
				res.json({ task });
			}
		})
	},

	update: (req, res) => {
		Task.findOne({ _id: req.params.id }, function(err, task){
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
	},

	destroy: (req, res) => {
		Task.findOneAndDelete( {_id: req.params.id }, function(err, task){
			if(err){
				console.log(err);
			}
			else{
				res.json({ task });
			}
		})
	}

}
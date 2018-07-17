import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	tasks = [];
	newTask: any;
	editTask: any;

	constructor( private _httpService: HttpService){
	}
	ngOnInit(){
		this.newTask = { title: "", description: "" }		
	}

	getTasksFromService(): void{
		this._httpService.getTasks().subscribe( data => {
			console.log(data);
			this.tasks = data['task'];
		})
	}

	onSubmit(): void{
		console.log(this.newTask)
		this._httpService.getCreate(this.newTask).subscribe( data =>{
			console.log(data)
			this.tasks.push(data)
			this.newTask = { title: "", description: "" }
		})
		this.getTasksFromService();
	}

	getShowFromService(id): void{
		this._httpService.getShow(id).subscribe( data => {
			console.log(data);
			this.editTask = data;
		})
	}

	onEdit(): void{
		console.log("HERRO PREASH")
		console.log(this.editTask.task._id)
		console.log(this.editTask)
		this._httpService.getUpdate(this.editTask.task).subscribe( data =>{
			console.log(data)
		})
		this.getTasksFromService();
	}

	getDeleteFromService(id): void{
		console.log(id)
		this._httpService.getDelete(id).subscribe( data =>{
			console.log(data)
		})
		this.getTasksFromService();
	}

}

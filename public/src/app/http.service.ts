import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private _http: HttpClient ) {
  }

  getTasks(){
  	return this._http.get('/tasks')
  }

  getShow(id){
  	return this._http.get('/tasks/' + id)
  }

  getCreate(newTask){
  	return this._http.post('/tasks', newTask)
  }

  getUpdate(task){
  	return this._http.put('/tasks/' + task._id, task)
  }

  getDelete(id){
  	return this._http.delete('/tasks/' + id)
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let restObj:any;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) {
    restObj = http;
  }

  register = (employeeObj:any) => {
    return restObj.post('/svc/employee/register', employeeObj, httpOptions);
  };

  login = (loginInfo:any) => {
    return restObj.post('/svc/employee/login', loginInfo, httpOptions);
  };

  createGroup = (groupName:string, userId:string) => {
    return restObj.post('/svc/group/create', {groupName:groupName, userId:userId}, httpOptions);
  };


  deleteGroup = (groupId:number) => {
    return restObj.delete('/svc/group/' + groupId, {}, httpOptions);
  };

  getGroups = (userId:string) => {
    return restObj.get('/svc/groups/' + userId);
  };

  addContact = (contactInfo:any) => {
    return restObj.post('/svc/contacts/create', contactInfo, httpOptions);
  };

  updateContact = (contactInfo:any) => {
    return restObj.put('/svc/contact/update', contactInfo, httpOptions);
  };


  getContacts = (groupId:number) => {
    return restObj.get('/svc/group/contacts/' + groupId);
  };


  activeGroup = (groupId:number, status:number) => {
    var body = {
      groupId: groupId,
      active: status
    };
    return restObj.put('/svc/group/active', body, httpOptions);
  };

  activateContacts = (body:any[]) => {
    return restObj.put('/svc/contacts/active', body, httpOptions);
  };

  deActivateContacts = (body:any[]) => {
    return restObj.put('/svc/contacts/deactive', body, httpOptions);
  };

  deleteContacts = (body:any[]) => {
    return restObj.post('/svc/contacts/delete', body, httpOptions);
  };



}

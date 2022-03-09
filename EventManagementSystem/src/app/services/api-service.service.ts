import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../events/events.component';
import { Users } from '../users/users.component';

interface Event {
    title: string;
    venue: string;
    date: string;
    amount: string;
    description: string;
}

interface Signup{
  firstName:string,
  lastName:string,
  emailId:string,
  password:string,
  contactNo:string
}

interface Login{
  emailId:string,
  password:string
}

interface Response{
  status:string,
  message:string,
}

interface BookingsCount{
  status:string,
  message:string,
  data:number
}

export interface Titles{
  status:string,
  message:string,
  data:[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:8080/"

  modalName:string = "create"

  jwtToken:any={"Authorization":localStorage.getItem('jwttoken')}
  
  // SETTER

  setEventId(eventId:string):void
  {
    localStorage.setItem('eventId',eventId)
  }

  getEventId():string | null
  {
    return localStorage.getItem('eventId')
  }

  setUserId(userId:string):void
  {
    localStorage.setItem('userId',userId)
  }

  getUserId():string | null
  {
    return localStorage.getItem('userId')
  }

  setModalName(name:string):void
  {
    this.modalName= name
  }

  // AUTH
  userSignup(body:Signup):Observable<Response>
  {
    return this.http.post<Response>(this.baseUrl+"user/signup",body)
  }

  userLogin(body:Login):Observable<any>
  {
    return this.http.post(this.baseUrl+"user/login",body,{observe: 'response' })
  }

  adminLogin(body:Login):Observable<any>
  {
    return this.http.post(this.baseUrl+"admin/login",body,{observe: 'response' })
  }

  // EVENT
  createEvent(body:Event):Observable<Response>
  {
    return this.http.post<Response>(this.baseUrl+"event/create",body,{headers:this.jwtToken})
  }

  updateEvent(body:Event):Observable<Response>
  {
    return this.http.put<Response>(this.baseUrl+"event/update/"+localStorage.getItem('eventId'),body,{headers:this.jwtToken})
  }

  getEvent():Observable<Events>
  {
    return this.http.get<Events>(this.baseUrl+"event/"+localStorage.getItem('eventId'),{headers:this.jwtToken})
  }

  getAllEvents():Observable<Events>{
    return this.http.get<Events>(this.baseUrl+"event/all",{headers:this.jwtToken})
  }

  getActiveEvents():Observable<Events>
  {
    return this.http.get<Events>(this.baseUrl+"event/active")
  }

  getEventTitles():Observable<Titles>
  {
    return this.http.get<Titles>(this.baseUrl+"event/titles")
  }

  deleteEvent(eventId:string):Observable<Response>
  {
    return this.http.delete<Response>(this.baseUrl+"event/delete/"+eventId,{headers:this.jwtToken})
  }

  bookEvent():Observable<Response>
  {
    var body = {'eventId':this.getEventId(),'userId':this.getUserId(),'attendedStatus':'none'} 
    return this.http.post<Response>(this.baseUrl+"user/bookEvent",body,{headers:this.jwtToken})
  }

  cancelEvent(eventId:string):Observable<Response>
  {
    var body = {'userId':localStorage.getItem('userId'),'eventId':eventId,'attendedStatus':'cancelled'}
    return this.http.post<Response>(this.baseUrl+"user/cancelEvent",body,{headers:this.jwtToken})
  }

  // USER

  getUser():Observable<Users>
  {
    return this.http.get<Users>(this.baseUrl+"user/"+localStorage.getItem('userId'),{headers:this.jwtToken})
  }

  getAllUsers():Observable<Users>{
    return this.http.get<Users>(this.baseUrl+"user/all",{headers:this.jwtToken})
  }

  getUsersByEventTitle(eventTitle:string):Observable<Users>{
    return this.http.get<Users>(this.baseUrl+"admin/bookedUsers/"+eventTitle.toLowerCase(),{headers:this.jwtToken})
  }

  updateUser(body:Users):Observable<Response>
  {
    return this.http.put<Response>(this.baseUrl+"user/update/"+localStorage.getItem('userId'),body,{headers:this.jwtToken})
  }

  // BOOKING
  getBookings():Observable<Events>
  {
    return this.http.get<Events>(this.baseUrl+"user/bookedEvents/"+this.getUserId(),{headers:this.jwtToken})
  }

  getTotalBookings():Observable<BookingsCount>
  {
    return this.http.get<BookingsCount>(this.baseUrl+"admin/booked",{headers:this.jwtToken})
  }
}

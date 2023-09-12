import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url:string='http://ec2-3-85-225-6.compute-1.amazonaws.com:3000/employees'
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http:HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>(this.url).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmployee(data:any,id:number){
    return this.http.put<any>(this.url+'/'+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>(this.url+'/'+id).pipe(map((res:any)=>
    {
      return res;
    }))
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
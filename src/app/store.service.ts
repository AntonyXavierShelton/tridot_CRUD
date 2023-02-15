import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  constructor(private http:HttpClient) { }


  getproduct(){
    return this.http.get<any>(" http://localhost:3000/posts")
  }
  postproduct(data:any){
    return this.http.post<any>(" http://localhost:3000/posts",data).pipe(map((Response :any)=>{
      return Response
    }))
  }
  updateproduct(data:any){
    return this.http.put<any>(" http://localhost:3000/posts",data).pipe(map((Response :any)=>{
        return  Response
    }))
  }
  deleteproduct(id:any){
    return this.http.delete<any>(" http://localhost:3000/posts",id).pipe(map((Response :any)=>{
      return Response
    }))
  }
  

}

import { Component,OnInit } from '@angular/core';
import * as Dummy from './Data/Dummy.json';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

 product:any=(Dummy as any ).default;
 list:any=this.product.data

 constructor(private http:HttpClient){}
 

 ngOnInit(){
  console.log(this.list);
  this.http.get('/src/app/data-table/Data/Dummy.json').subscribe(res=>{console.log(res)});
  
  
 }
  


  

}

import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
@Injectable()
export class DataTableComponent implements OnInit {
  ProductData:any;
  
  
  user(){
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
      this.ProductData=json
      console.log(this.ProductData);
    });
    } 

  ngOnInit() {
  
    this.user()
      
        
  }


   }
  


  



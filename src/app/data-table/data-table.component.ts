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
    fetch('https://api.escuelajs.co/api/v1/products')
            .then(res=>res.json())
            .then(json=>{
              this.ProductData=json
              console.log(json)
            });
    } 

  ngOnInit() {  
    this.user()
      console.log("data");
      
        
  }


   }
  


  



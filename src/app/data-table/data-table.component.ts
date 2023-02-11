import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { products } from './Data/Items';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
@Injectable()
export class DataTableComponent implements OnInit {

  ProductData!: products[];
  product!: products;
  selectedProduct: products[] = [];
  DailogMenu?:boolean;
  Submit?:boolean;
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService) { }

  // For Data Fetch
  FetchData(){
    fetch('https://api.escuelajs.co/api/v1/products')
            .then(res=>res.json())
            .then(json=>{
              this.ProductData=json

              console.log(json)
            });
    } 

  // For Add Data 

  Add(){
    this.product={};
    this.DailogMenu=true;
    this.Submit=false


  }

  Delete(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ProductData = this.ProductData.filter(val => !this.selectedProduct.includes(val));
          console.log(this.selectedProduct);
          if(true){
            // this.selectedProduct=null;
          }
          
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
  }

  HideDailog(){
    this.DailogMenu=false;
    this.Submit=false
  }

  SaveProduct(){
    this.Submit=true
    this.ProductData.unshift(this.product)
     console.log(this.product);
     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Saved', life: 3000});



  }
  
  editProduct(product: products) {
    this.product = {...product};
    this.DailogMenu = true;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    
}

deleteProduct(product: products) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.title + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
           this.ProductData = this.ProductData.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}




  ngOnInit() {  
     this.FetchData();
   
    
     
   }


   }
  


  



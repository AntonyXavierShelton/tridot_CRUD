import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { products} from './Data/Items';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../store.service';
import { ignoreElements } from 'rxjs';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
@Injectable()
export class DataTableComponent implements OnInit {
  handleInput(arg0: any, arg1: string, arg2: string) {
    throw new Error('Method not implemented.');
  }
  // DataUrl: any = 'https://api.escuelajs.co/api/v1/products';
  ProductData: products[] = [];
  product!: products;
  selectedProduct: products[] = [];
  DailogMenu?: boolean;
  Submit?: boolean;



  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private store:StoreService,
      
    
  ) {}

//  findDuplicates(arr:any) {
//   let index=0
//     for (let i = 0; i < length - 1; i++) {
//        for (let j = i + 1; j < length; j++) {
//        if (arr[i] === arr[j]) {
//              this.ProductData[index] = arr[i];
//              index++;
//           }
//        }
//     }
//     return this.ProductData;
//  }

Fetchdata(){
  this.store.getproduct().subscribe({
    next:(response)=>{
      this.ProductData=response
      console.log(this.ProductData);
      
      // alert("fetched")
    },
    error:(res)=>{
      // alert("err")
    }
  })

}
  // For Add Data
  Add() {
    this.product = {};
    this.DailogMenu = true;
    this.Submit = false;
    // console.log(this.ProductData.post);
  }


  Delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ProductData = this.ProductData.filter(
          (value) => !this.selectedProduct.includes(value)
        );
        this.store.deleteproduct(this.ProductData).subscribe({
          next:(Response)=>{
            alert("deletd")
          },
          error:(Response)=>{
            alert("not deleted")
          }
        })
        console.log(this.selectedProduct);
      },
    });
  }

  HideDailog() {
    this.DailogMenu = false;
    this.Submit = false;
  }

   editProduct(product: products) {
    this.product = {...product};
    this.DailogMenu = true;
    this.ProductData = this.ProductData.filter((val) => val.id !== product.id);

  }



  

  SaveProduct() {
    this.Submit = true;
          this.ProductData.push(this.product);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          this.store.postproduct(this.product).subscribe({
            next:(Response)=>{
              // alert("saved")
              this.Fetchdata()
            },
            error:(Response)=>{
              // alert("not saved")
            }
          })
         this.ProductData = [...this.ProductData];
      this.DailogMenu = false;
      this.product = {};
  
        }
  


  

   

deleteProduct(product: products) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + product.name + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Deleted',
        life: 3000,
      });
     if(this.ProductData = this.ProductData.filter(
        (val) => val.id !== product.id
      )){
      this.store.deleteproduct(this.product).subscribe({
        next:(Response)=>{
          // alert("deled")
         this.Fetchdata();
      
        },
        error:(Response)=>{
          // alert("not deled")
        }
      })
     
      this.product = {};
    }
    },
  });
}


  ngOnInit(): void {
    this.Fetchdata();
    
     }
}



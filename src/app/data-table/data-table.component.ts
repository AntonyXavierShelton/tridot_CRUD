import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { products } from './Data/Items';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../store.service';

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
  editmenu: boolean = false;
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private store: StoreService,
    private httpclient: HttpClient
  ) {}


  Fetchdata() {
    this.store.getproduct().subscribe({
      next: (response) => {
        this.ProductData = response;
        console.log(this.ProductData);

        // alert("fetched")
      },
      error: (res) => {
        // alert("err")
      },
    });
    this.loading=false
  }
  // For Add Data
  Add() {
    this.product = {};
    this.DailogMenu = true;
    this.Submit = false;
  }

  Delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(this.ProductData = this.ProductData.filter(val => !this.selectedProduct.includes(val))){
        this.httpclient.delete('http://localhost:3000/posts.json').subscribe({
          next: (Response) => {
            // alert('deled');
            this.Fetchdata();
          },
          error: (Response) => {
            // alert('not deled');
          },
        });
        }
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        console.log(this.selectedProduct);
      },
    });
  }

  HideDailog() {
    this.DailogMenu = false;
    this.Submit = false;
  }

  edititem(product: products) {
    this.editmenu = true;
    this.product = { ...product };
  }

  editProduct(product: products) {
    this.store.updateproduct(product.id, product).subscribe({
      next: (Response) => {
        // alert('up');
        this.Fetchdata();
      },
      error: (Response) => {
        // alert('not up');
      },
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Updated',
      life: 3000,
    });
    this.editmenu = false;
  }

  SaveProduct() {
    this.Submit = true;

    this.ProductData.push(this.product);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Created',
      life: 3000,
    });
    this.store.postproduct(this.product).subscribe({
      next: (Response) => {
        alert('saved');
        this.Fetchdata();
      },
      error: (Response) => {
        alert('not saved');
      },
    });
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

        this.httpclient
          .delete(' http://localhost:3000/posts/' + product.id)
          .subscribe({
            next: (Response) => {
              alert('deled');
              this.Fetchdata();
            },
            error: (Response) => {
              alert('not deled');
            },
          });
      },
    });
  }

  ngOnInit(): void {
    this.Fetchdata();
  }
}

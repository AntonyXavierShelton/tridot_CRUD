import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { products, category } from './Data/Items';

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
  DataUrl: any = 'https://api.escuelajs.co/api/v1/products';
  ProductData: products[] = [];
  product!: products;
  selectedProduct: products[] = [];
  DailogMenu?: boolean;
  Submit?: boolean;
  category!: category;
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  // For Data Fetch
  FetchData() {
    fetch(this.DataUrl)
      .then((res) => res.json())
      .then((json) => {
        this.ProductData = json;
        console.log(json);
        this.loading = false;
      });
  }

  // For Add Data

  Add() {
    this.product = {};
    this.category = {};
    this.DailogMenu = true;
    this.Submit = false;
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
        console.log(this.selectedProduct);
      },
    });
  }

  HideDailog() {
    this.DailogMenu = false;
    this.Submit = false;
  }

  SaveProduct() {
    this.Submit = true;

    this.ProductData.push(this.product, this.category);
    this.ProductData.pop();
    this.ProductData = [...this.ProductData];
    this.DailogMenu = false;
    this.product = {};
    console.log(this.product, this.category);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Saved',
      life: 3000,
    });
  }

  editProduct(product: products) {
    this.product = { ...product };
    this.DailogMenu = true;
    this.ProductData = this.ProductData.filter((val) => val.id !== product.id);
  }

  deleteProduct(product: products) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
        this.ProductData = this.ProductData.filter(
          (val) => val.id !== product.id
        );
        this.product = {};
      },
    });
  }

  ngOnInit() {
    this.FetchData();
  }
}

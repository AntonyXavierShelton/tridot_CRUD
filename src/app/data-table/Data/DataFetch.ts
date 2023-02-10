import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

// Import data from items

import { products } from "./Items";

@Injectable()
    export  class FetchData{


        Status: string[]=["LOW STOCK","OUT OF STOCK","IN STOCK"]

        ProductDetails:string[]=[
            "Chicken65",
            "Poratta",
            "laptop",
            "mouse",
            "iceCream",
            "Bun Butter Jam",
            "ice cream",
            "Linux",
            "chips",
            "lazy",
            "food"

        ]

        constructor(private http:HttpClient){}

        getProduct(){

            return this.http.get('src/app/data-table/Data/Dummy.json').subscribe(res=>{console.log(res)});
        }

    


    }

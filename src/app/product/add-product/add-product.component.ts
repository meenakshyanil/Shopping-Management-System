import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit  {
  form!:FormGroup;
  products: any;
  constructor(private proService:ProductService,private router:Router,private catService:CategoryService){}
  list :Category[]=[];
  
  ngOnInit(): void {
    this.catService.getlist().subscribe(result=>
      {
        console.log(result);
        this.list=result;
 
      },err=>{
        alert(err);
      }),
 
    this.form=new FormGroup({
      id: new FormControl(0),
      name:new FormControl('',Validators.required),
      price:new FormControl(null,[Validators.min(1),Validators.required]),
      categoryId:new FormControl('',Validators.required),
      manufacturedDate:new FormControl('',Validators.required),
      imageUrl:new FormControl('',Validators.required)
 
   
    })  }
   
    
    submit(){
      console.log(this.form.value);
      this.proService.add(this.form.value).subscribe(result=>{
        alert('added successfully');
        this.router.navigate(['/products']);
      },err=>{
        alert('there is an error');
        console.log(err);
    })
  }
}

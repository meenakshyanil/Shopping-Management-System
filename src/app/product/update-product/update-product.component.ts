import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId: number = 0;
  product1!: Product;

  form!: FormGroup;
  list: Category[] = [];
  constructor(private route:ActivatedRoute,private ProService:ProductService,private catService:CategoryService,private dtPipe:DatePipe,private router:Router){}
  ngOnInit(): void {
    this.productId=this.route.snapshot.params['id'];
    this.form=new FormGroup({
      id: new FormControl(0),
      name:new FormControl('',Validators.required),
      price:new FormControl(null,[Validators.min(1),Validators.required]),
      categoryId:new FormControl(null,Validators.required),
      manufacturedDate:new FormControl(''),
      imageUrl:new FormControl('',Validators.required)
      
   
    });
    this.ProService.getById(this.productId).subscribe(p=>{
      console.log(p);
      this.product1=p;
      this.form.setValue({
        id:this.product1.id,
        name:this.product1.name,
        price:this.product1.price,
        categoryId:this.product1.categoryId,
        manufacturedDate:this.dtPipe.transform(this.product1.manufacturedDate,'yyyy-MM-dd'),
        imageUrl:this.product1.imageUrl
  
      });
 
    },err=>{
      console.log(err);
      alert('error');
     
    })
   this.catService.getlist().subscribe(result=>{
        console.log(result);
        this.list=result;
      },err=>{
        console.log(err);
        alert('error');
      })
 
    
    //this.form.patchValue(this.product1);
   
  }
   submit(){
    this.ProService.update(this.form.value).subscribe(()=>{
      alert('updated successfully');
      //navigate to product list
      this.router.navigate(['/products']);
    },err=>{
      console.log(err);
      alert('error');
    })
   }
  }



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  form!:FormGroup;
  constructor(private catService:CategoryService,
    private router:Router){}
  ngOnInit(): void {
    this.form=new FormGroup({
      id: new FormControl(0),
      name:new FormControl('',Validators.required)
    })
  }
  submit(){
    console.log(this.form.value);
    this.catService.add(this.form.value).subscribe(result=>{
      alert('added successfully');
      this.router.navigate(['/categories']);
    },err=>{
      alert('there is an error');
      console.log(err);
    })
    
      
  }

}

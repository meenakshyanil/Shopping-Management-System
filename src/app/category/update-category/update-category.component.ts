import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  categoryId: number = 0;
  category1!: Category;
  form!: FormGroup;
  constructor(private route:ActivatedRoute,private catService:CategoryService,private router:Router){ }
  ngOnInit(): void {
    this.categoryId=this.route.snapshot.params['id'];
    this.form=new FormGroup({
      id: new FormControl(0),
      name:new FormControl('',Validators.required)
    })
    this.catService.getById(this.categoryId).subscribe(c=>{
      console.log(c);
      this.category1=c;
      this.form.setValue({
        id:this.category1.id,
        name:this.category1.name
      });
 
    },err=>{
      console.log(err);
      alert('error');
    })
  }
  submit(){
    this.catService.update(this.form.value).subscribe(()=>{
      alert('updated successfully');
      //navigate to product list
      this.router.navigate(['/categories']);
    },err=>{
      console.log(err);
      alert('error');
    })
  }
}


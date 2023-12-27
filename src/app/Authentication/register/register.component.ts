import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 form!:FormGroup;
 constructor(private authService:AuthServiceService, private route:Router){

 }
 ngOnInit():void{
  this.form=new FormGroup({
    id:new FormControl(0),
    name:new FormControl('',Validators.required),
    email:new  FormControl('',Validators.required),
    password:new  FormControl('',Validators.required),
    dob:new  FormControl('',Validators.required),
    role:new  FormControl(1,Validators.required),

  })
 }
 submit(){
  this.authService.register(this.form.value).subscribe(result=>{
    console.log(result);
    //navigate to login
    this.route.navigate(['/login'])
  },err=>{
    console.log(err);
    alert('error');
  })
 }
}

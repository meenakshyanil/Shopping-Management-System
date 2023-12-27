import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  list:Product[]=[];
  private productId=0;
  constructor(private proService:ProductService){

  }
  ngOnInit(): void {
    this.proService.getlist().subscribe(result=>{
      console.log(result);
      this.list=result;
    },err=>{
      alert(err);
    })
  }
  delete(){
    console.log('product to delete'+this.productId);
    this.proService.delete(this.productId).subscribe(()=>{
      alert('delete is successfull');
      this.ngOnInit();
      
    },err=>{
      console.log(err);
      alert('Error');
      
    })
  }
  setproductId(id:number){
    this.productId=id;
  }
}

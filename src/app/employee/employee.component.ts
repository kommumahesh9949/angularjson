import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  formValue!:FormGroup;
  empModel:EmployeeModel=new EmployeeModel();
  Data!:any;
  showAdd !: boolean;
  showUpdate !: boolean;
  message:string="";
  empList:any = [];

  constructor(private service: EmployeeService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.getAllEmployeeDetails();
    this.formValue=this.formBuilder.group({
      id:[''],
      firstname:[''],
      lastname:[''],
      email:['']
    })    
  }
  clickAddEmployee(){
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.empModel.id=this.formValue.value.id;
    this.empModel.first_name=this.formValue.value.firstname;
    this.empModel.last_name=this.formValue.value.lastname;
    this.empModel.email=this.formValue.value.email;

    this.service.postEmployee(this.empModel).subscribe(res=>{
      console.log(res);
      this.message="Succesfully Added"
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployeeDetails();
    },
    err=>{
      alert("Something Went Wrong")
    })

  }

  getAllEmployeeDetails(){
    this.service.getEmployee().subscribe(res=>
      {
        this.formValue.reset();
        this.Data=res;
      })
  }

  deleteEmployee(row:any){
    this.service.deleteEmployee(row.id).subscribe(res=>{
      this.getAllEmployeeDetails();
    })

  }

  onEdit(row:any){
    this.empModel.id=row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['firstname'].setValue(row.first_name);
    this.formValue.controls['lastname'].setValue(row.last_name);
    this.formValue.controls['email'].setValue(row.email);
    this.showUpdate = true;
    this.showAdd = false;

  }
  updateEmployeeDetails(){
    this.empModel.id=this.formValue.value.id;
    this.empModel.first_name=this.formValue.value.firstname;
    this.empModel.last_name=this.formValue.value.lastname;
    this.empModel.email=this.formValue.value.email;     
    this.service.updateEmployee(this.empModel,this.empModel.id).subscribe(res=>{
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployeeDetails();
    })  
    
  }
 

}
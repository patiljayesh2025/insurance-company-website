import { Component } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import { User } from './User';
import { Policy } from './Policy';
import { FormGroup , FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'insurance-frontend';
  myPolicies:Policy[]=[];
  policyForm !: FormGroup;
  registerForm!:FormGroup;
  loginForm !: FormGroup;
  loginText !: string;
  isLoggedIn=false;
  myuser !:User;
pNum!:number;
name!:string;
amount!:number;
mAmount !: number;
nominee!:string;
update=false;

  constructor(private restService : RestService,private formBuilder : FormBuilder){

  this.policyForm =this.formBuilder.group({
  PolicyNumber: 0,
  Name :"",
  Amount :0,
  MaturityAmount : 0,
  Nominee : "",
 
})

this.registerForm=this.formBuilder.group({
  User_ID :0,
  Password : "",
  Role : "",

})

this.loginForm=this.formBuilder.group({
  
  User_ID:0,
  Password:""

})

}

ngOnInit(){
  this.readData();
// this.restService.getPolicyById(3).subscribe((data)=>{this.myPolicies.push(data);console.log("my Data "+ data)});
}
readData(){
  this.restService.getMyUsers().subscribe((data)=>{this.myPolicies=data;console.log("my Data "+ data)});
}

submitPolicyData(){
  this.restService.insertPolicyData(this.policyForm.value).subscribe((data)=>{console.log("my Data "+ data)});
  this.policyForm.reset();
  this.readData();
}
updatePolicy(){
  this.restService.updatePolicyData(this.policyForm.value).subscribe(data=>console.log(data));
  this.readData();
  this.policyForm.reset();
}
fillFormData(num:number,myName:string,myAmount:number, myMAmount:number ,myNominee:string){

  this.pNum=num;
  this.name=myName;
  this.amount=myAmount;
  this.mAmount=myMAmount;
  this.nominee=myNominee;
  this.update=true;
}
deletePolicy(Id:number){
  this.restService.deletePolicyData(Id).subscribe(data=>console.log(data));
  this.readData();
}

addUser(){
this.restService.addNewUser(this.registerForm.value).subscribe(data=>console.log(data));
this.registerForm.reset();

}

loginUser(){
  this.restService.loginUser(this.loginForm.value).subscribe((data)=>{this.isLoggedIn=true;this.loginText=data;
  });
  this.loginForm.reset();
}


}

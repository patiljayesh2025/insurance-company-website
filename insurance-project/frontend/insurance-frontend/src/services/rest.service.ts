import { Injectable } from '@angular/core';
import { User } from 'src/app/User';
import { Policy } from 'src/app/Policy';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) {}
   Url ='http://localhost:3000';
    getMyUsers():Observable<Policy[]>{
      let headers={'content-type':'application/json'};
      let myUrl= this.Url +'/'+'getAllPolicies' 
      return this.http.get<Policy[]>(myUrl,{'headers':headers});
      
    }
   getPolicyById( Id : number ):Observable<any>{
    let myUrl = this.Url + '/getPolicyById/'+ Id;
    return this.http.get<any>(myUrl)
    
   }

   insertPolicyData(myPolicy : any):Observable<any>{
    let headers={'content-type':'application/json'};
    let myUrl = this.Url + '/insertPolicyData';
    let body=JSON.stringify(myPolicy)
    return this.http.post(myUrl,body,{'headers':headers});
   }

    updatePolicyData(myPolicy : any ):Observable<any>{

      let headers={'content-type':'application/json'};
      let myUrl = this.Url + '/updatePolicyData';
      let body=JSON.stringify(myPolicy)
      return this.http.put(myUrl,body,{'headers':headers});

    }

    deletePolicyData(Id : number){
      let myUrl = this.Url + "/deletePolicyData/"+Id;
      return this.http.delete(myUrl);
    }

    addNewUser(myUser : User){
      let headers={'content-type':'application/json'};
      let myUrl = this.Url +'/register';
      let body=JSON.stringify(myUser)
      return this.http.post(myUrl,body,{'headers':headers});

    }
  
    loginUser(myUser : any):Observable<any>{
      let headers={'content-type':'application/json'};
      let myUrl = this.Url +'/login';
      let body=JSON.stringify(myUser)
      return this.http.post(myUrl,body,{'headers':headers});

    }


}


export class Policy{
    PolicyNumber:number=0;
Name !:string;
Amount !:number;
MaturityAmount !: number;
Nominee !: string;


constructor( PolicyNumber:number , Name:string , Amount:number , MaturityAmount : number,Nominee : string){
this.PolicyNumber=PolicyNumber;
this.Name=Name;
this.Amount = Amount;
this.MaturityAmount = MaturityAmount;
this.Nominee = Nominee;
}


}


export class ResourceProduct {

   Id : number = 0 ;
   name :string = "NULL";
   price: number = 0;
   expiry_date: Date = new Date() ;
   production_date: Date = new Date() ;
   number_of_items :number = 12;
   category:number = 0;
   made_in:string = "" ;
   width:number = 0 ;
   height:number = 0 ;
   length:number = 0 ;
   active:Boolean = false ;

   ResourceProduct(){
       
   }

}
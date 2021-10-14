export class Products {


    id: number = 0;
    name: string = "";
    price: number = 0;
    production_date: string = "";
    expiry_date: string = "";
    number_of_items: number = 0;
    category: String = "" ;
    made_in: String = "" ;
    width: number = 0 ;
    height: number = 0 ;
    length: number = 0 ;
    active: Boolean =   false;

    public Products(id:number){
        this.id = id;
        // name: string = "";
        // price: number = 0;
        // production_date: Date = new Date();
        // expiry_date: Date = new Date();
        // number_of_items: number = 0;
        // category: String = "" ;
        // made_in: String = "" ;
        // width: number = 0 ;
        // height: number = 0 ;
        // length: number = 0 ;
        // active: boolean = false;
    }


}

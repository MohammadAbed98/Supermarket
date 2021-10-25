export class Product {


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
    }

}
export function compareProducts(p1: Product , p2: Product)
{
    const compare = p1.id - p2.id ;

    if(compare > 0 ){
        return 1 ;
    }
    else if(compare < 0 ){
        return -1
    }

    else return 0 ; 
}

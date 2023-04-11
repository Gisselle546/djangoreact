import customFetch from "../../../utils/axios";


type Props ={
    data: {
        payment_method: string
        tax_price: any;
        shipping_price: any;
        total_price: any;
        shipping_address:{
            street_address: string;
            city: string;
            state: string;
            zip_code: string;
        }
        order_items: any
    }

}

export async function create_order({data}: Props){
    let url = `/orders/create/`
   
    const response = await customFetch.post(url, data)
    return response;
}
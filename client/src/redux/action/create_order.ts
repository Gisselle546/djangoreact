import customFetch from "../../../utils/axios";

interface Product {
    quantity: any;
    product_variant: {
         id: any
         name: string;
         price: any
         stock: any
    }
}

type Props ={
    data: {
        payment_method: string;
        tax_price: any;
        shipping_price: any;
        total_price: any;
        order_id: string;
        shipping_address:{
            street_address: string;
            city: string;
            state: string;
            zip_code: string;
        }
        order_items:[Product]
    }

}

export async function create_order({data}: Props){
    let url = `/orders/create/`

    const response = await customFetch.post(url, data)
    return response;
}
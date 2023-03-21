import customFetch from "../../../utils/axios";

type Props = {
    product_id: any
    filter_type: string;
}

export async function getProduct({product_id, filter_type}:Props){

    let url = `/${filter_type}/?${product_id}`

    const response = await customFetch.get(url)
    return response;
}
import customFetch from "../../../utils/axios";

type Props = {
    filter_type: string;
    product_id: any;
    club: string;
}

export async function filter({filter_type, product_id}:Props){

    let url = `/${filter_type}/?${product_id}/review`

    const response = await customFetch.post(url)
    return response;
}
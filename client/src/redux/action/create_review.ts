import customFetch from "../../../utils/axios";

type Props = {
    filter_type: string;
    product_id: any;
    data:{
        rating: any;
        comment: any;
        name: any;
    }
}

export async function create_review({filter_type, product_id, data}:Props){

    let url = `/${filter_type}/${product_id}/reviews/`

    const response = await customFetch.post(url, data)
    return response;
}
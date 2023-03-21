import customFetch from "../../../utils/axios";

type Props = {
    team_type: string;
    club: string;
    product_id: number
}

export async function getProduct({product_id, team_type}:Props){

    let url = `/$products/?${team_type}=${product_id}`

    const response = await customFetch.get(url)
    return response;
}
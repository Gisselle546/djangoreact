import customFetch from "../../../utils/axios";

type Props = {
    filter_type: string;
    team_type: string;
    club: string;
}

export async function filter({filter_type, team_type, club}:Props){

    let url = `/${filter_type}/?${team_type}=${club}`

    const response = await customFetch.get(url)
    return response;
}
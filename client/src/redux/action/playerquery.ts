import customFetch from "../../../utils/axios";

type Props = {
    filter_type: string;
    player_first_name: string;
    player_last_name: string;
}

export async function playerquery({filter_type, player_first_name, player_last_name}: Props){
    
    let url = `/${filter_type}/?player_first_name=${player_first_name}&player_last_name=${player_last_name}`

    const response = await customFetch.get(url)
    return response;
}
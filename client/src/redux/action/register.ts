import customFetch from "../../../utils/axios";


export async function register(data:any){
    const response = await customFetch.post('/register/', data)
    return response;
}

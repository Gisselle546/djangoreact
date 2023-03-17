import customFetch from "../../../utils/axios";


export async function login(data:any){
    const response = await customFetch.post('/login/', data)
    return response;
}

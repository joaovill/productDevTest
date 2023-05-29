import { fetchUserByToken } from "@/utils/authToken";

export async function middlewareLogged(token: string) {
  const data = await fetchUserByToken(token)
  
  if(data.username){
    return data
  }else{
    return false;
  }
}
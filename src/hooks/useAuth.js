import { useSelector } from "react-redux";


export default function useAuth() {
  const auth =useSelector(store=>store.auth);

  if(auth?.accessToken && auth?.user){
    return true;
  } 
  return false;
}

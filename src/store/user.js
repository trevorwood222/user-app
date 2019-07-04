import { useEffect, useGlobal } from 'reactn';

const useUserState = () => {
  const [user, setUser] = useGlobal('user'); 
  
  useEffect(() => {
    if(user === null){
      localStorage.removeItem('user');
    }else{
      localStorage.setItem('user', user);
    }
  },[user]);

  return [user, setUser];
}

export default useUserState;
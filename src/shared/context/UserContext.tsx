import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext<UserContextValue | any>({});

interface Props {
  children: JSX.Element
}

interface UserContextValue {
  loading: boolean;
  user: any;
  isAuth: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContextProvider = ({ children }: Props) => {
  const url = process.env.REACT_APP_API;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('2w3e8oi9pjuthyf4');
    if (!accessToken) {
      setIsAuth(false);
      setUser(null);
    } else {
      const decodedJWT: any = jwtDecode(accessToken);
      console.log(decodedJWT)
      setUser({ email: decodedJWT.sub, role: decodedJWT.roles[0] })
      setIsAuth(true);
    }
  }, [isAuth]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(url + 'user/token',
        {
          email: email,
          password: password,
        }
      )
      if(response.status === 201){
        localStorage.setItem('2w3e8oi9pjuthyf4', response.data['token']);
        const decodedJWT: any = jwtDecode(response.data['token']);
        console.log('Role = ' + decodedJWT.roles[0])
        setUser({ email: decodedJWT.sub, role: decodedJWT.roles[0] })
        setIsAuth(true);
  
        navigate('/home');
        toast.success("Successfully logged in!");
      }else {
        toast.warn(response.data)
      }

    } catch (error: any) {
      console.log(error);
      if (error.response?.request.status === 401) {
        toast.error("Incorrect email or password!");
      } else {
        toast.error("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      await axios.post(url + `user/logout`, null)
    } catch (err) {
    } finally {
      setUser(null);
      setIsAuth(false);
      localStorage.removeItem('2w3e8oi9pjuthyf4');
      navigate('/login');
      toast.success("Logged out!");
    }
  }

  const value = {
    loading,
    user,
    login,
    logout,
    isAuth
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };
export type { UserContextValue };
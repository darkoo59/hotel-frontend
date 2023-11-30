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
  changePassword: (oldPassword: string, token: string, newPassword: string) => void;
  updateUserInfo: (firstname: string, lastname: string, email: string, address: string, phone: string, sex: number, birthdate: string) => void;
  sendToken: () => void;
  logout: () => void;
  getUserInfo: () => void;
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

  const getUserInfo = async () => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
      const response = await axios.get(url + 'user/user-info', { headers: {"Authorization" : `Bearer ` + accessToken} })
      if(response.status == 201){
        setUser({ email: response.data.email, role: response.data.roles[0], firstname: response.data.firstname, lastname: response.data.lastname,
        address: response.data.address, phone: response.data.phone, sex: response.data.sex, birthdate: response.data.birthdate  })
      }
      else{
        toast.warn(response.data)
      }
    } catch (err) {
    } finally {
      console.log('trebalo bi prvo')
      setLoading(false)
    }
  }

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
        await getUserInfo()
        console.log('trebalo bi drugo')
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

  const updateUserInfo = async (firstname: string, lastname: string, email: string, address: string, phone: string, sex: number, birthdate: string) => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
      const response = await axios.post(url + 'user/update',
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          phone: phone,
          sex: sex,
          birthdate: birthdate,
        }, {headers: {'Authorization': `Bearer ` + accessToken}}
      )
      if(response.status === 200){
        setUser({ email: response.data.email, role: response.data.roles[0], firstname: response.data.firstname, lastname: response.data.lastname,
          address: response.data.address, phone: response.data.phone, sex: response.data.sex, birthdate: response.data.birthdate  })
  
        navigate('/home');
        toast.success("Successfully updated profile!");
      }else {
        toast.warn(response.data)
      }

    } catch (error: any) {
      console.log(error);
      if (error.response?.request.status === 409) {
        toast.error("Email is already taken!");
      } else if (error.response?.request.status === 400){
        toast.error("User isn't found!");
      }else{
        toast.error("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  const changePassword = async (oldPassword: string, token: string, newPassword: string) => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
      const response = await axios.post(url + 'user/changePassword',
        {
          oldPassword: oldPassword,
          token: token,
          newPassword: newPassword
        }, {headers: {'Authorization': `Bearer `+accessToken}}
      )
      if(response.status === 200){
        try {
          let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
          await axios.post(url + `user/logout`, null,  {headers: {'Authorization': `Bearer `+accessToken}})
        } catch (err) {
        } finally {
          setUser(null);
          setIsAuth(false);
          localStorage.removeItem('2w3e8oi9pjuthyf4');
          navigate('/login');
          toast.success("Logged out!");
        }
      }else {
        toast.warn(response.data)
      }

    } catch (error: any) {
      console.log(error);
      if (error.response?.request.status === 400) {
        toast.error("Incorrect old password or wrong token!");
      } else {
        toast.error("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  const sendToken = async () => {
    try {
      let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
      const response = await axios.post(url + `user/resetPassword`, null, {headers: { 'Authorization': `Bearer ` + accessToken }})
      if(response.status === 200){
        toast.success("Mail with token is sent!");
      }else if(response.status === 400) {
        toast.warn("Email isn't found")
      }else{
        toast.warn(response.data)
      }
    } catch (err) {
    }
  }

  const logout = async () => {
    try {
      await axios.post(url + `user/logout`, {headers: {'Authorization': `Bearer ${localStorage.get('2w3e8oi9pjuthyf4')}`}})
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
    isAuth,
    changePassword,
    updateUserInfo,
    sendToken,
    getUserInfo
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };
export type { UserContextValue };
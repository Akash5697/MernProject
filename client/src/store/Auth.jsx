import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL;
 //context for saving the token in local storage and get it
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;
   
    const storeTokenINLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
      };

    //protected route
    let isLoggedIn = !!token;
    console.log("isLoggedIn",isLoggedIn);
    

    //logout functionality
    const LogutUser = () =>{
        setToken(null);
        toast.success("Logged out successfully!");
        return localStorage.removeItem("token");
        
    };

    //jwt Authentication - to get the current login data
    const userAuthentication = async () =>{
        try{
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`,{
                method:"GET",
                headers:{
                    Authorization : authorizationToken,
                },
            });

            if(response.ok){
                const data = await response.json();
                console.log("Fetched user data:", data);
                setUser(data.userData);
                setIsLoading(false);
            }else{
                console.log("Error fetching user data");
                setIsLoading(false);
            }

        }catch(error){
            console.log("Error fetching user data");
        }
    };

    const getServiceData = async () => {
        try {
          const response = await fetch(`${API}/api/data/service`, {
            method: "GET",
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("data", data.data);

            
            setServices(data.data);
            
          }
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };

      const isAdmin = user?.isAdmin;

    useEffect(() => {
        getServiceData();
        if(token){
            userAuthentication();
        }
       
    },[token]);

    return (
        <AuthContext.Provider value={{isLoggedIn, storeTokenINLS, LogutUser, user, services, authorizationToken,isLoading, isAdmin,API}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>{
    return useContext(AuthContext)
}

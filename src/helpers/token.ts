export const setAuthToken = (token: string) => {
    localStorage.setItem("userData", token);
  };
  
  export const getAuthToken = () => {
    if (typeof window === "undefined") return undefined;
  
    if (!localStorage.getItem("userData")) return undefined;
  
    const token = localStorage.getItem("userData");
  
    if (token) {
      return localStorage.getItem("userData");
    }
  };
  


  
  export const removeToken = (arg: string) => {
    localStorage.removeItem(arg);
  };
  
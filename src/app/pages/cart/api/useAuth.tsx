import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const handlePost = async () => {
      try {
        const response = await axios.post("/api/Admin/create?value=10");
        setIsAuthorized(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    handlePost();
  }, []);

  return { isAuth: isAuthorized };
};

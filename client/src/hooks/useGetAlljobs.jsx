import axios from "axios";
import { useEffect } from "react";

const useGetAlljobs = () => {
    // can use useState 
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("", { withCredentials: true });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAlljobs;

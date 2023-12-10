import { useState, useEffect } from "react";
import axios from "axios";

const useGetAllOffers = (token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [allOffers, setAllOffers] = useState();

  useEffect(() => {
    const getOffers = async () => {
      const url = `${BASE_URL}/offers`;
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get(url, { headers: headers });
        if (!response.data) console.error("paila");
        setAllOffers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOffers();
  }, [BASE_URL, token]);

  return { allOffers };
};

export default useGetAllOffers;

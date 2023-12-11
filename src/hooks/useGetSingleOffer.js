import { useEffect, useState } from "react";
import axios from "axios";

const useGetSingleOffer = (offerID, token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [offer, setOffer] = useState();

  useEffect(() => {
    const url = `${BASE_URL}/offers/${offerID}`;
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };
    const getOffer = async () => {
      try {
        const response = await axios.get(url, { headers: headers });
        setOffer(response.data)
      } catch (err) {
        console.err(err);
      }
    };
    getOffer()
  }, [BASE_URL, offerID, token]);

  return { offer };
};

export default useGetSingleOffer;

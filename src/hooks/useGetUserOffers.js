import { useState, useEffect } from "react";
import axios from "axios";

const useGetUserOffer = (userID, token, BASE_URL) => {
  const [allOffers, setAllOffers] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      const url = `${BASE_URL}/offers/created/${userID}`;
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
  }, [BASE_URL, token, userID]);

  return { allOffers };
};

export default useGetUserOffer;

import { useEffect, useState } from "react";
import axios from "axios";

const useGetCalification = (userID, token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [calification, setCalifications] = useState();
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const getCalification = async () => {
      const url = `${BASE_URL}/califications/${userID}`;
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get(url, { headers: headers });
        setCalifications(response);
      } catch (err) {
        console.error(err);
      }
    };
    getCalification();
  }, [BASE_URL, token, userID]);

  useEffect(() => {
    const getTotalReview = () => {
      if (
        !calification ||
        !Array.isArray(calification) ||
        calification.length === 0
      )
        return 0;
      let totalR = 0;
      for (const review of calification) {
        totalR = totalR + review.nro_estrellas;
      }
      setReviews(totalR / 6);
    };
    getTotalReview();
  }, [calification]);

  return { reviews };
};

export default useGetCalification;

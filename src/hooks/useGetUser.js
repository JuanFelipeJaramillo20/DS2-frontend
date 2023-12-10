import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AppContext } from "../context/AppContext";

const useGetUser = (userID, token) => {
  const [user, setUser] = useState({});

  const {updateUserFetch, setUpdateUserFetch} = useContext(AppContext)

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/user/${userID}`;
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(url, { headers: headers });
        if (response.data) {
          const newUser = {
            name: response.data.Name,
            phone: response.data.Phone,
            email: response.data.Email,
            image: response.data.ImageURL,
            username: response.data.Username,
            city: response.data.City,
          };
          setUser(newUser);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInformation();
  }, [token, updateUserFetch, userID]);

  return { user, setUpdateUserFetch };
};

export default useGetUser;

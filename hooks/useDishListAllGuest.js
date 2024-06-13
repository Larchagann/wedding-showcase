import { useCallback, useState } from "react";

export function useDishListAllGuest() {
  const [datas, setDatas] = useState(null);

  const getDishListAllGuest = (token) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `dish/allguest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => console.log(error));
  };

  return {
    datas: datas,
    getDishListAllGuest: useCallback(getDishListAllGuest, []),
  };
}

import { useCallback, useState } from "react";

export function useDishList() {
  const [datas, setDatas] = useState(null);

  const getDishList = (idInvitation, token) => {
    return fetch(
      process.env.NEXT_PUBLIC_API_URL + `dish/all?idInvitation=${idInvitation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => console.log(error));
  };

  const postDish = async (newData, token) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `dish/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const deleteDish = async (deleteData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `dish/${deleteData.idDish}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const createDish = async (dish, token) => {
    const newData = await postDish(dish, token);
    if (newData != false) {
      setDatas((prev) => [...prev, newData]);
      return true;
    } else return false;
  };

  const delDish = async (dish, token) => {
    const isDelete = await deleteDish(dish, token);
    if (isDelete == true)
      setDatas((prev) => prev.filter((elmt) => elmt.idDish != dish.idDish));
  };

  return {
    datas: datas,
    getDishList: useCallback(getDishList, []),
    createDish: createDish,
    deleteDish: delDish,
  };
}

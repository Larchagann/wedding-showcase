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

  const updateDishList = async (dataList, token) => {
    let isOk = true;
    const oldData = datas;
    const createList = dataList.filter(
      (item) => item.idDish == null || item.idDish == undefined
    );
    const deleteList = datas.filter((item) => {
      const isFind = dataList.find((dish) => {
        return item.idDish == dish.idDish;
      });
      return !isFind;
    });
    if (createList.length > 0) {
      for (let item of createList) {
        const newData = await postDish(item, token);
        if (newData != false) oldData.push(newData);
        else isOk = false;
      }
    }
    if (deleteList.length > 0) {
      for (let item of deleteList) {
        const isDelete = await deleteDish(item, token);
        if (isDelete == true)
          oldData.filter((elmt) => elmt.idDish != item.idDish);
        else isOk = false;
      }
    }
    setDatas(oldData);
    return isOk;
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
    //updateDishList: updateDishList,
    createDish: createDish,
    deleteDish: delDish,
  };
}

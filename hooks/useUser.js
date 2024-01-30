import { dateDifferenceInMilliseconds } from "@/utils/utils";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";

export function useUser() {
  const [user, setUser] = useSessionStorage("user", null);
  const [token, setToken] = useSessionStorage("token", null);

  const connectUser = (addressMail) => {
    fetch(
      //process.env.NEXT_PUBLIC_API_URL + `invitation?mailAddress=${addressMail}`,
      process.env.NEXT_PUBLIC_API_URL + `auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mailAddress: addressMail }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
        setUser(data.invitation);çç
        setTimeout(() => {
          disconnect();
        }, 3600000)
      })
      .catch((error) => console.log(error));
  };

  const disconnect = () => {
    setUser(null);
    setToken(null);
  };

  const checkSession = () => {
    if (user != null && token != null) {
    }
  };

  const loadSession = () => {};

  return {
    user: user,
    token: token,
    connect: connectUser,
    disconnec: disconnect,
  };
}

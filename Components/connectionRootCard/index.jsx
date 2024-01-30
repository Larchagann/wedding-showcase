"use client";
import { useUserContext } from "@/context/context";
import React from "react";
import ConnectionCard from "../connectionCard";

export default function ConnectionRootCard({ headerText, children }) {
  const context = useUserContext();
  return context.user != null ? (
    <>{children}</>
  ) : (
    <ConnectionCard headerText={headerText} />
  );
}

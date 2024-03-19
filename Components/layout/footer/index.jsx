"use client";

import React from "react";
import styles from "./footer.module.scss";
import { FaRegCopyright } from "react-icons/fa6";
import { isMobile } from "@/utils/utils";

export default function Footer() {
  return <div className={styles.footer}>
    <FaRegCopyright size={12} className={styles.icon}/>
    {`- Wedding Showcase by Coding-Cow`}
    {isMobile() ? <div className={styles.isMobileFooter} /> : <></>}
  </div>;
}

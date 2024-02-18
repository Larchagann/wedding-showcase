"use client";

import { isMobile } from "@/utils/utils";
import styles from "./banner.module.scss";
import banner from "../../images/banner.png";
import mobileBanner from "../../images/mobileBanner.png";

export default function Banner() {
  return isMobile() ? (
    <img className={styles.banner} src={mobileBanner.src} alt="mobileBanner" />
  ) : (
    <img className={styles.banner} src={banner.src} alt="banner" />
  );
}

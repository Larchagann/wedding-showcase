"use client";

import React from "react";
import styles from "@/styles/card.module.scss";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  ThemeProvider,
} from "@mui/material";
import {
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";

export default function ThemeCard() {
  const handleClick = () => {
    const jackpotLink = "https://pin.it/7xEa41HNh";

    if (window !== undefined) {
      window.open(jackpotLink, "_blank");
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Thème du mariage : Cocktails"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        - Robe longue
        <br />
        - Costume décontracté
        <br />
        - Floral et/ou couleur vive
        <br />
        <br />
        <div className={styles.alertRed}>Tenues blanches à proscrire !</div>
        <br />
        <div className={styles.itemCenterContent2}>
          <ThemeProvider theme={primaryTheme}>
            <Button variant="contained" onClick={handleClick}>
              {`cliquez ici Pour + d'idées, Allez voir notre tableau Pinterest !`}
            </Button>
          </ThemeProvider>
        </div>
      </CardContent>
    </Card>
  );
}

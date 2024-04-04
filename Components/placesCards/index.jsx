"use client";

import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { useUserContext } from "@/context/context";
import PlacesCard from "../placesCard";
import styles from "../../styles/card.module.scss"

export default function PlacesCards() {
  const context = useUserContext();

  return (
    <Grid container spacing={2}>
      {context.user.isCityHallInvited ? (
        <>
          <Grid item xs={12} md={12}>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className={styles.alertRed}>
                  Merci de garder le lieu de la réception, de la mairie et
                  l&apos;heure de la mairie confidentiel pour des questions de
                  logistique !
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <PlacesCard
              headerText={"Mairie"}
              placeName={"HÔTEL DE VILLE"}
              address={"QUAI LAMARTINE 71000 MÂCON"}
              hour={"10h"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PlacesCard
              headerText="Réception"
              placeName="SALLE DES FÊTES DE SENNECÉ"
              address="RUE VRÉMONTOISE 71000 MÂCON"
              hour={"19h"}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={12}>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className={styles.alertRed}>
                  Merci de garder le lieu de la réception confidentiel pour des
                  questions de logistique !
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <PlacesCard
              headerText="Réception"
              placeName="SALLE DES FÊTES DE SENNECÉ"
              address="RUE VRÉMONTOISE 71000 MÂCON"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

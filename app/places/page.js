"use client";
import React from "react";
import PlacesCard from "@/Components/placesCard";
import ConnectionRootCard from "@/Components/connectionRootCard";
import { Grid } from "@mui/material";
import { useUserContext } from "@/context/context";

export default function Places() {
  const context = useUserContext();
  //isCityHallInvited

  return (
    <>
      <div className="header">
        Voici les lieux et horaires où se dérouleront les festivités de notre
        union le 20 juillet 2024
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PlacesCard
            headerText={"Cérémonie Chrétienne"}
            placeName={"CATHÉDRALE SAINT-VINCENT"}
            address={"29 RUE LAMARTINE 71000 MÂCON"}
            hour={"14:30"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlacesCard
            headerText={"Vin d'honneur"}
            placeName={"ESPACE PLEIN ÉVANGILE"}
            address={"139 RUE DU CONCOURS 71000 MÂCON"}
          />
        </Grid>
        {(context.user == null) | (context.user == undefined) ? (
          <Grid item xs={12} md={12}>
            <ConnectionRootCard headerText="Réception" />
          </Grid>
        ) : (
          <>
            {context.user.isCityHallInvited ? (
              <>
                <Grid item xs={12} md={6}>
                  <PlacesCard
                    headerText={"Mairie"}
                    placeName={"HÔTEL DE VILLE"}
                    address={"QUAI LAMARTINE 71000 MÂCON"}
                    hour={"11h"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PlacesCard
                    headerText="Réception"
                    placeName="SALLE DES FÊTES DE SENNECÉ"
                    address="RUE VRÉMONTOISE 71000 MÂCON"
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} md={12}>
                <PlacesCard
                  headerText="Réception"
                  placeName="SALLE DES FÊTES DE SENNECÉ"
                  address="RUE VRÉMONTOISE 71000 MÂCON"
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
}

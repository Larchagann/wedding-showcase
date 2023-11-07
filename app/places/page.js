import React from "react";
import PlacesCard from "@/Components/placesCard";

export default function Places() {
  return (
    <>
      <div className="header">
        Voici les lieux et horaires où se dérouleront les festivités de notre
        union le 20 juillet 2024
      </div>
      <PlacesCard
        headerText={"Église"}
        placeName={"CATHÉDRALE SAINT-VINCENT"}
        address={"29 RUE LAMARTINE 71000 MÂCON"}
        hour={"14:30"}
      />
      <PlacesCard headerText={"Mairie"} />
      <PlacesCard headerText={"Vins d'honneurs"} />
      <PlacesCard headerText={"Réception"} />
    </>
  );
}

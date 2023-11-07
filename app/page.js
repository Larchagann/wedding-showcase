import Image from "next/image";
import styles from "./page.module.scss";
import { Grid } from "@mui/material";
import LinkCard from "@/Components/linkCard";

export default function Home() {
  return (
    <>
      <div className="header">
        Si vous êtes ici, c'est que Yann-David & Lucie ont le plaisir de vous
        inviter à leur union le 20 juillet 2024 !!
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LinkCard
          link="/confirmationReceipt"
            headerText="Confirmation Réception"
            contentText="Venez confirmez votre présence lors de la réception qui aura lieu après la cérémonie !"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/meal" headerText="Repas" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/places" headerText="Lieux" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/weddingList" headerText="Liste de mariage" />
        </Grid>
      </Grid>
    </>
  );
}

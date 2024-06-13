import MealCard from "@/Components/MealCard";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";

const ConnectionRootCard = dynamic(
  () => import("@/Components/connectionRootCard"),
  { ssr: false }
);

export default function Meal() {
  return (
    <>
      <div className="header">
        Pour le repas, nous souhaitons faire un buffet participatif !
        <br />
        Nous vous invitons donc à nous informer sur quel éléments du menu
        ci-dessous vous allez particper.
      </div>
      <ConnectionRootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <MealCard />
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </ConnectionRootCard>
    </>
  );
}

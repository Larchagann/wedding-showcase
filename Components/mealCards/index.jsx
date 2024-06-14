"use client";

import { Grid } from "@mui/material";
import { isMobile } from "@/utils/utils";
import MealCard from "../MealCard";
import DishAllGuestCard from "../dishAllGuestCard";

export default function MealCards() {
  return isMobile() ? (
    <>
      <MealCard />
      <DishAllGuestCard />
    </>
  ) : (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <MealCard />
      </Grid>
      <Grid item md={12}>
        <DishAllGuestCard />
      </Grid>
    </Grid>
  );
}

"use client";
import { useUserContext } from "@/context/context";
import { useDishListAllGuest } from "@/hooks/useDishListAllGuest";
import { useDishTypeList } from "@/hooks/useDishTypeList";
import { isMobile } from "@/utils/utils";
import { Card, CardContent, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderMobileTitleTypographyProps, cardHeaderTitleTypographyProps } from "@/styles/muiTheme";

export default function DishAllGuestCard() {
  const context = useUserContext();
  const dishListAllGuest = useDishListAllGuest();
  const dishTypeList = useDishTypeList();

  useEffect(
    (
      getDishListAllGuest = dishListAllGuest.getDishListAllGuest,
      getDishTypeList = dishTypeList.getDishTypeList
    ) => {
      getDishListAllGuest(context.user.idInvitation, context.token);
      getDishTypeList(context.token);
    },
    [dishListAllGuest.getDishListAllGuest, dishTypeList.getDishTypeList]
  );

  return isMobile() ? (
    <>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeaderSimple}
          title="Partcicipation des autres invit&apos(e)s"
          titleTypographyProps={cardHeaderTitleTypographyProps}
        />
      </Card>
      {dishTypeList.datas != null ? (
        <>
          {dishListAllGuest.datas != null && dishListAllGuest.datas.length > 0 ? (
            <>
              {dishListAllGuest.datas.map((data) => (
                <Card key={`${data.idDish}`} className={styles.card}>
                  <CardHeader
                    className={styles.cardHeaderMobile}
                    title={data.label}
                    titleTypographyProps={cardHeaderMobileTitleTypographyProps}
                  />
                  <CardContent className={styles.cardContent}>
                    <div className={styles.mobileLine}>
                      <div className={styles.mobileLineLabel}>
                        {`${
                          data.dishType.label != null
                            ? data.dishType.label
                            : dishTypeList.datas.find(
                                (item) => item.idDishType == data.dishType
                              ).label
                        } - ${data.quantity} part`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className={styles.itemCenterContent}>
                  Personne n'a ajouté de plats.
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </>
  ) : (
    
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Partcicipation des autres invit&apos(e)s"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {dishTypeList.datas != null ? (
          <>
            {dishListAllGuest.datas != null && dishListAllGuest.datas.length > 0 ? (
              <>
                <div className={styles.table}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nom du plat</TableCell>
                          <TableCell align="center">Quantité</TableCell>
                          <TableCell align="center">Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dishListAllGuest.datas.map((data) => (
                          <TableRow
                            key={`${data.idDish}`}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {data.label}
                            </TableCell>
                            <TableCell align="center">{`${data.quantity} part`}</TableCell>
                            <TableCell align="center">
                              {data.dishType.label != null
                                ? data.dishType.label
                                : dishTypeList.datas.find(
                                    (item) => item.idDishType == data.dishType
                                  ).label}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            ) : (
              <div className={styles.itemCenterContent}>
                Personne n'a ajouté de plats.
              </div>
            )}
          </>
          ) : (
            <div>Chargement...</div>
          )}
        </CardContent>
      </Card>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/card.module.scss";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { useUserContext } from "@/context/context";
import { useDishList } from "@/hooks/useDishList";
import { useDishTypeList } from "@/hooks/useDishTypeList";
import AddDishModal from "../addDishModal";
import {
  cardHeaderMobileTitleTypographyProps,
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import { MdOutlineRemoveCircleOutline, MdUpdateDisabled } from "react-icons/md";
import { isMobile } from "@/utils/utils";

export default function MealCard() {
  const context = useUserContext();
  const dishList = useDishList();
  const dishTypeList = useDishTypeList();

  const [dishTypeDatas, setDishTypeDatas] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(
    (
      getDishList = dishList.getDishList,
      getDishTypeList = dishTypeList.getDishTypeList
    ) => {
      getDishList(context.user.idInvitation, context.token);
      getDishTypeList(context.token);
    },
    [dishList.getDishList, dishTypeList.getDishTypeList]
  );

  useEffect(
    (dishTypeListDatas = dishTypeList.datas) => {
      setDishTypeDatas(dishTypeListDatas);
    },
    [dishTypeList.datas]
  );

  const handleModal = () => setModalOpen(!modalOpen);

  const addDish = (dish) => {
    const isSuccess = dishList.createDish(
      { ...dish, invitation: context.user.idInvitation },
      context.token
    );
    if (isSuccess) {
      setOpenSuccessAlert(true);
      setTimeout(() => {
        setOpenSuccessAlert(false);
      }, 5000);
    } else {
      setOpenErrorAlert(true);
      setTimeout(() => {
        setOpenErrorAlert(false);
      }, 30000);
    }
  };

  const deleteDish = (dish) => {
    const isSuccess = dishList.deleteDish(dish, context.token);
    if (isSuccess) {
      setOpenSuccessAlert(true);
      setTimeout(() => {
        setOpenSuccessAlert(false);
      }, 5000);
    } else {
      setOpenErrorAlert(true);
      setTimeout(() => {
        setOpenErrorAlert(false);
      }, 30000);
    }
  };

  return isMobile() ? (
    <>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeaderSimple}
          title="Votre participation au repas"
          titleTypographyProps={cardHeaderTitleTypographyProps}
        />
      </Card>
      {dishTypeList.datas != null ? (
        <>
          <div className={styles.btnAddMobile}>
            <ThemeProvider theme={primaryTheme}>
              <Button onClick={handleModal} variant="contained">
                Ajouter un plat
              </Button>
            </ThemeProvider>
          </div>
          {modalOpen ? (
            <AddDishModal
              open={modalOpen}
              handleModal={handleModal}
              dishTypeList={dishTypeDatas}
              addDish={addDish}
            />
          ) : (
            <></>
          )}
          {dishList.datas != null && dishList.datas.length > 0 ? (
            <>
              {dishList.datas.map((data) => (
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
                      <div className={styles.mobileLineButton}>
                        <MdOutlineRemoveCircleOutline
                          className={styles.iconDelete}
                          size={22}
                          onClick={() => {
                            deleteDish(data);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ width: "100%" }}>
                <Collapse in={openSuccessAlert}>
                  <Alert sx={{ mb: 2 }} severity="success">
                    Modification enregistrée !
                  </Alert>
                </Collapse>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Collapse in={openErrorAlert} severity="error">
                  <Alert sx={{ mb: 2 }}>
                    Erreur, réessayez ou contactez l'administrateur !
                  </Alert>
                </Collapse>
              </Box>
            </>
          ) : (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className={styles.itemCenterContent}>
                  Vous n'avez pas encore ajouté de plats.
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
        title="Votre participation au repas"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {dishTypeList.datas != null ? (
          <>
            <div className={styles.itemContent}>
              <ThemeProvider theme={primaryTheme}>
                <Button onClick={handleModal} variant="outlined">
                  Ajouter un plat
                </Button>
              </ThemeProvider>
              {modalOpen ? (
                <AddDishModal
                  open={modalOpen}
                  handleModal={handleModal}
                  dishTypeList={dishTypeDatas}
                  addDish={addDish}
                />
              ) : (
                <></>
              )}
            </div>
            {dishList.datas != null && dishList.datas.length > 0 ? (
              <>
                <div className={styles.table}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nom du plat</TableCell>
                          <TableCell align="center">Quantité</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Supprimer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dishList.datas.map((data) => (
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
                            <TableCell align="center">
                              <MdOutlineRemoveCircleOutline
                                className={styles.iconDelete}
                                size={22}
                                onClick={() => {
                                  deleteDish(data);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Box sx={{ width: "100%" }}>
                  <Collapse in={openSuccessAlert}>
                    <Alert sx={{ mb: 2 }} severity="success">
                      Modification enregistrée !
                    </Alert>
                  </Collapse>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Collapse in={openErrorAlert} severity="error">
                    <Alert sx={{ mb: 2 }}>
                      Erreur, réessayez ou contactez l'administrateur !
                    </Alert>
                  </Collapse>
                </Box>
              </>
            ) : (
              <div className={styles.itemCenterContent}>
                Vous n'avez pas encore ajouté de plats.
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

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
import { useGuestList } from "@/hooks/useGuestList";
import {
  cardHeaderMobileTitleTypographyProps,
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import ChoiceButton from "../choiseButton";
import { isMobile } from "@/utils/utils";

export default function GuestCard() {
  const context = useUserContext();
  const guestList = useGuestList();

  const [datas, setDatas] = useState(null);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(
    (getGuestList = guestList.getGuestList) => {
      getGuestList(context.user.idInvitation, context.token);
    },
    [guestList.getGuestList]
  );

  useEffect(() => {
    setDatas(guestList.datas);
  }, [guestList.datas]);

  const handlChangeIsPresent = (isTrue, data) => {
    setDatas(
      datas.map((item) =>
        item.idGuest == data.idGuest ? { ...item, isPresent: isTrue } : item
      )
    );
  };

  const handleChangeIsNeedAccomodation = (isTrue, data) => {
    const newDatas = datas.map((item) =>
      item.idGuest == data.idGuest
        ? { ...item, isNeedAccomodation: isTrue }
        : item
    );
    setDatas(newDatas);
  };

  const handleUpdate = async () => {
    guestList.updateGuestList(datas, context.token);
    const isSuccess = await context.updateUser();
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
          title="Confirmation réception"
          titleTypographyProps={cardHeaderTitleTypographyProps}
        />
      </Card>
      {datas != null ? (
        <>
          {datas.map((data) => (
            <Card key={data.idGuest} className={styles.card}>
              <CardHeader
                className={styles.cardHeaderMobile}
                title={`${data.firstName} ${data.lastName}`}
                titleTypographyProps={cardHeaderMobileTitleTypographyProps}
              />
              <CardContent className={styles.cardContent}>
                <div className={styles.mobileLine}>
                  <div className={styles.mobileLineLabel}>Sera là </div>
                  <div className={styles.mobileLineButton}>
                    <ChoiceButton
                      key={`ispresent-${data.idGuest}`}
                      isTrue={data.isPresent}
                      handleChangeChoice={(isTrue) =>
                        handlChangeIsPresent(isTrue, data)
                      }
                    />
                  </div>
                </div>
                <div className={styles.mobileLine}>
                  <div className={styles.mobileLineLabel}>
                    Dors dans la salle de réception{" "}
                  </div>
                  <div className={styles.mobileLineButton}>
                    <ChoiceButton
                      key={`isNeedAccomodation-${data.idGuest}`}
                      isTrue={data.isNeedAccomodation}
                      handleChangeChoice={(isTrue) =>
                        handleChangeIsNeedAccomodation(isTrue, data)
                      }
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
          <div className={styles.btnValiderMobile}>
            <ThemeProvider theme={primaryTheme}>
              <Button onClick={handleUpdate} variant="contained">
                Enregistrer
              </Button>
            </ThemeProvider>
          </div>
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </>
  ) : (
    <>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          title="Confirmation réception"
          titleTypographyProps={cardHeaderTitleTypographyProps}
        />
        <CardContent className={styles.cardContent}>
          {datas != null ? (
            <>
              <div className={styles.table}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Nom </TableCell>
                        <TableCell align="center">Prénom </TableCell>
                        <TableCell align="center">Sera là</TableCell>
                        <TableCell align="center">
                          Dors dans la salle
                          <br />
                          de réception
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datas.map((data) => (
                        <TableRow
                          key={data.idGuest}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {data.lastName}
                          </TableCell>
                          <TableCell align="center">{data.firstName}</TableCell>
                          <TableCell align="center">
                            <ChoiceButton
                              key={`ispresent-${data.idGuest}`}
                              isTrue={data.isPresent}
                              handleChangeChoice={(isTrue) =>
                                handlChangeIsPresent(isTrue, data)
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            <ChoiceButton
                              key={`isNeedAccomodation-${data.idGuest}`}
                              isTrue={data.isNeedAccomodation}
                              handleChangeChoice={(isTrue) =>
                                handleChangeIsNeedAccomodation(isTrue, data)
                              }
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
                    Erreur, rechargez la page puis réessayez ou contactez
                    l'administrateur !
                  </Alert>
                </Collapse>
              </Box>
              <div className={styles.btnValider}>
                <ThemeProvider theme={primaryTheme}>
                  <Button onClick={handleUpdate} variant="outlined">
                    Enregistrer
                  </Button>
                </ThemeProvider>
              </div>
            </>
          ) : (
            <div>Chargement...</div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

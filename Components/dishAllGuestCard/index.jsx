import { useUserContext } from "@/context/context";
import { useDishListAllGuest } from "@/hooks/useDishListAllGuest";
import { isMobile } from "@/utils/utils";
import { useEffect } from "react";

export default function DishAllGuestCard() {
  const context = useUserContext();
  const dishListAllGuest = useDishListAllGuest();
  const dishTypeList = useDishTypeList();

  useEffect(
    (getDishListAllGuest = dishListAllGuest.getDishListAllGuest,
        getDishTypeList = dishTypeList.getDishTypeList) => {
      getDishListAllGuest(context.token);
      getDishTypeList(context.token);
    },
    [dishListAllGuest.getDishListAllGuest, dishTypeList.getDishTypeList]
  );

  return isMobile() ? (<>
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeaderSimple}
        title="Votre participation au repas"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
    </Card>
    {dishTypeList.datas != null ? (
      <>
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
  </>) : (<></>)
}

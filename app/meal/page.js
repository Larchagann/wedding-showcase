import MealCard from "@/Components/MealCard";
import ConnectionRootCard from "@/Components/connectionRootCard";

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
        <MealCard />
      </ConnectionRootCard>
    </>
  );
}

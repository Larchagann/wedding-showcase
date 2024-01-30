import ConnectionRootCard from "@/Components/connectionRootCard";
import GuestCard from "@/Components/guestCard";

export default function ConfirmationReceipt() {
  return (
    <>
      <div className="header">
        Veuillez vous connectez et confirmer votre présence lors de la réception
        de notre union le 20 juillet 2024.
      </div>
      <ConnectionRootCard>
        <GuestCard />
      </ConnectionRootCard>
    </>
  );
}

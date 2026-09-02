import { AdminTopbar } from "@/components/admin/admin-topbar";
import { StatusTag } from "@/components/admin/status-tag";
import { getBookings } from "@/lib/admin-data";

export default async function AdminReservationsPage() {
  const bookings = await getBookings();

  return (
    <>
      <AdminTopbar title="Réservations" />
      <div className="p-7">
        {!bookings ? (
          <div className="rounded-md border border-dashed border-paper-dark bg-white p-8 text-center text-ink-soft">
            <p className="mb-1 font-semibold text-forest-deep">Supabase non connecté</p>
            <p className="text-sm">Les réservations réelles apparaîtront ici une fois Supabase configuré.</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-md border border-paper-dark bg-white p-8 text-center text-ink-soft">
            Aucune réservation pour l&apos;instant.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-paper-dark bg-white">
            <table className="w-full min-w-[720px] border-collapse text-[0.86rem]">
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Heure</Th>
                  <Th>Client</Th>
                  <Th>Courriel</Th>
                  <Th>Joueurs</Th>
                  <Th>Voiturette</Th>
                  <Th>Montant</Th>
                  <Th>Confirmation</Th>
                  <Th>Statut</Th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <Td>{b.tee_slots?.date ?? "—"}</Td>
                    <Td>{b.tee_slots?.time ?? "—"}</Td>
                    <Td>{b.customer_name}</Td>
                    <Td>{b.email}</Td>
                    <Td>{b.players}</Td>
                    <Td>{b.cart_addon ? "Oui" : "Non"}</Td>
                    <Td>{Number(b.total).toFixed(2)} $</Td>
                    <Td className="font-mono text-xs">{b.confirmation_code}</Td>
                    <Td>
                      <StatusTag status={b.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="whitespace-nowrap border-b-2 border-paper-dark px-2.5 py-2 text-left text-[0.72rem] text-ink-soft">
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`whitespace-nowrap border-b border-paper-dark px-2.5 py-2.5 ${className}`}>{children}</td>;
}

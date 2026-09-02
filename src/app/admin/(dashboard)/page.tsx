import { AdminTopbar } from "@/components/admin/admin-topbar";
import { StatusTag } from "@/components/admin/status-tag";
import { getDashboardStats } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <AdminTopbar title="Tableau de bord" />
      <div className="p-7">
        {!stats ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
              <Kpi label="Réservations confirmées aujourd'hui" value={String(stats.bookingsToday)} />
              <Kpi label="Demandes de mariage en attente" value={String(stats.pendingWeddings)} />
            </div>

            <div className="rounded-md border border-paper-dark bg-white p-6">
              <h3 className="mb-1">Réservations récentes</h3>
              <div className="mb-4 text-[0.82rem] text-ink-soft">
                Les 6 dernières reçues via le site public
              </div>
              {stats.recentBookings.length === 0 ? (
                <p className="text-sm text-ink-soft">Aucune réservation pour l&apos;instant.</p>
              ) : (
                <table className="w-full border-collapse text-[0.86rem]">
                  <thead>
                    <tr>
                      <Th>Date</Th>
                      <Th>Heure</Th>
                      <Th>Client</Th>
                      <Th>Joueurs</Th>
                      <Th>Statut</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((b) => (
                      <tr key={b.id}>
                        <Td>{b.tee_slots?.date ?? "—"}</Td>
                        <Td>{b.tee_slots?.time ?? "—"}</Td>
                        <Td>{b.customer_name}</Td>
                        <Td>{b.players}</Td>
                        <Td>
                          <StatusTag status={b.status} />
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-paper-dark bg-white p-8 text-center text-ink-soft">
      <p className="mb-1 font-semibold text-forest-deep">Supabase non connecté</p>
      <p className="text-sm">
        Agrega <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
        <code>SUPABASE_SERVICE_ROLE_KEY</code> para ver reservas y solicitudes
        reales aquí.
      </p>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-paper-dark bg-white px-5 py-4">
      <div className="mb-1.5 text-[0.76rem] text-ink-soft">{label}</div>
      <div className="font-serif text-[1.7rem] text-forest-deep">{value}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b-2 border-paper-dark px-2.5 py-2 text-left text-[0.72rem] text-ink-soft">
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-paper-dark px-2.5 py-2.5">{children}</td>;
}

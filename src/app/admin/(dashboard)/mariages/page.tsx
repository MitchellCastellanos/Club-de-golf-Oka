import { AdminTopbar } from "@/components/admin/admin-topbar";
import { getWeddingInquiries, type WeddingInquiryRow } from "@/lib/admin-data";

const stages: { key: string; label: string }[] = [
  { key: "new", label: "Nouvelle demande" },
  { key: "contacted", label: "Contacté" },
  { key: "proposal_sent", label: "Soumission envoyée" },
  { key: "confirmed", label: "Confirmé" },
];

export default async function AdminMariagesPage() {
  const inquiries = await getWeddingInquiries();

  return (
    <>
      <AdminTopbar title="Mariages / événements" />
      <div className="p-7">
        {!inquiries ? (
          <div className="rounded-md border border-dashed border-paper-dark bg-white p-8 text-center text-ink-soft">
            <p className="mb-1 font-semibold text-forest-deep">Supabase non connecté</p>
            <p className="text-sm">Les demandes réelles apparaîtront ici une fois Supabase configuré.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => {
              const items = inquiries.filter((i) => i.stage === stage.key);
              return (
                <div key={stage.key} className="min-h-[120px] rounded-md bg-paper p-3">
                  <h4 className="mb-2.5 flex justify-between text-[0.8rem] text-ink-soft">
                    {stage.label}
                    <b className="text-forest-deep">{items.length}</b>
                  </h4>
                  {items.map((i) => (
                    <WeddingCard key={i.id} inquiry={i} />
                  ))}
                </div>
              );
            })}
            {inquiries.filter((i) => i.stage === "lost").length > 0 && (
              <div className="min-h-[120px] rounded-md bg-paper p-3">
                <h4 className="mb-2.5 flex justify-between text-[0.8rem] text-ink-soft">
                  Perdu
                  <b className="text-forest-deep">
                    {inquiries.filter((i) => i.stage === "lost").length}
                  </b>
                </h4>
                {inquiries
                  .filter((i) => i.stage === "lost")
                  .map((i) => (
                    <WeddingCard key={i.id} inquiry={i} />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function WeddingCard({ inquiry }: { inquiry: WeddingInquiryRow }) {
  return (
    <div className="mb-2.5 rounded border border-paper-dark bg-white p-3 text-[0.82rem]">
      <b className="mb-0.5 block text-forest-deep">{inquiry.name}</b>
      <span className="text-[0.76rem] text-ink-soft">
        {inquiry.date_requested ?? "Date à confirmer"}
        {inquiry.guests ? ` · ${inquiry.guests} invités` : ""}
      </span>
    </div>
  );
}

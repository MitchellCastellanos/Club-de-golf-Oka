const styles: Record<string, string> = {
  confirmed: "bg-[#E7EFE4] text-green-ok",
  pending: "bg-[#F4EBD6] text-brass",
  cancelled: "bg-[#F5E4DF] text-red",
  no_show: "bg-[#F5E4DF] text-red",
};
const labels: Record<string, string> = {
  confirmed: "Confirmé",
  pending: "En attente",
  cancelled: "Annulé",
  no_show: "Absent",
};

export function StatusTag({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${styles[status] ?? ""}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

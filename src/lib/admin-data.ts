import { createAdminClient } from "@/lib/supabase/admin";

export type BookingRow = {
  id: string;
  customer_name: string;
  email: string;
  phone: string | null;
  players: number;
  cart_addon: boolean;
  total: number;
  status: string;
  confirmation_code: string;
  created_at: string;
  tee_slots: { date: string; time: string; holes: number } | null;
};

export type WeddingInquiryRow = {
  id: string;
  name: string;
  email: string;
  date_requested: string | null;
  guests: number | null;
  package: string | null;
  stage: string;
  created_at: string;
};

export async function getBookings(): Promise<BookingRow[] | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin
    .from("bookings")
    .select(
      "id, customer_name, email, phone, players, cart_addon, total, status, confirmation_code, created_at, tee_slots(date, time, holes)",
    )
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as BookingRow[];
}

export async function getWeddingInquiries(): Promise<WeddingInquiryRow[] | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin
    .from("wedding_inquiries")
    .select("id, name, email, date_requested, guests, package, stage, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as WeddingInquiryRow[];
}

export async function getDashboardStats() {
  const admin = createAdminClient();
  if (!admin) return null;

  const today = new Date().toISOString().slice(0, 10);

  const [{ count: bookingsTotal }, { count: pendingWeddings }, recentBookings] =
    await Promise.all([
      admin
        .from("bookings")
        .select("id, tee_slots!inner(date)", { count: "exact", head: true })
        .eq("tee_slots.date", today)
        .eq("status", "confirmed"),
      admin
        .from("wedding_inquiries")
        .select("id", { count: "exact", head: true })
        .in("stage", ["new", "contacted", "proposal_sent"]),
      admin
        .from("bookings")
        .select(
          "id, customer_name, players, status, tee_slots(date, time, holes)",
        )
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  return {
    bookingsToday: bookingsTotal ?? 0,
    pendingWeddings: pendingWeddings ?? 0,
    recentBookings: (recentBookings.data ?? []) as unknown as BookingRow[],
  };
}

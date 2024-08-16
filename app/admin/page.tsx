import { isAdmin } from "@/db/queries";
import App from "./app";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }
  return <App />;
}

import App from "./app";
import { redirect } from "next/navigation";
import { UserService } from "@/services/users";

export default async function AdminPage() {
  const admin = await UserService.isAdmin();

  if (!admin) {
    redirect("/");
  }
  return <App />;
}

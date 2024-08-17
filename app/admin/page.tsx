import { redirect } from "next/navigation";
import { UserService } from "@/services/users";
import App from "./app";

export default async function AdminPage() {
  const admin = await UserService.isAdmin();

  if (!admin) {
    redirect("/");
  }
  return <App />;
}

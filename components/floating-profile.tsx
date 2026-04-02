import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ProfileButton } from "./profile-button";

export default async function FloatingProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const customUserStr = cookieStore.get("custom_auth_user")?.value;

  let displayIdentifier = "";
  let displayInitials = "";

  if (user && user.email) {
    displayIdentifier = user.email;
    displayInitials = user.email.slice(0, 2).toUpperCase();
  } else if (customUserStr) {
    displayIdentifier = customUserStr;
    displayInitials = displayIdentifier.slice(0, 2).toUpperCase();
  }

  if (!displayIdentifier) return null;

  return (
    <div className="relative max-w-7xl mx-auto w-full">
      <div className="absolute right-4 top-4 z-50">

        <ProfileButton initials={displayInitials} email={displayIdentifier} />
      </div>
    </div>
  );
}

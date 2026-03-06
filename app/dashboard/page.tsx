import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkModal } from "./create-link-modal";
import { LinkList } from "./link-list";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="flex min-h-screen flex-col items-center py-16 px-8 bg-white dark:bg-black font-sans">
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Your Links
        </h1>
        <CreateLinkModal />
      </div>

      {userLinks.length === 0 ? (
        <p className="text-zinc-500">No links yet. Create one to get started.</p>
      ) : (
        <LinkList links={userLinks} />
      )}
    </div>
  );
}

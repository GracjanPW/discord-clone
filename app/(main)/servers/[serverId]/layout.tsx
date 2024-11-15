import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { serverId: string };
};

const ServerIdLayout = async ({ children, params }: Props) => {
  const {profile} = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-72 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-72">{children}</main>
    </div>
  );
};

export default ServerIdLayout;

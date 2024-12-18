"use client";
import queryString from "query-string";
import { usePathname, useRouter,useSearchParams } from "next/navigation";
import {Video, VideoOff} from "lucide-react";
import { ActionTooltip } from "../navigation/action-tooltip";

export const ChatVideoButton = () =>{
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video")

  const onClick = () => {
    const url = queryString.stringifyUrl({
      url:pathname || "",
      query:{
        video:isVideo ? undefined :true
      }
    }, {skipNull:true})
    router.push(url)
  }

  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? "End video call" : "Start video call";
  return (
    <ActionTooltip side="bottom" label={toolTipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="size-6 text-zinc-500 dark:text-zinc-400"/>
      </button>
    </ActionTooltip>
  )
}
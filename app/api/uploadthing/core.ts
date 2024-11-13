import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () =>{
  const {userId} = await auth();
  if (!userId){
    throw new UploadThingError("Unauthorized");
  }
  console.log(userId)
  return { userId};
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: {maxFileSize:'4MB', maxFileCount:1}})
    .middleware(async ()=>handleAuth())
    .onUploadComplete(()=>{console.log("upload")}),
  messageFile: f(['image','pdf'])
  .middleware(async ()=>handleAuth())
  .onUploadComplete(()=>{console.log("upload")})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import { currentUser, auth } from "@clerk/nextjs/server";

import { db } from "./db";

export const initialProfile = async () =>{
  const user = await currentUser();
  const {userId,redirectToSignIn} = await auth()
  if (!userId || !user) {
    return redirectToSignIn()
  }

  const profile = await db.profile.findUnique({
    where:{
      userId
    }
  })
  if (profile) {
    return profile
  }
  const newProfile = await db.profile.create({
    data: {
      userId,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    }
  })
  return newProfile;
}

import type { User } from "@prisma/client";
import { db } from "~/service/db.server";

export type { User } from "@prisma/client";

export async function getAllUsers() {
  return db.user.findMany();
}

export interface CreateUserInput {
  email?: User["email"];
  displayName: User["displayName"];
  spotifyId: User["spotifyId"];
}
export async function createUser({
  email = "",
  displayName,
  spotifyId,
}: CreateUserInput) {
  return db.user.create({
    data: {
      email,
      displayName,
      spotifyId,
    },
  });
}
export interface UpdateUserBySpotifyIdInput {
  spotifyId: string;
  email: User["email"];
}
export async function updateUserEmail({
  spotifyId,
  email = "",
}: UpdateUserBySpotifyIdInput) {
  return db.user.update({
    where: { spotifyId },
    data: { email },
  });
}

export async function getUserBySpotifyId(spotifyId: User["spotifyId"]) {
  return db.user.findUnique({ where: { spotifyId } });
}
export async function deleteUserBySpotifyId(spotifyId: User["spotifyId"]) {
  return db.user.delete({ where: { spotifyId } });
}

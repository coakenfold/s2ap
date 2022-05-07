import type { User } from "@prisma/client";
import { db } from "~/service/db.server";

export type { User } from "@prisma/client";

export async function getUserBySpotifyId(spotifyId: User["spotifyId"]) {
  return db.user.findUnique({ where: { spotifyId } });
}
export async function getAllUsers() {
  return db.user.findMany();
}

export async function getUserByEmail(email: User["email"]) {
  return db.user.findUnique({ where: { email } });
}
export interface CreateUserInput {
  email: User["email"];
  displayName: User["displayName"];
  spotifyId: User["spotifyId"];
}
export async function createUser({
  email,
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

export async function deleteUserByEmail(email: User["email"]) {
  return db.user.delete({ where: { email } });
}

export async function deleteUserBySpotifyId(spotifyId: User["spotifyId"]) {
  return db.user.delete({ where: { spotifyId } });
}

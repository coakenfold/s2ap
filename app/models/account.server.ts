import type { Account } from "@prisma/client";
import { db } from "~/service/db.server";

export type { Account } from "@prisma/client";

export interface CreateAccountInput {
  preferences: Account["preferences"];
  spotifyId: Account["spotifyId"];
}
export async function createAccountWithSpotifyId({
  spotifyId,
  preferences,
}: CreateAccountInput) {
  return db.account.create({
    data: {
      spotifyId,
      preferences,
    },
  });
}

export async function getAllAccounts() {
  return db.account.findMany();
}
export async function getAccountBySpotifyId(spotifyId: Account["spotifyId"]) {
  return db.account.findUnique({ where: { spotifyId } });
}

export async function deleteAccountBySpotifyId(
  spotifyId: Account["spotifyId"]
) {
  return db.account.delete({ where: { spotifyId } });
}

export interface UpdateAccountBySpotifyIdInput {
  spotifyId: string;
  data: Account["preferences"];
}
export async function updateAccountBySpotifyId({
  spotifyId,
  data,
}: UpdateAccountBySpotifyIdInput) {
  return db.account.update({
    where: { spotifyId },
    data: { preferences: data },
  });
}

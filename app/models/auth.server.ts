import { Authenticator } from "remix-auth";
import { SpotifyStrategy } from "remix-auth-spotify";
import { sessionStorage } from "~/session.server";
import invariant from "tiny-invariant";
import {
  getUserBySpotifyId,
  createUser,
  updateUserEmail,
} from "~/models/user.server";
import {
  createAccountWithSpotifyId,
  getAccountBySpotifyId,
} from "~/models/account.server";
import { getUserPrefs } from "~/cookies";

invariant(process.env.SPOTIFY_CLIENT_ID, "Missing SPOTIFY_CLIENT_ID env");
invariant(
  process.env.SPOTIFY_CLIENT_SECRET,
  "Missing SPOTIFY_CLIENT_SECRET env"
);
invariant(process.env.SPOTIFY_CALLBACK_URL, "Missing SPOTIFY_CALLBACK_URL env");

export const authentication = async (request: Request) => {
  const cookie = await getUserPrefs(request);

  // See https://developer.spotify.com/documentation/general/guides/authorization/scopes
  const scopes = [
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  if (cookie.canRequestEmail) {
    scopes.push("user-read-email");
  }

  const spotifyStrategy = new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL as string,
      sessionStorage,
      scope: scopes.join(" "),
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      // Get/Create user
      let user = await getUserBySpotifyId(profile.id);
      if (!user) {
        user = await createUser({
          email: profile?.__json?.email,
          displayName: profile.displayName,
          spotifyId: profile.id,
        });
      } else {
        user = await updateUserEmail({
          email: profile?.__json?.email,
          spotifyId: profile.id,
        });
      }
      // Get/Create account
      let account = await getAccountBySpotifyId(profile.id);
      if (!account) {
        account = await createAccountWithSpotifyId({
          spotifyId: profile.id,
          preferences: { newsletter: true },
        });
      }

      return {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + extraParams.expiresIn * 1000,
        tokenType: extraParams.tokenType,
        user: {
          id: user ? user.spotifyId : "",
          email: user ? user.email : "",
          name: user ? user.displayName : "",
        },
      };
    }
  );

  const authenticator = new Authenticator(sessionStorage, {
    sessionKey: spotifyStrategy.sessionKey,
    sessionErrorKey: spotifyStrategy.sessionErrorKey,
  });
  authenticator.use(spotifyStrategy);

  return { authenticator, spotifyStrategy };
};

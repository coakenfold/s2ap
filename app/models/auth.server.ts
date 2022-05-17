import { Authenticator } from "remix-auth";
import { SpotifyStrategy } from "remix-auth-spotify";

import { sessionStorage } from "~/session.server";

import invariant from "tiny-invariant";

import { getUserBySpotifyId, createUser } from "~/models/user.server";

invariant(process.env.SPOTIFY_CLIENT_ID, "Missing SPOTIFY_CLIENT_ID env");
invariant(
  process.env.SPOTIFY_CLIENT_SECRET,
  "Missing SPOTIFY_CLIENT_SECRET env"
);
invariant(process.env.SPOTIFY_CALLBACK_URL, "Missing SPOTIFY_CALLBACK_URL env");

// See https://developer.spotify.com/documentation/general/guides/authorization/scopes
const scopes = [
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-email",
].join(" ");

export const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    sessionStorage,
    scope: scopes,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get/Create user
    console.log("🥰🥰🥰🥰🥰 getUserBySpotifyId 1", {
      accessToken,
      refreshToken,
      extraParams,
      profile,
    });
    let user = await getUserBySpotifyId(profile.id);
    console.log("🥰🥰🥰🥰🥰 getUserBySpotifyId 2");
    if (!user) {
      user = await createUser({
        email: profile.__json.email,
        displayName: profile.displayName,
        spotifyId: profile.id,
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

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: spotifyStrategy.sessionKey,
  sessionErrorKey: spotifyStrategy.sessionErrorKey,
});

authenticator.use(spotifyStrategy);

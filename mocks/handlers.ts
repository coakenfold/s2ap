import { rest } from "msw";
import { SPOTIFY_API } from "~/service/spotify.api.server";
import {
  ALBUM,
  ALBUM_LIFE_ON_EARTH,
  CURRENTLY_PLAYING,
  CURRENTLY_PLAYING_NIGHTQUEEN,
  ME,
  PLAYLIST_CREATE,
  PLAYLIST_UPDATE,
} from "./spotify.responses";
export const handlers = [
  rest.get(`${SPOTIFY_API}/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ME));
  }),
  rest.get(`${SPOTIFY_API}/me/player/currently-playing`, (req, res, ctx) => {
    const data = CURRENTLY_PLAYING_NIGHTQUEEN; // CURRENTLY_PLAYING;
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${SPOTIFY_API}/albums/5oHaiGt9cgATxsrv409jP3`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ALBUM_LIFE_ON_EARTH));
  }),
  rest.get(`${SPOTIFY_API}/albums/:albumId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ALBUM));
  }),
  rest.post(`${SPOTIFY_API}/users/:userId/playlists`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PLAYLIST_CREATE));
  }),
  rest.post(`${SPOTIFY_API}/playlists/:playlistId/tracks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PLAYLIST_UPDATE));
  }),
];

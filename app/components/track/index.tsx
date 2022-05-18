// import { useMachine } from "@xstate/react";
import type { Session } from "remix-auth-spotify";
import type {
  CurrentlyPlaying,
  Track as SpotifyTrack,
  SimplifiedAlbum,
} from "spotify-types";
import { MiniForm } from "~/components/MiniForm";
// import { trackMachine } from "./track.machine";
const determineIfAlbum = (album: SimplifiedAlbum) => {
  // Definitely an album
  if (album?.album_type === "album" && album?.total_tracks > 2) {
    return true;
  }
  // Compilation
  if (album?.album_type === "compilation" && album?.total_tracks > 2) {
    return true;
  }
  // Best guess...
  if (
    album?.album_type === "single" &&
    album?.type === "album" &&
    album?.total_tracks > 2
  ) {
    return true;
  }
  // Nope
  return false;
};

export interface TrackInput {
  isSubmitting: boolean;
  current: CurrentlyPlaying | null;
  user: Session["user"];
  playlistId?: string;
}
export function Track({ isSubmitting, current, user, playlistId }: TrackInput) {
  // const [current, send] = useMachine(trackMachine);
  // console.log("machine", { current });
  const item = current?.item as SpotifyTrack;
  const trackTitle = item?.name;
  const trackArtists = item
    ? item?.artists.map(({ name }) => name).join(", ")
    : undefined;
  const album = item?.album;
  const isSongFromAlbum = determineIfAlbum(album);
  const albumTitle = album?.name;
  const albumId = album?.id;
  const albumTracks = album?.total_tracks;
  return (
    <div className="py-4">
      {user && current && isSongFromAlbum ? (
        <div className="py-4">
          <MiniForm
            action="/s2ap/create"
            method="post"
            inputs={[
              { name: "userId", value: user.id },
              { name: "userName", value: user.name || "" },
              { name: "trackTitle", value: trackTitle },
              { name: "albumId", value: albumId },
              { name: "albumTitle", value: albumTitle },
            ]}
          >
            <button
              type="submit"
              className="dark:highlight-white/20 flex h-14 w-full items-center justify-center rounded-lg bg-slate-900 px-6 text-xl font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
            >
              {!isSubmitting ? "Create album playlist" : null}
              {isSubmitting ? "🚧 Creating...." : null}
            </button>
          </MiniForm>
        </div>
      ) : null}
      {user && current && !isSongFromAlbum ? (
        <div className="py-2">
          <div>
            We think this is a single. The album has {albumTracks}{" "}
            {albumTracks > 1 ? "tracks" : "track"}
          </div>
          <MiniForm
            action="/s2ap/create"
            method="post"
            inputs={[
              { name: "userId", value: user.id },
              { name: "userName", value: user.name || "" },
              { name: "trackTitle", value: trackTitle },
              { name: "albumId", value: albumId },
              { name: "albumTitle", value: albumTitle },
            ]}
          >
            <button
              type="submit"
              className="dark:text-sky-40 inline-block tracking-tight text-sky-500"
            >
              {!isSubmitting ? "Make a playlist anyway?" : null}
              {isSubmitting ? "Creating..." : null}
            </button>
          </MiniForm>
        </div>
      ) : null}
      {playlistId ? (
        <div className="pb-4 font-light text-slate-900 dark:text-slate-50">
          <a href={`https://open.spotify.com/playlist/${playlistId}`}>
            ✅ {`https://open.spotify.com/playlist/${playlistId}`}
          </a>
        </div>
      ) : null}

      {current?.is_playing ? (
        <>
          <h2 className="font-semibold text-indigo-500 dark:text-indigo-400">
            Currently listening to
          </h2>
          <ul>
            <li className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {trackTitle}
            </li>
            {trackArtists ? (
              <li className="max-w-3xl space-y-6">{trackArtists}</li>
            ) : null}

            {album?.images ? (
              <li className="py-4">
                <img
                  src={album.images[0].url}
                  width={album.images[0].width || undefined}
                  height={album.images[0].height || undefined}
                  alt={item ? `Album art for ${albumTitle}` : ""}
                />
              </li>
            ) : null}
          </ul>
        </>
      ) : (
        <div className="py-4">Not listening to anything at the moment</div>
      )}
    </div>
  );
}

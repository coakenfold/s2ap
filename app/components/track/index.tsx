// import { useMachine } from "@xstate/react";
import type { Session } from "remix-auth-spotify";
import type {
  CurrentlyPlaying,
  Track as SpotifyTrack,
  SimplifiedAlbum,
} from "spotify-types";
import { MiniForm } from "~/components/MiniForm";

const Attribution = ({ item }: { item: SpotifyTrack }) => {
  const trackTitle = item?.name;
  const trackUrl = item?.external_urls?.spotify;
  const styleLink = "dark:text-sky-40 mr-2 text-sky-500 hover:text-sky-200";
  const trackArtists = item
    ? item?.artists.map(({ name, external_urls, id }) => (
        <a key={id} href={external_urls.spotify} className={styleLink}>
          {name}
        </a>
      ))
    : undefined;

  const album = item?.album;
  const albumTitle = album.name;
  const albumUrl = album?.external_urls.spotify;
  const heading = "font-bold inline-block mx-2";
  return (
    <section className="flex">
      <a href="https://spotify.com/" className="my-2 mr-2 inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="68px"
          width="68px"
          version="1.1"
          viewBox="0 0 168 168"
        >
          <path
            fill="#1ED760"
            d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
      </a>
      <table>
        <tr>
          <td className={heading}>Song</td>
          <td>
            <a className={styleLink} href={trackUrl}>
              {trackTitle}
            </a>
          </td>
        </tr>
        <tr>
          <td className={heading}>Album</td>
          <td>
            <a className={styleLink} href={albumUrl}>
              {albumTitle}
            </a>
          </td>
        </tr>

        {item?.artists.length < 2 ? (
          <tr>
            <td className={heading}>Artist</td>
            <td>{trackArtists}</td>
          </tr>
        ) : (
          <tr>
            <td className={heading}>Artists</td>
            <td>
              <ul>
                {trackArtists?.map((artistLink, index) => {
                  return <li key={`artist__${index}`}>{artistLink}</li>;
                })}
              </ul>
            </td>
          </tr>
        )}
      </table>
    </section>
  );
};
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
  const item = current?.item as SpotifyTrack;
  const trackTitle = item?.name;
  const trackArtists = item
    ? item?.artists.map(({ name, external_urls, id }) => name).join(", ")
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
        <div className="pt-2 pb-8">
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
        <div className="pb-4">
          <a
            className="dark:text-sky-40 text-lg text-sky-500 hover:text-sky-200 sm:text-lg"
            href={`https://open.spotify.com/playlist/${playlistId}`}
          >
            ✅ {`https://open.spotify.com/playlist/${playlistId}`}
          </a>
        </div>
      ) : null}

      {current?.is_playing ? (
        <>
          <h2 className="font-semibold text-indigo-500 dark:text-indigo-400">
            Currently listening to
          </h2>
          <ul className="mb-24">
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
          <Attribution item={item} />
        </>
      ) : (
        <div className="py-4">Not listening to anything at the moment</div>
      )}
    </div>
  );
}

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build.s2ap/_assets/tailwind-WMSAPENJ.css";

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/root.tsx
var links = () => {
  return [{ rel: "stylesheet", href: tailwind_default }];
};
var meta = () => ({
  charset: "utf-8",
  title: "S2ap",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en",
    className: "h-full"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "h-full bg-white text-slate-500 antialiased dark:bg-slate-900 dark:text-slate-400",
    "data-testid": "app.root"
  }, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.callback.tsx
var spotify_callback_exports = {};
__export(spotify_callback_exports, {
  default: () => Spotify,
  loader: () => loader
});

// app/models/auth.server.ts
var import_remix_auth = require("remix-auth");
var import_remix_auth_spotify = require("remix-auth-spotify");

// app/session.server.ts
var import_node = require("@remix-run/node");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: false
  }
});
var { getSession, commitSession, destroySession } = sessionStorage;
function getUserSession(request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}
async function logout(request) {
  const session = await getUserSession(request);
  return (0, import_node.redirect)("/s2ap", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/models/auth.server.ts
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/service/db.server.ts
var import_client = require("@prisma/client");
var db;
if (false) {
  console.log("db.server > production");
  db = new import_client.PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new import_client.PrismaClient();
  }
  db = global.__db;
}

// app/models/user.server.ts
async function getUserBySpotifyId(spotifyId) {
  return db.user.findUnique({ where: { spotifyId } });
}
async function getAllUsers() {
  return db.user.findMany();
}
async function deleteUserBySpotifyId(spotifyId) {
  return db.user.delete({ where: { spotifyId } });
}

// app/models/auth.server.ts
(0, import_tiny_invariant2.default)(process.env.SPOTIFY_CLIENT_ID, "Missing SPOTIFY_CLIENT_ID env");
(0, import_tiny_invariant2.default)(process.env.SPOTIFY_CLIENT_SECRET, "Missing SPOTIFY_CLIENT_SECRET env");
(0, import_tiny_invariant2.default)(process.env.SPOTIFY_CALLBACK_URL, "Missing SPOTIFY_CALLBACK_URL env");
var scopes = [
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-email"
].join(" ");
var spotifyStrategy = new import_remix_auth_spotify.SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  sessionStorage,
  scope: scopes
}, async ({ accessToken, refreshToken, extraParams, profile }) => {
  console.log("TEST: getUserBySpotifyId 1");
  let user = await getUserBySpotifyId(profile.id);
  console.log("TEST: getUserBySpotifyId 2");
  return {
    accessToken,
    refreshToken,
    expiresAt: Date.now() + extraParams.expiresIn * 1e3,
    tokenType: extraParams.tokenType,
    user: {
      id: user ? user.spotifyId : "",
      email: user ? user.email : "",
      name: user ? user.displayName : ""
    }
  };
});
var authenticator = new import_remix_auth.Authenticator(sessionStorage, {
  sessionKey: spotifyStrategy.sessionKey,
  sessionErrorKey: spotifyStrategy.sessionErrorKey
});
authenticator.use(spotifyStrategy);

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.callback.tsx
var loader = ({ request }) => {
  const output = authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success"
  });
  console.log("authorize/spotify/callback >>> output =", output);
  console.log("authorize/spotify/callback >>> request =", request);
  return output;
};
function Spotify() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, "s2ap/authorize/spotify/callback");
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.tsx
var spotify_exports = {};
__export(spotify_exports, {
  action: () => action
});
var action = async ({ request }) => {
  return await authenticator.authenticate("spotify", request);
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader2
});
var loader2 = async ({ request }) => {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    const url = new URL("/", `http://${host}`);
    await Promise.all([
      db.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]);
    return new Response("OK");
  } catch (error) {
    console.log("healthcheck \u274C", { error });
    return new Response("ERROR", { status: 500 });
  }
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  action: () => action2,
  default: () => Create,
  loader: () => loader3
});
var import_node2 = require("@remix-run/node");
var import_react4 = require("@remix-run/react");

// app/components/MiniForm.tsx
var import_react3 = require("@remix-run/react");
var MiniForm = (MiniFormInput) => {
  const {
    isSubmitting = false,
    children,
    inputs,
    action: action4,
    method = "get",
    keyPrefix
  } = MiniFormInput;
  return /* @__PURE__ */ React.createElement(import_react3.Form, {
    action: action4,
    method
  }, /* @__PURE__ */ React.createElement("fieldset", {
    disabled: isSubmitting
  }, inputs ? inputs.map(({ name, value }) => {
    return /* @__PURE__ */ React.createElement("input", {
      type: "hidden",
      name,
      value,
      key: `${keyPrefix ? keyPrefix : "MiniForm"}-${name}`
    });
  }) : null, children));
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/dashboard.tsx
var loader3 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  if (((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id) !== "c_oak") {
    return (0, import_node2.redirect)("/s2ap");
  }
  const users = await getAllUsers();
  return users;
};
var action2 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  if (session && ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id) === "c_oak") {
    const form = await request.formData();
    const spotifyId = form.get("spotifyId");
    if (spotifyId) {
      const user = await getUserBySpotifyId(spotifyId);
      if (user) {
        const output = await deleteUserBySpotifyId(spotifyId);
        const urlParam = (output == null ? void 0 : output.displayName) ? `?deleted=${output == null ? void 0 : output.displayName}` : "";
        return (0, import_node2.redirect)(`/s2ap/dashboard${urlParam}`);
      }
      return (0, import_node2.redirect)(`/s2ap/dashboard?error=noUser`);
    }
  }
};
function Create() {
  const users = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ React.createElement("main", {
    className: "mx-16 my-16"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50"
  }, "Dashboard"), users.map(({ displayName, email, spotifyId }) => {
    return /* @__PURE__ */ React.createElement("div", {
      key: spotifyId
    }, displayName, " - ", email, " ", /* @__PURE__ */ React.createElement(MiniForm, {
      isSubmitting: false,
      method: "post",
      inputs: [{ name: "spotifyId", value: spotifyId }]
    }, /* @__PURE__ */ React.createElement("button", {
      className: "dark:text-sky-40 font-bold tracking-tight text-sky-500 ",
      type: "submit"
    }, "Delete")));
  }));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/create.tsx
var create_exports = {};
__export(create_exports, {
  action: () => action3,
  default: () => Create2,
  loader: () => loader4
});
var import_node3 = require("@remix-run/node");

// app/service/spotify.api.server.ts
var SPOTIFY_API = "https://api.spotify.com/v1";
var currentlyPlaying = async (accessToken) => {
  const output = await fetch(`${SPOTIFY_API}/me/player/currently-playing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  });
  return output;
};
var playlistCreate = async ({
  accessToken,
  description,
  name,
  userId
}) => {
  const output = await fetch(`${SPOTIFY_API}/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      name,
      description
    })
  }).then((response) => response.json());
  return output;
};
var playlistAdd = async ({
  accessToken,
  playlistId,
  uris
}) => {
  const output = await fetch(`${SPOTIFY_API}/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      uris
    })
  }).then((response) => response.json());
  return output;
};
var albumGet = async ({
  accessToken,
  albumId
}) => {
  const output = await fetch(`${SPOTIFY_API}/albums/${albumId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => response.json());
  return output;
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/create.tsx
var loader4 = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);
  let current = {};
  if (session == null ? void 0 : session.user) {
    current = await currentlyPlaying(session.accessToken) || {};
  }
  return {
    session,
    current
  };
};
var createAlbumPlaylistFromCurrentTrack = async ({
  accessToken,
  userId,
  userName,
  trackTitle,
  albumId,
  albumTitle
}) => {
  let playlist = null;
  const albumData = await albumGet({
    accessToken,
    albumId
  });
  const albumArtists = (albumData == null ? void 0 : albumData.artists) ? albumData == null ? void 0 : albumData.artists.map(({ name }) => name).join(", ") : void 0;
  const albumTracks = albumData.tracks;
  const albumTrackItems = albumTracks == null ? void 0 : albumTracks.items;
  if (albumTrackItems) {
    playlist = await playlistCreate({
      accessToken,
      description: `\u{1F44B} This playlist was created for "${userName}" while "${trackTitle}" was playing \u2014 S2ap`,
      name: `\u{1F3A7} ${albumTitle} - ${albumArtists}`,
      userId
    });
    if (playlist.id) {
      const playlistUpdated = await playlistAdd({
        accessToken,
        playlistId: playlist.id,
        uris: albumTrackItems.map(({ uri }) => uri)
      });
      if (playlistUpdated.snapshot_id) {
        return {
          success: true,
          playlistId: playlist.id
        };
      }
    }
  }
  return {
    success: false
  };
};
var action3 = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);
  if (session) {
    const form = await request.formData();
    const accessToken = session.accessToken;
    const userId = form.get("userId");
    const userName = form.get("userName");
    const trackTitle = form.get("trackTitle");
    const albumId = form.get("albumId");
    const albumTitle = form.get("albumTitle");
    if (accessToken && userId && userName && trackTitle && albumId && albumTitle) {
      const output = await createAlbumPlaylistFromCurrentTrack({
        accessToken,
        userId,
        userName,
        trackTitle,
        albumId,
        albumTitle
      });
      const urlParam = (output == null ? void 0 : output.success) ? `?playlistId=${output.playlistId}` : "";
      return (0, import_node3.redirect)(`/s2ap${urlParam}`);
    }
  }
};
function Create2() {
  return /* @__PURE__ */ React.createElement("main", {
    className: "mx-16 my-16"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50"
  }, "Create"));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  default: () => Create3,
  loader: () => loader5
});
var loader5 = async ({ request }) => {
  return logout(request);
};
function Create3() {
  return /* @__PURE__ */ React.createElement("div", null, "logging out");
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/index.tsx
var s2ap_exports = {};
__export(s2ap_exports, {
  default: () => Index,
  loader: () => loader6
});
var import_react5 = require("@remix-run/react");

// app/components/track/index.tsx
var determineIfAlbum = (album) => {
  if ((album == null ? void 0 : album.album_type) === "album" && (album == null ? void 0 : album.total_tracks) > 2) {
    return true;
  }
  if ((album == null ? void 0 : album.album_type) === "compilation" && (album == null ? void 0 : album.total_tracks) > 2) {
    return true;
  }
  if ((album == null ? void 0 : album.album_type) === "single" && (album == null ? void 0 : album.type) === "album" && (album == null ? void 0 : album.total_tracks) > 2) {
    return true;
  }
  return false;
};
function Track({ isSubmitting, current, user, playlistId }) {
  const item = current == null ? void 0 : current.item;
  const trackTitle = item == null ? void 0 : item.name;
  const trackArtists = item ? item == null ? void 0 : item.artists.map(({ name }) => name).join(", ") : void 0;
  const album = item == null ? void 0 : item.album;
  const isSongFromAlbum = determineIfAlbum(album);
  const albumTitle = album == null ? void 0 : album.name;
  const albumId = album == null ? void 0 : album.id;
  const albumTracks = album == null ? void 0 : album.total_tracks;
  return /* @__PURE__ */ React.createElement("div", {
    className: "py-4"
  }, user && current && isSongFromAlbum ? /* @__PURE__ */ React.createElement("div", {
    className: "py-4"
  }, /* @__PURE__ */ React.createElement(MiniForm, {
    action: "/s2ap/create",
    method: "post",
    inputs: [
      { name: "userId", value: user.id },
      { name: "userName", value: user.name || "" },
      { name: "trackTitle", value: trackTitle },
      { name: "albumId", value: albumId },
      { name: "albumTitle", value: albumTitle }
    ]
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "dark:highlight-white/20 flex h-14 w-full items-center justify-center rounded-lg bg-slate-900 px-6 text-xl font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
  }, !isSubmitting ? "Create album playlist" : null, isSubmitting ? "\u{1F6A7} Creating...." : null))) : null, user && current && !isSongFromAlbum ? /* @__PURE__ */ React.createElement("div", {
    className: "py-2"
  }, /* @__PURE__ */ React.createElement("div", null, "We think this is a single. The album has ", albumTracks, " ", albumTracks > 1 ? "tracks" : "track"), /* @__PURE__ */ React.createElement(MiniForm, {
    action: "/s2ap/create",
    method: "post",
    inputs: [
      { name: "userId", value: user.id },
      { name: "userName", value: user.name || "" },
      { name: "trackTitle", value: trackTitle },
      { name: "albumId", value: albumId },
      { name: "albumTitle", value: albumTitle }
    ]
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "dark:text-sky-40 inline-block tracking-tight text-sky-500"
  }, !isSubmitting ? "Make a playlist anyway?" : null, isSubmitting ? "Creating..." : null))) : null, playlistId ? /* @__PURE__ */ React.createElement("div", {
    className: "pb-4 font-light text-slate-900 dark:text-slate-50"
  }, /* @__PURE__ */ React.createElement("a", {
    href: `https://open.spotify.com/playlist/${playlistId}`
  }, "\u2705 ", `https://open.spotify.com/playlist/${playlistId}`)) : null, (current == null ? void 0 : current.is_playing) ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", {
    className: "font-semibold text-indigo-500 dark:text-indigo-400"
  }, "Currently listening to"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
    className: "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
  }, trackTitle), trackArtists ? /* @__PURE__ */ React.createElement("li", {
    className: "max-w-3xl space-y-6"
  }, trackArtists) : null, (album == null ? void 0 : album.images) ? /* @__PURE__ */ React.createElement("li", {
    className: "py-4"
  }, /* @__PURE__ */ React.createElement("img", {
    src: album.images[0].url,
    width: album.images[0].width || void 0,
    height: album.images[0].height || void 0,
    alt: item ? `Album art for ${albumTitle}` : ""
  })) : null)) : /* @__PURE__ */ React.createElement("div", {
    className: "py-4"
  }, "Not listening to anything at the moment"));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/index.tsx
var loader6 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  const build = process.env.BUILD;
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("playlistId");
  const current = (session == null ? void 0 : session.accessToken) ? await currentlyPlaying(session.accessToken) : null;
  if (((_a = current == null ? void 0 : current.error) == null ? void 0 : _a.status) === 401) {
    return await logout(request);
  }
  return {
    session,
    current,
    playlistId,
    build
  };
};
function Index() {
  const { session, current, playlistId, build } = (0, import_react5.useLoaderData)();
  const user = session == null ? void 0 : session.user;
  const transition = (0, import_react5.useTransition)();
  const isSubmitting = transition.state === "submitting";
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "w-full max-w-3xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between space-x-4"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900  dark:text-slate-50"
  }, "S2ap"), user ? /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "/s2ap",
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200"
  }, "Reload"), /* @__PURE__ */ React.createElement(MiniForm, {
    action: "/s2ap/logout"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200",
    type: "submit"
  }, "Logout"))) : "", " "), !user ? /* @__PURE__ */ React.createElement(import_react5.Form, {
    action: "/s2ap/authorize/spotify",
    method: "post"
  }, /* @__PURE__ */ React.createElement("button", {
    className: " dark:text-sky-40 tracking-tight tracking-tight text-sky-500 hover:text-sky-200 sm:text-4xl"
  }, "Log in with Spotify")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl "
  }, "Hello", " ", user ? /* @__PURE__ */ React.createElement("strong", {
    className: "font-extrabold"
  }, user.name, "!") : "", " ", "\u{1F44B}"), (current == null ? void 0 : current.is_playing) ? /* @__PURE__ */ React.createElement(Track, {
    current,
    isSubmitting,
    user,
    playlistId
  }) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
    className: "py-8 text-slate-900 dark:text-slate-50"
  }, "\u{1F649} Play something in Spotify and then", " ", /* @__PURE__ */ React.createElement("a", {
    href: "/s2ap",
    className: "dark:text-sky-40 font-bold tracking-tight text-sky-500 "
  }, "reload"), " ", "this page"))), build ? /* @__PURE__ */ React.createElement("small", {
    className: "mt-16 mb-8 block bg-slate-900 text-right text-xs text-slate-800 "
  }, build) : null));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2
});
function Index2() {
  return /* @__PURE__ */ React.createElement("a", {
    href: "s2ap"
  }, "S2ap");
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "1d190d1a", "entry": { "module": "/build.s2ap/entry.client-POWKEXTE.js", "imports": ["/build.s2ap/_shared/chunk-DWSQRD4J.js", "/build.s2ap/_shared/chunk-6BO74FWO.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/root-QWDGGGAF.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build.s2ap/routes/index-S6BCNFMT.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/authorize/spotify": { "id": "routes/s2ap/authorize/spotify", "parentId": "root", "path": "s2ap/authorize/spotify", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/authorize/spotify-VUZYJC6T.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/authorize/spotify.callback": { "id": "routes/s2ap/authorize/spotify.callback", "parentId": "root", "path": "s2ap/authorize/spotify/callback", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/authorize/spotify.callback-TR3MIO5E.js", "imports": ["/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/create": { "id": "routes/s2ap/create", "parentId": "root", "path": "s2ap/create", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/create-T75RJAY4.js", "imports": ["/build.s2ap/_shared/chunk-ZVJXL2KF.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/dashboard": { "id": "routes/s2ap/dashboard", "parentId": "root", "path": "s2ap/dashboard", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/dashboard-CLELNWCH.js", "imports": ["/build.s2ap/_shared/chunk-O7EGGWM3.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/healthcheck": { "id": "routes/s2ap/healthcheck", "parentId": "root", "path": "s2ap/healthcheck", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/healthcheck-ZK63EQIF.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/index": { "id": "routes/s2ap/index", "parentId": "root", "path": "s2ap", "index": true, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/index-IPX3RRKO.js", "imports": ["/build.s2ap/_shared/chunk-O7EGGWM3.js", "/build.s2ap/_shared/chunk-ZVJXL2KF.js", "/build.s2ap/_shared/chunk-IX3USF6X.js", "/build.s2ap/_shared/chunk-ME5PAYV3.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/logout": { "id": "routes/s2ap/logout", "parentId": "root", "path": "s2ap/logout", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/logout-7QTEXJ2U.js", "imports": ["/build.s2ap/_shared/chunk-ME5PAYV3.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build.s2ap/manifest-1D190D1A.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/s2ap/authorize/spotify.callback": {
    id: "routes/s2ap/authorize/spotify.callback",
    parentId: "root",
    path: "s2ap/authorize/spotify/callback",
    index: void 0,
    caseSensitive: void 0,
    module: spotify_callback_exports
  },
  "routes/s2ap/authorize/spotify": {
    id: "routes/s2ap/authorize/spotify",
    parentId: "root",
    path: "s2ap/authorize/spotify",
    index: void 0,
    caseSensitive: void 0,
    module: spotify_exports
  },
  "routes/s2ap/healthcheck": {
    id: "routes/s2ap/healthcheck",
    parentId: "root",
    path: "s2ap/healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/s2ap/dashboard": {
    id: "routes/s2ap/dashboard",
    parentId: "root",
    path: "s2ap/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/s2ap/create": {
    id: "routes/s2ap/create",
    parentId: "root",
    path: "s2ap/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports
  },
  "routes/s2ap/logout": {
    id: "routes/s2ap/logout",
    parentId: "root",
    path: "s2ap/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/s2ap/index": {
    id: "routes/s2ap/index",
    parentId: "root",
    path: "s2ap",
    index: true,
    caseSensitive: void 0,
    module: s2ap_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map

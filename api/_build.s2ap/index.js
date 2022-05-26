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
var tailwind_default = "/build.s2ap/_assets/tailwind-ERST7LEO.css";

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
    className: " h-full bg-white text-slate-500 antialiased dark:bg-slate-900 dark:text-slate-400",
    "data-testid": "app.root"
  }, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.callback.tsx
var spotify_callback_exports = {};
__export(spotify_callback_exports, {
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
async function logout(request, url = "/s2ap") {
  const session = await getUserSession(request);
  return (0, import_node.redirect)(url, {
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
async function getUserByEmail(email) {
  return db.user.findUnique({ where: { email } });
}
async function createUser({
  email,
  displayName,
  spotifyId
}) {
  return db.user.create({
    data: {
      email,
      displayName,
      spotifyId
    }
  });
}
async function deleteUserBySpotifyId(spotifyId) {
  return db.user.delete({ where: { spotifyId } });
}

// app/models/account.server.ts
async function createAccountWithSpotifyId({
  spotifyId,
  preferences
}) {
  return db.account.create({
    data: {
      spotifyId,
      preferences
    }
  });
}
async function getAccountBySpotifyId(spotifyId) {
  return db.account.findUnique({ where: { spotifyId } });
}
async function deleteAccountBySpotifyId(spotifyId) {
  return db.account.delete({ where: { spotifyId } });
}
async function updateAccountBySpotifyId({
  spotifyId,
  data
}) {
  return db.account.update({
    where: { spotifyId },
    data: { preferences: data }
  });
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
  "playlist-modify-private"
];
var canGetEmail = false;
if (canGetEmail) {
  scopes.push("user-read-email");
}
var spotifyStrategy = new import_remix_auth_spotify.SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  sessionStorage,
  scope: scopes.join(" ")
}, async ({ accessToken, refreshToken, extraParams, profile }) => {
  let user = await getUserBySpotifyId(profile.id);
  if (!user) {
    user = await createUser({
      email: profile.__json.email,
      displayName: profile.displayName,
      spotifyId: profile.id
    });
  }
  let account = await getAccountBySpotifyId(profile.id);
  if (!account) {
    account = await createAccountWithSpotifyId({
      spotifyId: profile.id,
      preferences: { newsletter: true }
    });
  }
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
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap"
  });
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.tsx
var spotify_exports = {};
__export(spotify_exports, {
  action: () => action
});

// app/cookies.ts
var import_node2 = require("@remix-run/node");
var canRequestEmail = (0, import_node2.createCookie)("canRequestEmail");

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/authorize/spotify.tsx
var action = async ({ request }) => {
  const clonedRequest = request.clone();
  const form = await clonedRequest.formData();
  const formCanRequestEmail = !!form.get("canRequestEmail");
  const cookieHeader = clonedRequest.headers.get("Cookie");
  const cookie = await canRequestEmail.parse(cookieHeader) || {};
  cookie.canRequestEmail = formCanRequestEmail;
  console.log("2\u2039\u2039\u2039\u2039\u2039\u2039\u2039\u2039\u2039!! - formCanRequestEmail - !!", {
    formCanRequestEmail,
    cookie
  });
  return await authenticator.authenticate("spotify", request);
};

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/account/deleted.tsx
var deleted_exports = {};
__export(deleted_exports, {
  default: () => Deleted
});
var import_react3 = require("@remix-run/react");
function Deleted() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "w-full max-w-3xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between space-x-4"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50",
    title: "Song to Album Playlist"
  }, "S2ap | Account | Deleted")), /* @__PURE__ */ React.createElement("h2", {
    className: "mb-8 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
  }, "Thanks for trying out ", /* @__PURE__ */ React.createElement("span", {
    title: "Song to Album Playlist"
  }, "S2ap"), "!"), /* @__PURE__ */ React.createElement("p", {
    className: "my-2 text-xl text-slate-900 dark:text-slate-50 sm:text-2xl"
  }, "We deleted your account"), /* @__PURE__ */ React.createElement("p", {
    className: "my-8"
  }, "Hope you'll come back and check us out again in the future"), /* @__PURE__ */ React.createElement(import_react3.Link, {
    to: "/s2ap",
    className: "dark:text-sky-40 tracking-tight tracking-tight text-sky-500 hover:text-sky-200 sm:text-2xl"
  }, "S2ap")));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/admin/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  DASHBOARD_URL: () => DASHBOARD_URL,
  action: () => action2,
  default: () => Create,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
var import_react5 = require("@remix-run/react");

// app/components/MiniForm.tsx
var import_react4 = require("@remix-run/react");
var MiniForm = (MiniFormInput) => {
  const {
    isSubmitting = false,
    children,
    inputs,
    action: action5,
    method = "get",
    keyPrefix
  } = MiniFormInput;
  return /* @__PURE__ */ React.createElement(import_react4.Form, {
    action: action5,
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

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/admin/dashboard.tsx
var loader2 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  if (((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id) !== "c_oak") {
    return (0, import_node3.redirect)("/s2ap");
  }
  const users = await getAllUsers();
  return users;
};
var DASHBOARD_URL = "/s2ap/admin/dashboard";
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
        return (0, import_node3.redirect)(`${DASHBOARD_URL}${urlParam}`);
      }
      return (0, import_node3.redirect)(`${DASHBOARD_URL}?error=noUser`);
    }
  }
};
function Create() {
  const users = (0, import_react5.useLoaderData)();
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

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/account/index.tsx
var account_exports = {};
__export(account_exports, {
  action: () => action3,
  default: () => AccountManagement,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node");
var import_react6 = require("@remix-run/react");
var import_react7 = require("react");
var action3 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  if (!session) {
    return (0, import_node4.redirect)("/s2ap#noSession");
  }
  const sessionUser = session == null ? void 0 : session.user;
  const user = await getUserByEmail(sessionUser.email);
  const account = await getAccountBySpotifyId(user == null ? void 0 : user.spotifyId);
  if (((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id) !== (user == null ? void 0 : user.spotifyId)) {
    return (0, import_node4.redirect)("/s2ap#noSessionUserId");
  }
  if (!account) {
    return (0, import_node4.redirect)("/s2ap#noAccount");
  }
  const form = await request.formData();
  const formTarget = form.get("formTarget");
  if (formTarget === "delete") {
    const accountDelete = await deleteAccountBySpotifyId(account.spotifyId);
    console.log("accountDelete", accountDelete);
    return logout(request, "/s2ap/account/deleted");
  }
  if (formTarget === "settings") {
    const formNewsletter = form.get("newsletter");
    const wantsNewsletter = !!formNewsletter;
    const accountUpdate = await updateAccountBySpotifyId({
      spotifyId: account.spotifyId,
      data: { newsletter: wantsNewsletter }
    });
    console.log("accountUpdate", accountUpdate);
    return (0, import_node4.redirect)("/s2ap/account");
  }
  return (0, import_node4.redirect)("/s2ap/account");
};
var loader3 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  if (!(session == null ? void 0 : session.user)) {
    return (0, import_node4.redirect)("/s2ap");
  }
  const user = await getUserByEmail((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email);
  if (!user) {
    return (0, import_node4.redirect)("/s2ap");
  }
  const account = await getAccountBySpotifyId(user.spotifyId);
  if (!account) {
    return (0, import_node4.redirect)("/s2ap");
  }
  return { user, account };
};
function AccountManagement() {
  const { user, account } = (0, import_react6.useLoaderData)();
  const { spotifyId, displayName, email } = user;
  const [checked, setChecked] = (0, import_react7.useState)(account == null ? void 0 : account.preferences.newsletter);
  const subHeader = "sm:text-3xl text-3xl mb-2 text-slate-900 dark:text-slate-50";
  const section = "my-10";
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "w-full max-w-3xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between space-x-4"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50",
    title: "Song to Album Playlist"
  }, "S2ap | Account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /* @__PURE__ */ React.createElement(import_react6.Link, {
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200",
    to: "/s2ap"
  }, "Home"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", {
    className: "my-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
  }, "Account"), /* @__PURE__ */ React.createElement("p", null, "This is your account page. Feel free to change any settings or", " ", /* @__PURE__ */ React.createElement("span", {
    title: "\uFF61\uFF9F( \uFF9F\u0B87\u2038\u0B87\uFF9F)\uFF9F\uFF61"
  }, "even delete your account")), /* @__PURE__ */ React.createElement("section", {
    className: section
  }, /* @__PURE__ */ React.createElement("h2", {
    className: subHeader
  }, "Details"), /* @__PURE__ */ React.createElement("table", {
    className: "w-full  text-left"
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Spotify ID"), /* @__PURE__ */ React.createElement("th", null, "Email"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, spotifyId), /* @__PURE__ */ React.createElement("td", null, email))))), /* @__PURE__ */ React.createElement("section", {
    className: section
  }, /* @__PURE__ */ React.createElement("h2", {
    className: subHeader
  }, "Change settings"), /* @__PURE__ */ React.createElement(import_react6.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("fieldset", {
    className: "my-2 "
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "formTarget",
    value: "settings"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    name: "newsletter",
    id: "newsletter",
    defaultChecked: checked,
    onClick: () => {
      setChecked(!checked);
    }
  }), " ", /* @__PURE__ */ React.createElement("label", {
    htmlFor: "newsletter"
  }, "I'll accept (the occasional) email from S2ap")), /* @__PURE__ */ React.createElement("button", {
    className: "dark:highlight-white/20 my-4 flex w-full items-center justify-center rounded-lg bg-slate-900 py-2 px-4 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto",
    type: "submit"
  }, "Update"))), /* @__PURE__ */ React.createElement("section", {
    className: section
  }, /* @__PURE__ */ React.createElement("h2", {
    className: subHeader
  }, "Delete account"), /* @__PURE__ */ React.createElement(import_react6.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("fieldset", {
    className: "my-2 "
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "formTarget",
    value: "delete"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "spotifyId",
    value: spotifyId
  }), /* @__PURE__ */ React.createElement("button", {
    className: "dark:highlight-white/20 flex w-full items-center justify-center rounded-lg bg-red-900 py-2 px-4 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50 dark:bg-rose-500 dark:hover:bg-rose-400 sm:w-auto",
    type: "submit"
  }, "Delete")))), /* @__PURE__ */ React.createElement("div", {
    className: "my-20"
  }, /* @__PURE__ */ React.createElement("section", {
    className: section
  }, /* @__PURE__ */ React.createElement("h2", {
    className: subHeader
  }, "Privacy policy"), /* @__PURE__ */ React.createElement("p", {
    className: "mb-2"
  }, "We save your email and Spotify user name. We won't sell or share this information"), /* @__PURE__ */ React.createElement("p", null, "We would like to send you a newsletter at some point in the future. You can opt out using the form above")), /* @__PURE__ */ React.createElement("section", {
    className: section
  }, /* @__PURE__ */ React.createElement("h2", {
    className: subHeader
  }, "Attribution"), /* @__PURE__ */ React.createElement("p", {
    className: "mt-2 mb-6"
  }, "Data provided by Spotify"), /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "68px",
    width: "68px",
    version: "1.1",
    viewBox: "0 0 168 168"
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "#1ED760",
    d: "m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
  })))))));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader4,
  requiredEnvVars: () => requiredEnvVars
});
var requiredEnvVars = () => {
  return new Promise((resolve, reject) => {
    const requiredEnvs = [
      "DATABASE_URL",
      "SESSION_SECRET",
      "SPOTIFY_CLIENT_ID",
      "SPOTIFY_CLIENT_SECRET",
      "SPOTIFY_CALLBACK_URL"
    ];
    const reducedRequiredEnvs = requiredEnvs.reduce((accumulator, envName) => {
      const envValue = process.env[envName];
      if (envValue === void 0) {
        accumulator.push({
          name: envName,
          message: `\`${envName}\` is undefined`
        });
      }
      return accumulator;
    }, []);
    if (reducedRequiredEnvs.length > 0) {
      return reject(reducedRequiredEnvs);
    }
    return resolve(void 0);
  });
};
var loader4 = async ({ request }) => {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    const url = new URL("/", `http://${host}`);
    await Promise.all([
      requiredEnvVars(),
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

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/create.tsx
var create_exports = {};
__export(create_exports, {
  action: () => action4,
  default: () => Create2,
  loader: () => loader5
});
var import_node5 = require("@remix-run/node");

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
var loader5 = async ({ request }) => {
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
var action4 = async ({ request }) => {
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
      return (0, import_node5.redirect)(`/s2ap${urlParam}`);
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
  loader: () => loader6
});
var loader6 = async ({ request }) => {
  return logout(request);
};
function Create3() {
  return /* @__PURE__ */ React.createElement("div", null, "Logging out");
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/index.tsx
var s2ap_exports = {};
__export(s2ap_exports, {
  default: () => Index,
  loader: () => loader7
});
var import_react8 = require("@remix-run/react");

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
  const trackArtists = item ? item == null ? void 0 : item.artists.map(({ name, external_urls, id }) => /* @__PURE__ */ React.createElement("a", {
    key: id,
    href: external_urls.spotify,
    className: "dark:text-sky-40 mr-2 text-sky-500 hover:text-sky-200"
  }, name)) : void 0;
  const album = item == null ? void 0 : item.album;
  const isSongFromAlbum = determineIfAlbum(album);
  const albumTitle = album == null ? void 0 : album.name;
  const albumId = album == null ? void 0 : album.id;
  const albumTracks = album == null ? void 0 : album.total_tracks;
  const albumUrl = album == null ? void 0 : album.external_urls.spotify;
  console.log({ item });
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
    className: "pt-2 pb-8"
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
    className: "pb-4"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "dark:text-sky-40 text-lg text-sky-500 hover:text-sky-200 sm:text-lg",
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
  })) : null, /* @__PURE__ */ React.createElement("li", {
    className: "max-w-3xl space-y-6"
  }, /* @__PURE__ */ React.createElement("a", {
    href: albumUrl,
    className: "dark:text-sky-40 text-lg text-sky-500 hover:text-sky-200 sm:text-lg"
  }, albumTitle)))) : /* @__PURE__ */ React.createElement("div", {
    className: "py-4"
  }, "Not listening to anything at the moment"));
}

// route:/Users/chadoakenfold/Documents/Code/SongToAlbumPlaylist/Code/s2ap-vercel/app/routes/s2ap/index.tsx
var loader7 = async ({ request }) => {
  var _a;
  const session = await spotifyStrategy.getSession(request);
  const build = process.env.BUILD;
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("playlistId");
  const current = (session == null ? void 0 : session.accessToken) ? await currentlyPlaying(session.accessToken) : null;
  if (((_a = current == null ? void 0 : current.error) == null ? void 0 : _a.status) === 401) {
    return await logout(request);
  }
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await canRequestEmail.parse(cookieHeader) || {};
  console.log("cookie", cookie);
  return {
    session,
    current,
    playlistId,
    build
  };
};
function Index() {
  const { session, current, playlistId, build } = (0, import_react8.useLoaderData)();
  const user = session == null ? void 0 : session.user;
  const transition = (0, import_react8.useTransition)();
  const isSubmitting = transition.state === "submitting";
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "w-full max-w-3xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between space-x-4"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50",
    title: "Song to Album Playlist"
  }, "S2ap"), user ? /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /* @__PURE__ */ React.createElement(import_react8.Link, {
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200",
    to: "/s2ap"
  }, "Reload"), /* @__PURE__ */ React.createElement(import_react8.Link, {
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200",
    to: "/s2ap/account"
  }, "Account"), /* @__PURE__ */ React.createElement(MiniForm, {
    action: "/s2ap/logout"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200",
    type: "submit"
  }, "Logout"))) : "", " "), !user ? /* @__PURE__ */ React.createElement(import_react8.Form, {
    action: "/s2ap/authorize/spotify",
    method: "post"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "canRequestEmail",
    name: "canRequestEmail"
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "canRequestEmail"
  }, "Share email"), /* @__PURE__ */ React.createElement("button", {
    className: "dark:highlight-white/20 my-2 flex h-14 w-full items-center justify-center rounded-lg bg-slate-900 px-6 text-xl font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
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
  default: () => Index2,
  loader: () => loader8
});
var import_react9 = require("@remix-run/react");
var loader8 = async ({ request }) => {
  const build = process.env.BUILD;
  return {
    build
  };
};
function Index2() {
  const { build } = (0, import_react9.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center p-8"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "w-full max-w-3xl"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-light text-slate-900 dark:text-slate-50",
    title: "Song to Album Playlist"
  }, "S2ap"), /* @__PURE__ */ React.createElement("a", {
    href: "s2ap",
    className: " dark:text-sky-40 tracking-tight tracking-tight text-sky-500 hover:text-sky-200 sm:text-4xl"
  }, "When I listen to Spotify, often a song comes on that I dig and I click through to the album details. If it's an album (and not a single) I'll create a playlist that I add to an `In Coming` folder. This is too cumbersome \u2014 I created an app which has a button that does (almost*) all of the aforementioned steps, come see"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("small", null, "* Currently, Spotify doesn't allow apps to create playlists inside of folders"), build ? /* @__PURE__ */ React.createElement("small", {
    className: "mt-16 mb-8 block bg-slate-900 text-right text-xs text-slate-800 "
  }, build) : null)));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "4ff506e3", "entry": { "module": "/build.s2ap/entry.client-ZT3SYFH7.js", "imports": ["/build.s2ap/_shared/chunk-QV6CUALB.js", "/build.s2ap/_shared/chunk-6BO74FWO.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/root-LL7CIFDZ.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build.s2ap/routes/index-7LJSQYQQ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/account/deleted": { "id": "routes/s2ap/account/deleted", "parentId": "root", "path": "s2ap/account/deleted", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/account/deleted-EJGPICRT.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/account/index": { "id": "routes/s2ap/account/index", "parentId": "root", "path": "s2ap/account", "index": true, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/account/index-2NL6JEWT.js", "imports": ["/build.s2ap/_shared/chunk-ME5PAYV3.js", "/build.s2ap/_shared/chunk-DFG4XZEI.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/admin/dashboard": { "id": "routes/s2ap/admin/dashboard", "parentId": "root", "path": "s2ap/admin/dashboard", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/admin/dashboard-HKSB6XAR.js", "imports": ["/build.s2ap/_shared/chunk-AZR2Q6CK.js", "/build.s2ap/_shared/chunk-DFG4XZEI.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/authorize/spotify": { "id": "routes/s2ap/authorize/spotify", "parentId": "root", "path": "s2ap/authorize/spotify", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/authorize/spotify-VUZYJC6T.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/authorize/spotify.callback": { "id": "routes/s2ap/authorize/spotify.callback", "parentId": "root", "path": "s2ap/authorize/spotify/callback", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/authorize/spotify.callback-626IVBA6.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/create": { "id": "routes/s2ap/create", "parentId": "root", "path": "s2ap/create", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/create-T75RJAY4.js", "imports": ["/build.s2ap/_shared/chunk-ZVJXL2KF.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/healthcheck": { "id": "routes/s2ap/healthcheck", "parentId": "root", "path": "s2ap/healthcheck", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/healthcheck-ZK63EQIF.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/index": { "id": "routes/s2ap/index", "parentId": "root", "path": "s2ap", "index": true, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/index-4JCJLR5R.js", "imports": ["/build.s2ap/_shared/chunk-ZVJXL2KF.js", "/build.s2ap/_shared/chunk-AZR2Q6CK.js", "/build.s2ap/_shared/chunk-ME5PAYV3.js", "/build.s2ap/_shared/chunk-IX3USF6X.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/s2ap/logout": { "id": "routes/s2ap/logout", "parentId": "root", "path": "s2ap/logout", "index": void 0, "caseSensitive": void 0, "module": "/build.s2ap/routes/s2ap/logout-SJ5F4HKY.js", "imports": ["/build.s2ap/_shared/chunk-ME5PAYV3.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build.s2ap/manifest-4FF506E3.js" };

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
  "routes/s2ap/account/deleted": {
    id: "routes/s2ap/account/deleted",
    parentId: "root",
    path: "s2ap/account/deleted",
    index: void 0,
    caseSensitive: void 0,
    module: deleted_exports
  },
  "routes/s2ap/admin/dashboard": {
    id: "routes/s2ap/admin/dashboard",
    parentId: "root",
    path: "s2ap/admin/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/s2ap/account/index": {
    id: "routes/s2ap/account/index",
    parentId: "root",
    path: "s2ap/account",
    index: true,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/s2ap/healthcheck": {
    id: "routes/s2ap/healthcheck",
    parentId: "root",
    path: "s2ap/healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
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

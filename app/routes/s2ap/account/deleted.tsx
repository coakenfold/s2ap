export default function Deleted() {
  const subHeader =
    "sm:text-2xl text-2xl my-4 text-slate-900 dark:text-slate-50";
  const header =
    "sm:text-4xl text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50";

  return (
    <main className="mx-16 my-16">
      <h1
        className="font-light text-slate-900  dark:text-slate-50"
        title="Song to Album Playlist"
      >
        We deleted your account
      </h1>
      <h1 className={header}>
        Thanks for trying out <span title="Song to Album Playlist">S2ap</span>!
      </h1>
      <h2 className={subHeader}>
        Hope you'll come back and check us out again in the future
      </h2>
    </main>
  );
}

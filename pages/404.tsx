import { Button } from '@/Components/Button/Button';

export default function NotFound() {
  return (
    <main className="text-black min-h-screen flex justify-center items-center flex-col gap-10 dark:bg-slate-700 dark:text-white">
      <h1 className="text-6xl">404</h1>
      <h2 className="text-2xl">{`This page doesn't exist.`}</h2>
      <Button text="Go Home" link="/" />
    </main>
  );
}

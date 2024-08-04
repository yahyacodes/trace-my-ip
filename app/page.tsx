import dynamic from "next/dynamic";

const TraceIP = dynamic(() => import("@/components/trace-ip"), { ssr: false });

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <TraceIP />
    </main>
  );
}

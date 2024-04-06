import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="hidden md:flex md:justify-center md:items-center md:min-h-screen bg-zinc-900">
        <div className="grid text-center">
          <Image src="/yan-transparent.png" alt="yan-logo" width={384} height={384} />
          <h1 className="tracking-wide text-8xl font-extrabold pt-8">
            <span className="italic text-purple-700">yan</span>kan
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <SignIn />
      </div>
    </div>
  );
}

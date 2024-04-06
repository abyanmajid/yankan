import React from "react";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/ThemeToggle/mode-toggle"
import { currentUser } from "@clerk/nextjs";

export default async function Header() {
  const user = await currentUser();
  const imageUrl = user!.imageUrl;
  const firstName = user!.firstName;
  const lastName = user!.lastName;
  const email = user!.emailAddresses[0].emailAddress;
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
            target="_blank"
          >
            <div className="flex items-center gap-1">
              <h1 className="text-4xl font-extrabold tracking-wide"><span className="text-purple-600 italic">yan</span>kan</h1>
            </div>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav profilePicUrl={imageUrl} firstName={firstName} lastName={lastName} email={email} />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}

import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "./ui/sidebar";
import { dark } from "@clerk/themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </SidebarProvider>
    </ClerkProvider>
  );
}

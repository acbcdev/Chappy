import { SidebarProvider } from "./ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <NuqsAdapter>{children}</NuqsAdapter>
    </SidebarProvider>
  );
}

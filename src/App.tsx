import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Use Vite's BASE_URL so routing works both in Lovable preview (/) and GitHub Pages (/bloom-blossom-delight/)
  const rawBase = import.meta.env.BASE_URL || "/";
  const trimmedBase = rawBase.replace(/\/$/, "");
  const basename = trimmedBase === "" ? "/" : trimmedBase;

  // GitHub Pages SPA support - extract path from query string if redirected from 404.html
  React.useEffect(() => {
    const search = window.location.search;
    if (!search.startsWith("?/")) return;

    const parts = search.slice(2).split("&");
    const routePath = (parts.shift() || "").replace(/~and~/g, "&");
    const restQuery = parts.length ? `?${parts.join("&").replace(/~and~/g, "&")}` : "";

    const basePrefix = basename === "/" ? "" : basename;
    const nextPath = `${basePrefix}/${routePath}`.replace(/\/{2,}/g, "/");

    window.history.replaceState(null, "", `${nextPath}${restQuery}${window.location.hash}`);
  }, [basename]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

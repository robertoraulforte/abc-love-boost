import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";

export default function AnalyticsPageViews() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previous = useRef<string | null>(null);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const timer = window.setTimeout(() => {
      trackEvent("page_view", { page_path: pathname, page_location: new URL(pathname, window.location.origin).href, page_title: document.title });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return null;
}
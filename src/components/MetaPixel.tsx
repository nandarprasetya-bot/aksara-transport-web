"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

// Declare window.fbq for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

const FB_PIXEL_ID = "868663269635420";

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const trackEvent = (name: string, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews on route change
  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  // Global listener for WhatsApp clicks to trigger Contact event
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (
        link &&
        link.href &&
        (link.href.includes("wa.me") ||
          link.href.includes("api.whatsapp.com") ||
          link.href.includes("whatsapp://"))
      ) {
        trackEvent("Contact");
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
    </>
  );
}

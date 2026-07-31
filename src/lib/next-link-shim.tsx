import React from "react";

export default function Link({
  href,
  children,
  className,
  onClick,
  target,
  rel,
  ...props
}: {
  href: string | { pathname?: string; query?: any };
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  [key: string]: any;
}) {
  const urlString = typeof href === "string" ? href : href?.pathname || "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow external links, ctrl/cmd clicks, new tab target
    if (
      e.defaultPrevented ||
      target === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      urlString.startsWith("http://") ||
      urlString.startsWith("https://") ||
      urlString.startsWith("mailto:") ||
      urlString.startsWith("tel:")
    ) {
      return;
    }

    e.preventDefault();
    window.history.pushState({}, "", urlString);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <a
      href={urlString}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}

import React from "react";

export default function Link({ href, children, className, ...props }: { href: string; children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

import type { SVGProps } from "react";

export function ReceptionistIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6,12a6,6,0,1,0,12,0" />
      <path d="M12,18a6,6,0,0,0-6-6" />
      <path d="M12,18a6,6,0,0,1,6-6" />
      <path d="M12,6V4" />
      <path d="M12,20v-2" />
      <path d="M4,12H2" />
      <path d="M22,12H20" />
      <path d="M7.05,7.05l-1.41-1.41" />
      <path d="M18.36,18.36l-1.41-1.41" />
      <path d="M7.05,16.95l-1.41,1.41" />
      <path d="M18.36,5.64l-1.41,1.41" />
    </svg>
  );
}

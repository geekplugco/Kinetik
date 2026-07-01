import type { SVGProps } from "react";

const paths: Record<string, string> = {
  cart: "M3 3h2l2 12h10l2-8H6 M9 19a1 1 0 100 2 1 1 0 000-2 M16 19a1 1 0 100 2 1 1 0 000-2",
  search: "M11 4a7 7 0 105.2 11.7L21 21 M11 4a7 7 0 11-7 7 7 7 0 017-7",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8 M4 20a8 8 0 0116 0",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  close: "M6 6l12 12 M18 6L6 18",
  star: "M12 3l2.9 6 6.1.9-4.5 4.3 1.1 6.1L12 17.8 6.4 20.4l1.1-6.1L3 9.9 9.1 9z",
  chevron: "M6 9l6 6 6-6",
  "arrow-up-right": "M7 17L17 7 M8 7h9v9",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {paths[name].split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : `M${seg}`} />
      ))}
    </svg>
  );
}

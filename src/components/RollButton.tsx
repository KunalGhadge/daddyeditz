import { ArrowRight } from "lucide-react";

interface RollButtonProps {
  label: string;
  className: string;
  circleClassName: string;
  arrowClassName: string;
  arrowSize?: number;
  onClick?: () => void;
}

export default function RollButton({
  label,
  className,
  circleClassName,
  arrowClassName,
  arrowSize = 14,
  onClick,
}: RollButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-full font-medium transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${className}`}
    >
      <span className="flex h-[20px] flex-col overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 transform-gpu will-change-transform">
          <span className="flex h-[20px] items-center whitespace-nowrap">
            {label}
          </span>
          <span
            className="flex h-[20px] items-center whitespace-nowrap"
            aria-hidden="true"
          >
            {label}
          </span>
        </span>
      </span>
      <span
        className={`flex items-center justify-center rounded-full bg-white ${circleClassName}`}
      >
        <ArrowRight
          size={arrowSize}
          className={`transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${arrowClassName}`}
        />
      </span>
    </button>
  );
}

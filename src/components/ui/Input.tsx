import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-surface border border-border text-text px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted/50",
          "focus:border-white/30 focus:bg-surface-hover",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

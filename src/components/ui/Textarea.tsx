import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-surface border border-border text-text px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted/50 resize-none",
          "focus:border-white/30 focus:bg-surface-hover",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

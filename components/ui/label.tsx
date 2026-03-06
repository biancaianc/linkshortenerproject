import * as React from "react";

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-none",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export default Label;



// 
import * as React from "react";
import { cn } from "./utils";

/**
 * Simple Card components with ref forwarding and proper children rendering.
 * Keeps the same classnames you used, but renders children instead of using self-closing tags.
 */

const Card = React.forwardRef(function Card({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = React.forwardRef(function CardHeader({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const CardTitle = React.forwardRef(function CardTitle({ className, children, ...props }, ref) {
  return (
    <h4 ref={ref} data-slot="card-title" className={cn("leading-none", className)} {...props}>
      {children}
    </h4>
  );
});

const CardDescription = React.forwardRef(function CardDescription({ className, children, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});

const CardAction = React.forwardRef(function CardAction({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const CardContent = React.forwardRef(function CardContent({ className, children, ...props }, ref) {
  return (
    <div ref={ref} data-slot="card-content" className={cn("px-6 [&:last-child]:pb-6", className)} {...props}>
      {children}
    </div>
  );
});

const CardFooter = React.forwardRef(function CardFooter({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

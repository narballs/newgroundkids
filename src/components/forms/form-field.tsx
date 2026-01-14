"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
  children?: React.ReactNode; // For select options
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  hint,
  disabled = false,
  value,
  onChange,
  className,
  children,
}: FormFieldProps) {
  const id = React.useId();
  const inputId = `${id}-${name}`;
  const errorId = `${id}-${name}-error`;
  const hintId = `${id}-${name}-hint`;

  const commonProps = {
    id: inputId,
    name,
    placeholder,
    required,
    disabled,
    value,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : hint ? hintId : undefined,
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          {...commonProps}
          className={cn(error && "border-destructive focus-visible:ring-destructive")}
        />
      ) : type === "select" ? (
        <select
          {...commonProps}
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        >
          {children}
        </select>
      ) : (
        <Input
          {...commonProps}
          type={type}
          className={cn(error && "border-destructive focus-visible:ring-destructive")}
        />
      )}

      {hint && !error && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

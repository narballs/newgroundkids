"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { subscribeNewsletter } from "@/app/actions";
import type { ActionResponse } from "@/lib/validations";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  placeholder?: string;
  ctaText?: string;
  variant?: "default" | "dark" | "accent";
  className?: string;
}

const initialState: ActionResponse | null = null;

export function NewsletterForm({
  title,
  description,
  placeholder = "Enter your email",
  ctaText = "Subscribe",
  variant = "default",
  className,
}: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const variantClasses = {
    default: "",
    dark: "text-white",
    accent: "text-accent-foreground",
  };

  const inputClasses = {
    default: "",
    dark: "bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/50",
    accent: "bg-white border-white/20",
  };

  // Handle response with toast
  useEffect(() => {
    if (state?.success) {
      toast.success("Subscribed! 📬", {
        description: state.message,
        duration: 5000,
      });
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className={cn("text-center py-4", variantClasses[variant], className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-3">
          <CheckCircle className="h-6 w-6" />
        </div>
        <p className="font-medium">Thanks for subscribing!</p>
        <p className="text-sm opacity-80">Check your inbox for updates.</p>
      </div>
    );
  }

  return (
    <div className={cn(variantClasses[variant], className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h4 className="font-semibold text-lg flex items-center gap-2 mb-1">
              <Mail className="h-5 w-5" />
              {title}
            </h4>
          )}
          {description && (
            <p className={cn("text-sm", variant === "default" ? "text-muted-foreground" : "opacity-80")}>
              {description}
            </p>
          )}
        </div>
      )}

      <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          name="email"
          placeholder={placeholder}
          required
          className={cn("flex-1", inputClasses[variant], state?.errors?.email ? "border-destructive" : "")}
        />
        <Button
          type="submit"
          variant={variant === "dark" ? "secondary" : variant === "accent" ? "secondary" : "default"}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {state?.errors?.email && (
        <p className="text-sm text-destructive mt-2">{state.errors.email[0]}</p>
      )}
    </div>
  );
}

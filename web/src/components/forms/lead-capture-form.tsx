"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { submitLeadCapture } from "@/app/actions";
import type { ActionResponse } from "@/lib/validations";

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  ctaText?: string;
  variant?: "default" | "card" | "inline";
  showChildAge?: boolean;
  showPhone?: boolean;
  source?: string;
  className?: string;
}

const initialState: ActionResponse | null = null;

export function LeadCaptureForm({
  title = "Get Your Free Trial",
  description = "Enter your info below and we'll reach out to schedule your free class.",
  ctaText = "Claim Free Trial",
  variant = "default",
  showChildAge = true,
  showPhone = false,
  source = "website",
  className,
}: LeadCaptureFormProps) {
  const [state, formAction, isPending] = useActionState(submitLeadCapture, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle response with toast
  useEffect(() => {
    if (state?.success) {
      toast.success("You're in! 🎉", {
        description: state.message,
        duration: 6000,
      });
    } else if (state && !state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className={cn("text-center py-6", className)}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h4 className="font-heading text-xl mb-2">You&apos;re In!</h4>
        <p className="text-muted-foreground mb-1">
          {state.message}
        </p>
        {state.data?.recommendedProgram && (
          <p className="text-sm text-accent font-medium">
            Recommended: {state.data.recommendedProgram}
          </p>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form ref={formRef} action={formAction} className={cn("flex flex-col sm:flex-row gap-3", className)}>
        <input type="hidden" name="source" value={source} />
        <Input
          type="text"
          name="name"
          placeholder="Parent's Name"
          required
          className="flex-1"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="flex-1"
        />
        {showChildAge && (
          <Input
            type="text"
            name="childAge"
            placeholder="Child's Age"
            className="w-full sm:w-28"
          />
        )}
        <Button type="submit" disabled={isPending}>
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
    );
  }

  const formContent = (
    <form ref={formRef} action={formAction} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      
      <div className="space-y-2">
        <Label htmlFor="lead-name">Parent&apos;s Name</Label>
        <Input
          id="lead-name"
          type="text"
          name="name"
          placeholder="Your name"
          required
          className={state?.errors?.name ? "border-destructive" : ""}
        />
        {state?.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-email">Email Address</Label>
        <Input
          id="lead-email"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className={state?.errors?.email ? "border-destructive" : ""}
        />
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email[0]}</p>
        )}
      </div>

      {showPhone && (
        <div className="space-y-2">
          <Label htmlFor="lead-phone">Phone (optional)</Label>
          <Input
            id="lead-phone"
            type="tel"
            name="phone"
            placeholder="(555) 123-4567"
            className={state?.errors?.phone ? "border-destructive" : ""}
          />
          {state?.errors?.phone && (
            <p className="text-sm text-destructive">{state.errors.phone[0]}</p>
          )}
        </div>
      )}

      {showChildAge && (
        <div className="space-y-2">
          <Label htmlFor="lead-age">Child&apos;s Age</Label>
          <Input
            id="lead-age"
            type="text"
            name="childAge"
            placeholder="e.g., 6 years old"
            className={state?.errors?.childAge ? "border-destructive" : ""}
          />
          {state?.errors?.childAge && (
            <p className="text-sm text-destructive">{state.errors.childAge[0]}</p>
          )}
        </div>
      )}

      {state?.message && !state.success && !state.errors && (
        <p className="text-sm text-destructive text-center">{state.message}</p>
      )}

      <Button type="submit" fullWidth size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        No credit card required. No obligation.
      </p>
    </form>
  );

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {formContent}
    </div>
  );
}

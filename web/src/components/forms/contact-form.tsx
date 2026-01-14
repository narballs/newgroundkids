"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { submitContactForm } from "@/app/actions";
import type { ActionResponse } from "@/lib/validations";

interface ContactFormProps {
  title?: string;
  description?: string;
  showSubject?: boolean;
  subjects?: string[];
  variant?: "default" | "card";
  className?: string;
}

const defaultSubjects = [
  "General Inquiry",
  "Programs & Classes",
  "Birthday Parties",
  "Camps",
  "Pricing",
  "Other",
];

const initialState: ActionResponse | null = null;

export function ContactForm({
  title = "Get in Touch",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
  showSubject = true,
  subjects = defaultSubjects,
  variant = "default",
  className,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle response with toast
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        duration: 5000,
      });
      formRef.current?.reset();
    } else if (state && !state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const formContent = (
    <>
      {state?.success ? (
        <div className="py-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for reaching out. We&apos;ll get back to you shortly.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Name"
              name="name"
              placeholder="Your name"
              required
              error={state?.errors?.name?.[0]}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              error={state?.errors?.email?.[0]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              error={state?.errors?.phone?.[0]}
            />
            {showSubject && (
              <FormField
                label="Subject"
                name="subject"
                type="select"
                error={state?.errors?.subject?.[0]}
              >
                <option value="">Select a subject...</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </FormField>
            )}
          </div>

          <FormField
            label="Message"
            name="message"
            type="textarea"
            placeholder="How can we help you?"
            required
            error={state?.errors?.message?.[0]}
          />

          {state?.message && !state.success && state.errors && (
            <p className="text-destructive text-sm">{state.message}</p>
          )}

          <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </>
  );

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader>
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
        <div className="mb-6">
          {title && <h3 className="mb-2 text-2xl font-semibold">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      {formContent}
    </div>
  );
}

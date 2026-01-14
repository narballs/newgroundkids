import { Header } from "./header";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function PageWrapper({
  children,
  className,
  hideHeader = false,
  hideFooter = false,
}: PageWrapperProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

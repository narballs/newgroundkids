"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useId } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sheetId = useId();

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/85 sticky top-0 z-50 w-full border-b-2 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={140}
            height={40}
            style={{ height: 40, width: "auto" }}
            className="transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {/* All nav items from config (no dropdown needed for events) */}
            {siteConfig.mainNav.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="group bg-background font-heading hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm tracking-wide uppercase transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
          <Button asChild variant="accent" className="shadow-hard-sm font-heading">
            <Link href="/birthday-parties">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="border-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            id={sheetId}
            side="right"
            className="flex w-[300px] flex-col border-l-2 p-0 sm:w-[350px]"
            aria-describedby={undefined}
          >
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>

            {/* Mobile Menu Header */}
            <div className="border-border flex items-center border-b-2 px-6 py-5">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={120}
                height={34}
                style={{ height: 34, width: "auto" }}
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {siteConfig.mainNav.map((item, index) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-heading hover:bg-accent/10 hover:text-accent active:bg-accent/20 flex items-center rounded-lg px-4 py-3.5 text-base tracking-wide uppercase transition-all"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-border bg-muted/50 mt-auto space-y-4 border-t-2 px-6 py-6">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm font-medium transition-colors"
              >
                <div className="bg-background flex h-10 w-10 items-center justify-center rounded-full border-2">
                  <Phone className="h-4 w-4" />
                </div>
                {siteConfig.contact.phone}
              </a>
              <Button
                asChild
                variant="accent"
                className="shadow-hard font-heading h-12 w-full text-base"
              >
                <Link href="/birthday-parties" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
            side="right"
            className="w-[300px] border-l-2 sm:w-[400px]"
            aria-describedby={undefined}
          >
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>
            <nav className="mt-8 flex flex-col gap-4">
              {/* All nav items */}
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-accent text-lg tracking-wide uppercase transition-colors"
                >
                  {item.title}
                </Link>
              ))}

              <div className="mt-4 space-y-4 border-t-2 pt-4">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
                <Button asChild variant="accent" className="shadow-hard font-heading w-full">
                  <Link href="/birthday-parties" onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

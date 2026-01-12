"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-heading uppercase tracking-wide transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
          <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-2" aria-describedby={undefined}>
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>
            <nav className="flex flex-col gap-4 mt-8">
              {/* All nav items */}
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-heading uppercase tracking-wide hover:text-accent transition-colors"
                >
                  {item.title}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t-2 space-y-4">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
                <Button asChild variant="accent" className="w-full shadow-hard font-heading">
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCircle, Shield } from "lucide-react";

export default function Header() {
  const mainSiteUrl = "https://hobbyistdecals.in";

  const navLinks = [
    { name: "Home", href: mainSiteUrl },
    { name: "About Us", href: `${mainSiteUrl}/hobbyist-decals` },
    { name: "Custom Decal Design", href: `${mainSiteUrl}/custom-decal-design` },
    { name: "Decal Shop", href: `${mainSiteUrl}/decal-shop` },
    { name: "Contact", href: `${mainSiteUrl}/contact-us` },
  ];

  return (
    <nav className="w-full bg-white shadow-sm font-sans">
      {/* Top Discount Bar */}
      <div className="w-full bg-black text-white text-center py-2 text-sm font-medium px-2">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          API Documentation | Hobbyist Decals Developer Portal
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Hobbyist Decals"
                width={200}
                height={80}
                className="h-8 w-auto sm:h-9 md:h-11 lg:h-12"
                priority
                quality={100}
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`${mainSiteUrl}/sign-in`}
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UserCircle className="w-4 h-4" />
              Login
            </a>

            <a
              href={`${mainSiteUrl}/admin-dashboard`}
              className="hidden md:flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Shield className="w-4 h-4" />
              Admin
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

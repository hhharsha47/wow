"use client";

import React from "react";
import Link from "next/link";
import { Mail, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const mainSiteUrl = "https://hobbyistdecals.in";

  return (
    <div className="w-full min-h-min flex items-center justify-center pb-1 pt-10 bg-[#006494] font-sans">
      <div className="w-[90%] flex flex-col items-center justify-center gap-8">
        {/* Top Footer Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="uppercase text-white text-lg font-semibold">
              About Us
            </h2>
            <Link
              href={`${mainSiteUrl}/hobbyist-decals`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              HobbyistDecals
            </Link>
            <Link
              href={`${mainSiteUrl}/our-gallery`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Our Gallery
            </Link>
            <Link
              href={`${mainSiteUrl}/about-us/our-media`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Our Media
            </Link>
            <Link
              href={`${mainSiteUrl}/about-us/faq`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              FAQ
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="uppercase text-white text-lg font-semibold">
              Resources
            </h2>
            <Link
              href={`${mainSiteUrl}/blogs`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Blogs
            </Link>
            <Link
              href={`${mainSiteUrl}/decal-shop`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Shop
            </Link>
            <Link
              href={`${mainSiteUrl}/contact-us`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Contact Us
            </Link>
          </div>

          {/* Our Policy */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="uppercase text-white text-lg font-semibold">
              Our Policy
            </h2>
            <Link
              href={`${mainSiteUrl}/about-us/our-policies/shipping`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Shipping Policy
            </Link>
            <Link
              href={`${mainSiteUrl}/about-us/our-policies/replacement`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Replacement Policy
            </Link>
            <Link
              href={`${mainSiteUrl}/about-us/our-policies/gdpr`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              GDPR Policy
            </Link>
            <Link
              href={`${mainSiteUrl}/about-us/our-policies/terms-and-conditions`}
              className="capitalize text-white text-base hover:text-orange-200 transition-colors"
              target="_blank"
            >
              Terms and Conditions
            </Link>
          </div>

          {/* Newsletter (Simplified) */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="uppercase text-white text-lg font-semibold">
              Subscribe to our Newsletter
            </h2>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full bg-white rounded-lg flex items-center gap-2 px-3 py-2.5">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="email"
                  className="text-black border-none outline-none w-full rounded-md text-base bg-transparent placeholder:text-gray-500"
                  placeholder="example@gmail.com"
                  disabled
                />
              </div>
              <a
                href={`${mainSiteUrl}/sign-in`}
                className="w-fit self-start bg-[#F08700] text-white text-base font-semibold px-4 py-3 rounded-lg hover:bg-[#d67500] transition-colors block text-center"
                target="_blank"
              >
                Log In to Subscribe
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/hobbyist_decals_shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#F08700] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
          </a>
          <a
            href="https://www.facebook.com/HobbyistDecal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#F08700] transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="w-full h-px bg-white/40"></div>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-2 mb-4">
          <p className="text-center lg:text-start text-base text-white">
            &copy; 2025 Hobbyist Decals. All rights reserved.
          </p>
          <p className="text-center lg:text-end text-base text-white">
            Powered by{" "}
            <Link
              href="https://anavedecals.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Anave Industries PVT LTD
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

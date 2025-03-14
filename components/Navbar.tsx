'use client'

import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`flexBetween max-container padding-container relative z-30 py-5 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : ''}`}>
      <Link href="/">
        <Image src="/travel-now-logo.svg" alt="logo" width={150} height={40} />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Join With Us"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Image
          src={isMenuOpen ? "/close.svg" : "/menu.svg"}
          alt={isMenuOpen ? "close menu" : "open menu"}
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 lg:hidden">
          <ul className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="regular-16 text-gray-50 transition-all hover:font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                type="button"
                title="Join With Us"
                icon="/user.svg"
                variant="btn_dark_green"
                full
              />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
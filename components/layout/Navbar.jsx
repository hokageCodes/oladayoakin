'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import clsx from 'clsx'

const navLinks = ['Home', 'About', 'Projects', 'Contact']

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Theme persistence from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <>
      {/* Top Nav */}
      <nav className="w-full bg-linkedin dark:bg-black text-white px-6 md:px-16 py-5 flex justify-between items-center border-b border-white/10 z-50 relative">
        {/* Logo */}
        <div className="text-[20px] leading-[14px] font-light font-['DM Sans'] tracking-wide z-50">
          OA
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-[14px] font-light font-['DM Sans'] text-[#DCDFDF]">
            {navLinks.map((link) => (
              <Link key={link} href="#" className="hover:text-white transition">
                {link}
              </Link>
            ))}
          </div>
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="text-white hover:opacity-80 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="text-white hover:opacity-80 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-white hover:opacity-80 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={clsx(
          'fixed inset-0 flex flex-col bg-linkedin dark:bg-black transition-all duration-300 z-40 md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        {/* Top Row: Logo + Close */}
        <div className="flex justify-between items-center px-6 pt-6">
          <div className="text-[20px] font-light font-['DM Sans']">OA</div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:opacity-80 transition"
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col items-center justify-center flex-grow gap-10 text-[24px] font-light text-[#DCDFDF]">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition"
            >
              {link}
            </Link>
          ))}

          {/* CTA Button */}
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="mt-10 px-6 py-3 bg-white text-black text-[16px] rounded-full font-medium hover:bg-opacity-90 transition"
          >
            Book A Consultation
          </Link>
        </div>
      </div>
    </>
  )
}

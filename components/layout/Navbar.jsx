'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import clsx from 'clsx'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'What I Do', href: '#whatido' }
]

export default function Navbar() {
  // const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Commented out: Theme persistence
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('theme')
  //   if (storedTheme === 'dark') {
  //     setIsDark(true)
  //     document.documentElement.classList.add('dark')
  //   }
  // }, [])

  // useEffect(() => {
  //   const html = document.documentElement
  //   if (isDark) {
  //     html.classList.add('dark')
  //     localStorage.setItem('theme', 'dark')
  //   } else {
  //     html.classList.remove('dark')
  //     localStorage.setItem('theme', 'light')
  //   }
  // }, [isDark])

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const navbarHeight = 80
      const targetPosition = targetElement.offsetTop - navbarHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Top Nav */}
      <nav className="w-full bg-black text-white px-6 md:px-16 py-5 flex justify-between items-center border-b border-white/10 z-50 sticky top-0 backdrop-blur-sm">
        <div className="text-[20px] leading-[14px] font-light font-['DM Sans'] tracking-wide z-50">
          <Link 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="hover:opacity-80 transition"
          >
            OA
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-[14px] font-light font-['DM Sans'] text-[#DCDFDF]">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="hover:text-white transition cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Removed Theme Toggle */}
          {/* <button
            onClick={() => setIsDark((prev) => !prev)}
            className="text-white hover:opacity-80 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button> */}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          {/* Removed Theme Toggle */}
          {/* <button
            onClick={() => setIsDark((prev) => !prev)}
            className="text-white hover:opacity-80 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button> */}
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
          'fixed inset-0 flex flex-col bg-black transition-all duration-300 z-40 md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="flex justify-between items-center px-6 pt-6">
          <div className="text-[20px] font-light font-['DM Sans']">
            <Link 
              href="#home" 
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="hover:opacity-80 transition"
            >
              OA
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:opacity-80 transition"
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow gap-10 text-[24px] font-light text-[#DCDFDF]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="hover:text-white transition cursor-pointer"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="mt-10 px-6 py-3 bg-white text-black text-[16px] rounded-full font-medium hover:bg-opacity-90 transition cursor-pointer"
          >
            Book A Consultation
          </Link>
        </div>
      </div>
    </>
  )
}

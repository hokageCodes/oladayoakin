'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import Container from '../Container';

const Footer = () => {
  return (
    <footer className="px-2 py-10 md:my-2 dark:bg-black">
      <Container>
        <div className="border border-black dark:bg-[#C2C2C240]/25 dark:border-white rounded-[16px] p-6 md:p-8 flex flex-col items-center gap-10">
          <div className="w-full max-w-[1280px] mx-auto rounded-[16px] flex flex-col items-center gap-10">
            {/* Title */}
            <h2 className="text-[#3D3C42] dark:text-white text-[28px] md:text-[32px] font-bold font-dmSans leading-[100%] text-center">
              Oladayo Akinmokun
            </h2>

            {/* Social Icons + Names */}
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <a
                href="https://linkedin.com/in/oladayoakinmokun"
                target="_blank"
                className="flex items-center gap-2 text-[#3D3C42] hover:opacity-80 dark:text-white"
              >
                <FaLinkedinIn className="text-xl" />
                <span>@oladayoakinmokun</span>
              </a>

              <a
                href="https://instagram.com/oladayoakinmokun"
                target="_blank"
                className="flex items-center gap-2 text-[#3D3C42] hover:opacity-80 dark:text-white"
              >
                <FaInstagram className="text-xl" />
                <span>@oladayoakinmokun</span>
              </a>

              <a
                href="https://youtube.com/@oladayoakinmokun"
                target="_blank"
                className="flex items-center gap-2 text-[#3D3C42] hover:opacity-80 dark:text-white"
              >
                <FaYoutube className="text-xl" />
                <span>@oladayoakinmokun</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-[#3D3C42] text-center dark:text-[#E0E0E0]">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Contact</a>
              <a href="#" className="hover:underline">Blog</a>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full max-w-md mx-auto flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white"
              />
              <button className="text-white bg-[#3D3C42] hover:bg-[#3F2E3E] p-2 rounded-full transition-all">
                <FiSend className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 dark:bg-white/30" />

            {/* Copyright */}
            <div className="flex flex-col items-center text-sm text-black dark:text-[#E0E0E0] gap-2 text-center">
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

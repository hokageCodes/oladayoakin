'use client';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Container from '../Container';

const Footer = () => {
  return (
    <footer className="px-2 py-10 md:my-2 dark:bg-black dark:border-t border-white/10">
      <Container>
        <div className="border border-black dark:bg-[#C2C2C240]/25 dark:border-white rounded-[16px] p-6 md:p-8 flex flex-col items-center gap-10">
        <div className="w-full max-w-[1280px] mx-auto border border-white rounded-[16px] p-6 md:p-8 flex flex-col items-center gap-10">
        {/* Title */}
        <h2 className="text-[#3D3C42] dark:text-white text-[28px] md:text-[32px] font-bold font-dmSans leading-[100%] text-center">
          Oladayo Akinmokun
        </h2>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center items-center ">
          <FaLinkedinIn className="text-[#3D3C42] text-xl cursor-pointer hover:opacity-80 dark:text-white" />
          <FaInstagram className="text-[#3D3C42] text-xl cursor-pointer hover:opacity-80 dark:text-white" />
          {/* <FaFacebookF className="text-[#3D3C42] text-xl cursor-pointer hover:opacity-80" />
          <FaTwitter className="text-[#3D3C42] text-xl cursor-pointer hover:opacity-80" /> */}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-[#3D3C42] text-center dark:text-[#E0E0E0]">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Blog</a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300" />

        {/* Copyright */}
        <div className="flex flex-col items-center text-sm text-black dark:text-[#E0E0E0] gap-2 text-center">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          {/* <p>Privacy Policy · Terms of Service</p> */}
        </div>
      </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;


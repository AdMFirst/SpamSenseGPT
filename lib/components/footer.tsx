import Link from "next/link";
import React from "react";
import 'tailwindcss/tailwind.css';
import { Ysabeau } from "next/font/google"

const fontY = Ysabeau({subsets: ['latin']});

const Footer = () => {
    return (
        <div className="bg-[#465E68]">
            <footer className="text-gray-100 body-font md:text-xs">
                <br />
                <a className="flex items-center md: justify-center text-gray-100">
                    <h1 className={"text-2xl "+ fontY.className}> SpamSenseGPT</h1>
                </a>

                <div className="container p-5 mx-auto">
                    <div className="flex flex-wrap md:justify-center text-center -mb-10 -mx-4">
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">Sitemap</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/"} className=" hover:text-blue-900">Home</Link>
                                </li>
                                <li>
                                    <Link href={"/about"} className="hover:text-blue-900">About Us</Link>
                                </li>
                                <li>
                                    <Link href={"/pricing"} className="hover:text-blue-900">Pricing</Link>
                                </li>
                                <li>
                                    <Link href={"/blog"} className="hover:text-blue-900">Blog</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">Usefull links</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/blog/privacypolicy"} className=" hover:text-blue-900">Privacy & Policy</Link>
                                </li>
                                <li>
                                    <Link href={"/blog/termsofuse"} className=" hover:text-blue-900">Terms of Us</Link>
                                </li>
                                <li>
                                    <Link href={"#"} className=" hover:text-blue-900">User Manual</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">Our other project</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"#"} className=" hover:text-blue-900">Swift E-Learning</Link>
                                </li>
                                <li>
                                    <Link href={"#"} className=" hover:text-blue-900">Lapak</Link>
                                </li>
                                <li>
                                    <Link href={"#"} className=" hover:text-blue-900">Green Guide</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">Social Media</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"https://www.instagram.com/aditya_m4rd1/"} className=" hover:text-blue-900">IG Adit</Link>
                                </li>
                                <li>
                                    <Link href="https://instagram.com/jahfal.m" className=" hover:text-blue-900">IG Jahfal</Link>
                                </li>
                                <li>
                                    <Link href={"https://www.instagram.com/habib_mi_"} className=" hover:text-blue-900">IG Habib</Link>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col items-center md:justify center">
                        <p className="text-gray-500 text-sm text-center">Copyright © SpamSenseGPT GNU General Public License v3.0</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer

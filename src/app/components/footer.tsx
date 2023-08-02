import Link from "next/link";
import React from "react";
import 'tailwindcss/tailwind.css';

const Footer = () => {
    return (
        <div className="bg-465E68">
            <footer className="text-gray-600 body-font">
                <br />
                <a className="flex title-font font-medium items-center md: justify-center text-gray-900">
                    <span className="w-56 text-center text-gray-50 text-2xl font-normal">SpamSenseGPT</span>
                </a>

                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap md:justify-center text-center -mb-10 -mx-4">
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Sitemap</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/#home"} className=" hover:text-blue-900">Home</Link>
                                </li>
                                <li>
                                    <Link href={"/#about"} className=" hover:text-blue-900">About Us</Link>
                                </li>
                                <li>
                                    <Link href={"/#pricing"} className=" hover:text-blue-900">Pricing</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Usefull links</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/#home"} className=" hover:text-blue-900">Privacy & Policy</Link>
                                </li>
                                <li>
                                    <Link href={"/#about"} className=" hover:text-blue-900">Terms of Us</Link>
                                </li>
                                <li>
                                    <Link href={"/#pricing"} className=" hover:text-blue-900">User Manual</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Our other project</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/#home"} className=" hover:text-blue-900">Swoft E-Learning</Link>
                                </li>
                                <li>
                                    <Link href={"/#about"} className=" hover:text-blue-900">Lapak</Link>
                                </li>
                                <li>
                                    <Link href={"/#pricing"} className=" hover:text-blue-900">Green Guide</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Social Media</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/#home"} className=" hover:text-blue-900">IG Adit</Link>
                                </li>
                                <li>
                                    <Link href="https://instagram.com/jahfal.m" className=" hover:text-blue-900">IG Jahfal</Link>
                                </li>
                                <li>
                                    <Link href={"/#pricing"} className=" hover:text-blue-900">IG Habib</Link>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col items-center md:justify center">
                        <p className="text-gray-500 text-sm text-center">Copyright © SpamSenseGPT All Rights Reserved. 2023</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer
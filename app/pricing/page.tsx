'use client';

import type { Metadata } from "next";
import React, { useState } from "react";

export const metadata: Metadata = {
    title: 'Harga',
    description: 'Pilih paket token SpamSenseGPT untuk mendeteksi pesan spam dengan cepat.',
    alternates: {
        canonical: '/pricing',
    },
};

const Pricing = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSelectPlan = () => {
        setShowModal(true);
    };

    return (
        <div className="bg-gray-100 relative">
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 pb-24 pt-12 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Pilihan harga terjangkau untuk lanjut lindungi harimu.</p>
                    </div>
                    <div className="md: justify-center flex flex-wrap -m-4">
                        <div className="p-6 xl:w-1/4 md:w-1/2 w-full ">
                            <div className="bg-white h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Silver</h2>
                                <h1 className="text-3xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                    <span>Rp 75000</span>
                                </h1>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>5 Token
                                </p>
                                <button
                                    className="md: justify-center flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    onClick={handleSelectPlan}
                                >
                                    Pilih
                                </button>
                            </div>
                        </div>
                        <div className="p-6 xl:w-1/4 md:w-1/2 w-full">
                            <div className="bg-white h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                            <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Gold</h2>
                                <h1 className="text-3xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                    <span>Rp 100000</span>
                                </h1>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>10 Token
                                </p>
                                <button
                                    className="md: justify-center flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    onClick={handleSelectPlan}
                                >
                                    Pilih
                                </button>
                            </div>
                        </div>
                        <div className="p-6 xl:w-1/4 md:w-1/2 w-full">
                            <div className="bg-white h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Spesial</h2>
                                <h1 className="text-3xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                    <span>Rp 150000</span>
                                </h1>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>30 Token
                                </p>
                                <button
                                    className="md: justify-center flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    onClick={handleSelectPlan}
                                >
                                    Pilih
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 relative">
                        <button
                            aria-label="Tutup"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            x
                        </button>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pembayaran Manual</h3>
                        <p className="text-gray-600 mb-4">
                            Integrasi payment gateway masih dalam proses. Untuk sementara, lakukan pembayaran manual dan sertakan ID Pengguna kamu agar verifikasi cepat.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
                            <p className="text-sm text-gray-700 font-medium">Cara cepat:</p>
                            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 mt-2">
                                <li>Buka salah satu tombol dukungan di bawah.</li>
                                <li>Masukkan nominal sesuai paket yang dipilih.</li>
                                <li>Tulis "ID Pengguna: &lt;ID Kamu&gt;" di catatan pembayaran.</li>
                            </ol>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <a
                                href="https://trakteer.id/AdMFirst/tip"
                                target="_blank"
                                rel="noreferrer"
                                className="text-center w-full inline-flex justify-center items-center px-4 py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
                                onClick={() => setShowModal(false)}
                            >
                                Buka Trakteer
                            </a>
                            <a
                                href="https://sociabuzz.com/admfirst/tribe"
                                target="_blank"
                                rel="noreferrer"
                                className="text-center w-full inline-flex justify-center items-center px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                onClick={() => setShowModal(false)}
                            >
                                Buka Sociabuzz
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Pricing

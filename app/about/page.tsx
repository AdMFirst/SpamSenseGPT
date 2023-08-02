import React from 'react'
import 'tailwindcss/tailwind.css';
import '../globals.css'

export default function about() {
  return (
    <>
      
    <center>
      <h1 className='font-bold text-[25px] md:text-[39px] underline underline-offset-8'>About Us</h1>
      <img src="icon-512x512.png" alt="logo" className="m-5 w-40 md:w-max"/>
    </center>
    <div className='text-base md:text-2xl px-9 md:px-28 text-justify'>
      <p className='py-3 md:py-5'>Selamat datang di era baru dalam keamanan digital! Dengan bangga kami persembahkan SpamSenseGPT, aplikasi deteksi spam berbasis AI yang canggih dan dapat diandalkan. Terinspirasi oleh semangat inovasi, kami berkomitmen untuk memberikan perlindungan tanpa batas dari ancaman spam kepada Anda dan seluruh pengguna di Indonesia.</p>
      <p className='py-3 md:py-5'>SpamSenseGPT bukan hanya sekadar aplikasi biasa. Ini adalah jawaban kami atas seruan untuk melindungi dunia digital kita dari kehadiran mengganggu spam. Dengan teknologi AI yang inovatif, kami memastikan setiap email, pesan, dan komunikasi digital Anda bebas dari pesan-pesan spam yang mengacaukan.</p>
      <p className='py-3 md:py-5'>Kemampuan deteksi otomatis kami didukung oleh sistem AI yang pintar, memungkinkan SpamSenseGPT untuk secara cerdas memilah dan menyaring spam dengan tepat sasaran. Pesan penting Anda tetap tidak terpengaruh, sementara spam akan diatasi dengan cepat dan efisien.</p>
      <p className='py-3 md:py-5'>Keamanan data pengguna adalah prioritas utama kami. Dengan menggunakan teknologi terdepan dalam perlindungan data, Anda dapat yakin bahwa informasi pribadi Anda tetap aman dan terjaga kerahasiaannya.</p>
      <p className='text-lg md:text-3xl'>Founder:</p>
      <div className='pl-5'>
        <p>1. Habib Muhammad Irsyad</p>
        <p>2. Aditya Mardi Pratama</p>
        <p>3. Jahfal Mudrik Ramadhan</p>
      </div>
    </div>
    </>
  )
}

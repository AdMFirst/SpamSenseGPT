
import { Ysabeau } from "next/font/google"

const fontY = Ysabeau({subsets: ['latin']});

const Footer:React.FC = () => {
    return (
        <center>
            <footer className="px-5 py-4 bg-blue-300">
                <h1 className={"text-2xl "+ fontY.className}> SpamSenseGPT</h1>

                <div className="grid grid-cols-4 gap-4 mt-4">
                <a href="#" className="text-xs md:text-base font-bold">Sitemap</a>
                <a href="#" className="text-xs md:text-base font-bold">Useful link</a>
                <a href="#" className="text-xs md:text-base font-bold">Our Other Project</a>
                <a href="#" className="text-xs md:text-base font-bold">Social Media</a>
                <a href="/" className="text-xs md:text-base">Home</a>
                <a href="/blog/privacypolicy" className="text-xs md:text-base">Privacy & Policy</a>
                <a href="/" className="text-xs md:text-base">Swift E-Learning</a>
                <a href="/" className="text-xs md:text-base">IG Habib</a>
                <a href="/" className="text-xs md:text-base">About Us</a>
                <a href="/blog/termsofuse" className="text-xs md:text-base">Term of Use</a>
                <a href="/" className="text-xs md:text-base">LAPAK</a>
                <a href="/" className="text-xs md:text-base">IG Adit</a>
                <a href="/" className="text-xs md:text-base">Pricing</a>
                <a href="/" className="text-xs md:text-base">User Manual</a>
                <a href="/" className="text-xs md:text-base">GREEN GUIDE</a>
                <a href="/" className="text-xs md:text-base">IG Jahfal</a>
                </div>

                <p className='pt-7'>Copyright © SpamSenseGPT All Right Reversed. 2023</p>
            </footer> 
        </center>
    )
}

export default Footer

export default function blog() {
    //const pages = await glob('pages/**/*.js', { cwd: __dirname })

    const articleMaker = (title: string, body:string, link: string, days: Date) => {
        const difference = (Date.now()- +days.getTime()) / 86400000;
        return (
        <article className="p-6 bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                    Article
                </span>
                <span className="text-sm">{Math.round(difference)} days ago</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href={link}>{title}</a></h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{body}</p>
            <div className="flex justify-between items-center">
                
                <a href={link} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </article> 
        )
    }

    return(
        <div>
            <section className="bg-gray-200">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-8 mb-4 ">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Empowering Your Inbox with AI: Unveil the latest spam-combat technologies and strategies on our blog. Safeguard your digital space and bid farewell to spam with expert insights and AI-powered solutions</p>
                    </div> 
                    <div className="grid gap-8 lg:grid-cols-2">
                        {articleMaker("Privacy Policy for SpamSenseGPT", "Version 1.0 \
At SpamSenseGPT, accessible from spam-sense-gpt.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SpamSenseGPT and how we use it. \
If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us", "/blog/privacypolicy", new Date("2023-08-02T12:01:04.753Z"))}
                        {articleMaker("Website Terms of Use", "Version 1.0 The SpamSenseGPT website located at spam-sense-gpt.vercel.app is a copyrighted work belonging to SpamSenseGPT. Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features.\
All such additional terms, guidelines, and rules are incorporated by reference into these Terms...", "/blog/termsofuse", new Date("2023-08-02T12:01:04.753Z") )}
                    </div>  
                </div>
            </section>
        </div>
    )
}
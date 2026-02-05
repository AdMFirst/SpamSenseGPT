"use client"
import React, { useState, useEffect, ChangeEvent, ReactNode } from 'react';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';

import { GridLoader, BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface User {
    uuid: string;
    token: number;
    metadata: {
        time: string;
        url: string;
        ip: string;
        ua: {
            browser: { name: string; version: string };
            os: { name: string; version: string };
            device: { vendor: string; model: string };
            engine: { name: string; version: string };
        };
        geo: {
            city?: string;
            country?: string;
            countryCode?: string;
            region?: string;
            regionCode?: string;
            isEU?: boolean;
            latitude?: number;
            longitude?: number;
            timezone?: string;
        } | null;
    };
}

interface GPTResponse {
    probability: number;
    reasoning: string;
}

interface ErrorAlert {
    on: boolean;
    error: string;
}

const GPTResult = ({ result }: { result: GPTResponse | null }) => {
    if (!result) return null;

    let borderClass = 'border-4 rounded-lg ';
    let pathColor = 'rgb(107 114 128)';

    if (result.probability >= 0 && result.probability < 30) {
        borderClass += 'border-green-500';
        pathColor = 'rgb(34 197 94)';
    } else if (result.probability >= 30 && result.probability < 60) {
        borderClass += 'border-yellow-500';
        pathColor = 'rgb(234 179 8)';
    } else if (result.probability >= 60) {
        borderClass += 'border-red-500';
        pathColor = 'rgb(239 68 68)';
    } else {
        borderClass += 'border-gray-500';
    }

    return (
        <div className='flex py-2 px-4 max-w-3xl md:flex-row flex-col-reverse justify-center items-center'>
            <div className={"basis-3/4 p-4 " + borderClass}>
                <p>
                    {result.reasoning}
                </p>
            </div>
            <div className='basis-1/4 p-4 xl:max-w-none' style={{ maxWidth: "50%" }}>
                <CircularProgressbar
                    value={result.probability}
                    text={`${result.probability}%`}
                    styles={buildStyles({
                        pathColor: pathColor,
                        textColor: '#000000'
                    })}
                />
            </div>
        </div>
    );
};

type PageStatus = 'loading' | 'ready' | 'empty' | 'error';

type ThumbmarkMeta = {
    thumbmark?: string;
    visitorId?: string;
    requestId?: string;
    confidence?: unknown;
    components?: unknown;
    version?: string;
    raw?: unknown;
} | null;

export default function Profile() {
    const [data, setData] = useState<User | null>(null)
    const [pageStatus, setPageStatus] = useState<PageStatus>('loading')
    const [isPesanLoading, setPesanLoading] = useState(false);
    const [isiBoxPesan, setIsiBoxPesan] = useState('');
    const [hasilGPT, setHasilGPT] = useState<GPTResponse | null>(null);
    const [maxLength, setMaxLength] = useState(500)
    const [thumbmarkMeta, setThumbmarkMeta] = useState<ThumbmarkMeta>(null)
    const [errorAlert, setErrorAlert] = useState<ErrorAlert>({on: false, error: 'looks like something is wrong'})


    const sanitizeThumbmark = (result: any): ThumbmarkMeta => {
        if (!result || typeof result !== 'object') return null;
        return {
            thumbmark: result.thumbmark,
            visitorId: result.visitorId,
            requestId: result.requestId,
            confidence: result.confidence,
            components: result.components,
            version: result.version,
            raw: undefined // avoid storing massive raw objects
        };
    }

    const setFp = async () => {
        const cachedId = typeof window !== 'undefined'
            ? window.localStorage.getItem('thumbmark_visitor_id')
            : null;

        const apiKey = process.env.NEXT_PUBLIC_THUMBMARK_API_KEY;
        const tm = apiKey ? new Thumbmark({ api_key: apiKey }) : new Thumbmark();
        const result = await tm.get();
        const sanitized = sanitizeThumbmark(result);

        // Prefer visitorId when API key is present (server-side components enabled), fallback to thumbmark hash.
        const id = (apiKey && (result as any).visitorId) ? (result as any).visitorId : result.thumbmark || cachedId;
        return { id, meta: sanitized };
    };

    const sendForm = async (id: string, meta?: ThumbmarkMeta) => {
        const formData = new URLSearchParams();
        formData.append("uuid", id);
        const metaToSend = meta ?? thumbmarkMeta;
        if (metaToSend) {
            formData.append("thumbmeta", JSON.stringify(metaToSend));
        }

        fetch('/api/daftar', {
            method: "POST",
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formData.toString()
        })
        .then(async (res) => {
            var result = await res.json();
            if(res.status != 201 && res.status != 200){
                throw result
            }
            return result
        })
        .then((data) => {
            setData(data.user);
            setPageStatus('ready');
        })
        .catch((error) => {
            console.warn(error);
            setPageStatus('error')

            if(error.message){
                setErrorAlert({on:true, error:error.message})
            } else {
                setErrorAlert({on:true, error:JSON.stringify(error)})
            }  
        });
    }

    const handleChangeBoxPesan = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= maxLength) {
            setIsiBoxPesan(e.target.value);
        }
        
    }

    const handleClickPasteButton = async () => {
        try {
            const clipboardText = (await navigator.clipboard.readText()).slice(0, maxLength);
            setIsiBoxPesan(clipboardText);
        } catch (error) {
            console.error('Failed to read clipboard data:', error);
        }
    }

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        (async () => {
            setPesanLoading(true);
            const formData = new FormData(event.currentTarget);

            try {
                const response = await fetch("/api/cekpesan", {
                    method: "POST",
                    body: formData
                });
                
                const jsonBody = await response.json();
                
                if (!response.ok) {
                    throw new Error(jsonBody.message || 'Failed to check message');
                }
                
                setHasilGPT(jsonBody.payload);
                setData(jsonBody.user);
                setPesanLoading(false);
            } catch (error) {
                console.error(error);
                setPesanLoading(false);
                const err = error as Error;
                setErrorAlert({on: true, error: err.message || 'An unknown error occurred'});
            }
        })();
    }

    useEffect(() => {
        setPageStatus('loading');
        setHasilGPT(null);
        setFp()
        .then(({id, meta}) => {
            setThumbmarkMeta(meta);
            sendForm(id, meta);
        })
        .catch((err) => {
            console.error('Failed to get fingerprint:', err);
            setErrorAlert({on: true, error: 'Failed to get user fingerprint'});
            setPageStatus('error');
        });
    }, []);

    const renderShell = (body: ReactNode) => (
        <div className="min-h-screen bg-gradient-to-b to-gray-200 from-white">
            <main className="relative flex flex-col justify-center items-center pb-16">
                {body}
            </main>
        </div>
    );

    if (pageStatus === 'loading') {
        return renderShell(
            <div className="flex flex-col items-center justify-center h-screen">
                <GridLoader size={20} color="#5FCFFF" />
                <p className="mt-4 text-gray-500">Menyiapkan profil anda...</p>
            </div>
        );
    }

    if (pageStatus === 'error') {
        return renderShell(
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-lg font-semibold text-red-600">Gagal memuat profil</p>
                <p className="text-gray-500 mt-2">Silakan muat ulang halaman atau coba lagi.</p>
            </div>
        );
    }

    if (!data) {
        return renderShell(
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-lg font-semibold text-gray-700">Tidak ada data profil</p>
                <p className="text-gray-500 mt-2">Mulai dengan mengetik pesan untuk mendeteksi spam.</p>
            </div>
        );
    }

    return renderShell(
        <>
            <div id="title" className='pb-2 pt-6 px-4'>
                <h1>Deteksi Pesan Spam Dengan Teknologi AI</h1>
            </div>
            <div id="frame4-form" className='py-2 px-4'>
                <form onSubmit={handleSubmit}>
                    <div className='relative'>
                        <div className='absolute bottom-0 right-0'>
                            <p className='p-2 select-none text-gray-400'>{isiBoxPesan.length}/{maxLength}</p>
                        </div>
                        <textarea
                            value={isiBoxPesan}
                            onChange={handleChangeBoxPesan}
                            maxLength={maxLength}
                            rows={10}
                            cols={100}
                            name='pesan'
                            id="pesan"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:border-blue-500"
                            placeholder='Ketik atau tempel pesan anda disini untuk mulai mendeteksi pesan anda'
                            required
                        />
                        <input type="hidden" name="uuid" id="uuid" value={data.uuid} />
                    </div>
                    <div className='pt-4 flex flex-row justify-center items-center'>
                        <button type="button" onClick={()=> {setIsiBoxPesan('')}} className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Bersihkan
                        </button>
                        <button type="button" onClick={handleClickPasteButton} className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Tempel
                        </button>
                        <button type='submit' className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Deteksi
                        </button>
                    </div>
                    <div className='pt-1 flex flex-col justify-center items-center'>
                        <p className='text-gray-400'>Token tersisa: {data.token} </p>
                        <p className='text-sm text-gray-400 text-center'>id pengguna anda: {data.uuid}</p>
                    </div>
                </form>
            </div>
            <div id="etc" className='w-[60%]'>
                <BarLoader color="#5FCFFF" loading={isPesanLoading} cssOverride={{width:'100%'}} />
                {
                    errorAlert.on?
                    (
                        <div className="m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">OH NO!</strong> <br/>
                            <span className="block sm:inline">{errorAlert.error}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setErrorAlert({on:false, error:''})}>
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </span>
                        </div>
                    ) : <></>
                }
            </div>
            <GPTResult result={hasilGPT} />
        </>
    )
}

"use client"
import { useState, useEffect, FormEvent, ChangeEvent, useCallback } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Image from 'next/image';
import { ScaleLoader, BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";


 
export default function Profile() {
    const [data, setData] = useState(Object)
    const [isLoading, setLoading] = useState(false)
    const [isPesanLoading, setPesanLoading] = useState(false);
    const [isiBoxPesan, setIsiBoxPesan] = useState('');
    const [hasilGPT, setHasilGPT] = useState(Object);
    const [maxLength, setMaxLenght] = useState(500)
    const [errorAlert, setErrorAlert] = useState({on: false, error: 'looks like something is wrong'})


    const setFp = async () => {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        return visitorId
    };

    const sendForm = async (id: string) => {
        const formData = new URLSearchParams();
        formData.append("uuid", id);

        fetch('/api/daftar', {
            method: "POST",
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formData.toString()
        })
        .then(async (res) => {
            var result = await res.text();
            if(res.status != 201 && res.status != 409){
                throw result
            }
            return JSON.parse(result)
        })
        .then((data) => {
            setData(data.user);
            console.log(data);
            sessionStorage.setItem("userid", id);
            setLoading(false);
        })
        .catch((error) => {
            console.warn(error);
            sessionStorage.clear();
            setLoading(false)
            try {
                var errorJson = JSON.parse(error);
                if(errorJson.message){
                    setErrorAlert({on:true, error:errorJson.message})

                } else {
                    throw "";
                }
            } catch {
                setErrorAlert({on:true, error:error.toString()})
            }
        });
    }

    const displayGPTResult = () => {
        if (hasilGPT !== null){
            var borderClass = 'border-4 rounded-lg ';
            var pathColor = 'rgb(107 114 128)'
            if (hasilGPT.probability >= 0 && hasilGPT.probability < 30){
                borderClass = borderClass + "border-green-500";
                pathColor = 'rgb(34 197 94)'
            } else if (hasilGPT.probability >= 30 && hasilGPT.probability < 60) {
                borderClass = borderClass + "border-yellow-500";
                pathColor = 'rgb(234 179 8)'
            } else if (hasilGPT.probability >= 60) {
                borderClass = borderClass + "border-red-500";
                pathColor = 'rgb(239 68 68)'
            } else {
                borderClass = borderClass + "border-gray-500";
            }
            return <div className='flex py-2 px-4 max-w-3xl md:flex-row flex-col-reverse justify-center items-center'>
                <div className={"basis-3/4 p-4 "+ borderClass}>
                    <p>
                        {hasilGPT.reasoning}
                    </p>
                </div>
                <div className='basis-1/4 p-4 xl:max-w-none' style={{maxWidth:"50%"}}>
                    <CircularProgressbar 
                        value={hasilGPT.probability} 
                        text={`${hasilGPT.probability}%`} 
                        styles={buildStyles({
                            pathColor: pathColor,
                            textColor: '#000000'
                        })}
                    />
                </div>
            </div>
        } else {
            return <></>
        }
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

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setPesanLoading(true)
        console.log(event.currentTarget);
        const formData = new FormData(event.currentTarget)
        console.log(formData.get('pesan'))

        fetch("/api/cekpesan", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            if (!response.ok){
                throw response.text()
            }
            return await response.json()
        })
        .then((jsonBody) => {
            console.log(jsonBody);
            setHasilGPT(jsonBody.payload);
            setData(jsonBody.user)
            setPesanLoading(false)
        })
        .catch(async(error) => {
            console.error(error);
            setPesanLoading(false)
            await error
            setErrorAlert({on:true, error:JSON.stringify(error)})
        })
        
    }

    useEffect(() => {
        setLoading(true);
        setHasilGPT(null);
        const localUUID = sessionStorage.getItem("userid");
        
        if (localUUID){
            sendForm(localUUID)
        } else {
            setFp()
            .then((id) => {
                sendForm(id)
            })
        }
    }, [])

    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);
 
    if (isLoading) return <div className="h-screen">
        <div className="flex justify-center items-center h-full">
            <ScaleLoader color="#5FCFFF"  />
        </div>
    </div>
    
    if (!data) return <p>No profile data</p>
    
    return (
        <div> 
            {process.env.APRILMOP=="true"? <Particles  url='/particles.json' id="tsparticles" init={particlesInit} loaded={particlesLoaded}/>:<></>}    

            <main className='relative z-10 flex flex-col justify-center items-center'>
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
                        <div className='pt-1 flex flex-row justify-center items-center'>
                            <p className='text-gray-400'>Token tersisa: {data.token} </p>
                        </div>
                    </form>
                </div>
                <div id="etc" className='w-[60%]'>
                    <BarLoader color="#5FCFFF" loading={isPesanLoading} cssOverride={{width:'100%'}} />
                    {
                        errorAlert.on?
                        (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">OH NO!</strong> <br/>
                                <span className="block sm:inline">{errorAlert.error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setErrorAlert({on:false, error:''})}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                </span>
                            </div>
                        ) : <></>
                    }
                </div>
                {displayGPTResult()}
                <div id='Footer'>
                    <p>id pengguna anda: {data.uuid}</p>
                </div>
                
            </main>
            
        </div>
    )
}
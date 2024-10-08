"use client"
import { useState, useEffect, FormEvent, ChangeEvent, useCallback } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { GridLoader, BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



 
export default function Profile() {
    const [data, setData] = useState(Object)
    const [isLoading, setLoading] = useState(true)
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
            var result = await res.json();
            if(res.status != 201 && res.status != 200){
                throw result
            }
            return result
        })
        .then((data) => {
            setData(data.user);
            //console.log(data);
            sessionStorage.setItem("userid", id);
            setLoading(false);
        })
        .catch((error) => {
            console.warn(error);
            sessionStorage.clear();
            setLoading(false)

            if(error.message){
                setErrorAlert({on:true, error:error.message})
            } else {
                setErrorAlert({on:true, error:JSON.stringify(error)})
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
        //console.log(event.currentTarget);
        const formData = new FormData(event.currentTarget)
        //console.log(formData.get('pesan'))

        fetch("/api/cekpesan", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            if (!response.ok){
                throw await response.json()
            }
            return ( await response.json() )
        })
        .then((jsonBody) => {
            //console.log(jsonBody);
            setHasilGPT(jsonBody.payload);
            setData(jsonBody.user)
            setPesanLoading(false)
        })
        .catch((error) => {
            //var errorObject = JSON.parse(error);
            console.error(error);
            setPesanLoading(false)
            setErrorAlert({on:true, error:error.message })
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
 
    if (isLoading) return <div className="h-screen">
        <div className="flex justify-center items-center h-full">
            <GridLoader size={20} color="#5FCFFF"  />
        </div>
    </div>
    
    if (!data) return <p>No profile data</p>
    
    return (
        <div>  

            <main className='bg-gradient-to-b to-gray-200 from-white relative flex flex-col justify-center items-center pb-16'>
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
                {displayGPTResult()}
                
            </main>
        </div>
    )
}
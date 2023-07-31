"use client"
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Image from 'next/image';
import { ScaleLoader, BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


 
export default function Profile() {
    const [data, setData] = useState(Object)
    const [isLoading, setLoading] = useState(false)
    const [isPesanLoading, setPesanLoading] = useState(false);
    const [isiBoxPesan, setIsiBoxPesan] = useState('');
    const [hasilGPT, setHasilGPT] = useState(Object);


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
                    alert(errorJson.message);
                } else {
                    throw "";
                }
            } catch {
                alert(error);
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
        setIsiBoxPesan(e.target.value);
    }

    const handleClickPasteButton = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
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
        .catch((error) => {
            console.error(error);
            setPesanLoading(false)
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
            <ScaleLoader color="#5FCFFF"  />
        </div>
    </div>
    
    if (!data) return <p>No profile data</p>
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <div id="title" className='pb-2 pt-6 px-4'>
                <h1>Deteksi Pesan Spam Dengan Teknologi AI</h1>
            </div>
            <div id="frame4-form" className='py-2 px-4'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea
                            value={isiBoxPesan}
                            onChange={handleChangeBoxPesan}
                            maxLength={500}
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
                            Clear
                        </button>
                        <button type="button" onClick={handleClickPasteButton} className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Paste
                        </button>
                        <button type='submit' className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Submit <br/>
                        </button>
                    </div>
                    <div className='pt-1 flex flex-row justify-center items-center'>
                        <p className='text-gray-400'>Token tersisa: {data.token} </p>
                    </div>
                </form>
            </div>
            <div id="loading bar" className='w-[75%]'>
                <BarLoader color="#5FCFFF" loading={isPesanLoading} cssOverride={{width:'100%'}} />
            </div>
            {displayGPTResult()}
            <div id='Footer'>
                <p>your user id: {data.uuid}</p>
            </div>
            
        </div>
    )
}
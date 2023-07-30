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
            var borderClass = 'flex-shrink-1 p-4 border-4 rounded-lg ';
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
            return <div className='flex p-4'>
                <div className={borderClass}>
                    <p>
                        {hasilGPT.reasoning}
                    </p>
                </div>
                <div className='flex-shrink-1 p-4'>
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
            <ScaleLoader color="#36d7b7" />
        </div>
    </div>
    
    if (!data) return <p>No profile data</p>
    
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <h1>Welcome!</h1>
            <h3>Token tersisa: {data.token}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={isiBoxPesan}
                    onChange={handleChangeBoxPesan}
                    maxLength={500}
                    rows={5}
                    cols={40}
                    name='pesan'
                    id="pesan"
                /><br/>
                <input type="hidden" name="uuid" id="uuid" value={data.uuid} />
                <button type='submit' className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Submit
                </button>
                <button type="button" onClick={handleClickPasteButton} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Paste
                </button>
                <button type="button" onClick={()=> {setIsiBoxPesan('')}} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Clear
                </button>
            </form>
            <button className="btn btn-blue" onClick={()=>{setPesanLoading(!isPesanLoading)}} >reset loading</button>
            <BarLoader color="#36d7b7" loading={isPesanLoading} cssOverride={{width:'80%'}} />
            
            {displayGPTResult()}
            <p>your user id: {data.uuid}</p>
        </div>
    )
}
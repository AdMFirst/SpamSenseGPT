"use client"
import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

 
export default function Profile() {
    const [data, setData] = useState(Object)
    const [isLoading, setLoading] = useState(false)


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
            if(res.status != 201){
                alert(result)
            }
            return JSON.parse(result)
        })
        .then((data) => {
            setData(id)
            console.log(data)
            setLoading(false)
        })
        .catch((error) => {
            console.warn(error);
            alert(error)
        });
    }

  useEffect(() => {
      setLoading(true);

      setFp()
      .then((id) => {
          sendForm(id)
      })
  }, [])
 
  if (isLoading) return <div className="h-screen">
      <div className="flex justify-center items-center h-full">
          <img className="h-16 w-16" src="https://i.gifer.com/ZKZg.gif" alt="" />
      </div>
  </div>
  
  if (!data) return <p>No profile data</p>
 
  return (
      <div className='flex flex-col justify-center items-center h-full'>
          <h1>Done!</h1>
          <p>your user id: {data.toString()}</p>
      </div>
  )
}
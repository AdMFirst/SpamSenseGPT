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
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            console.log(data)
            setLoading(false)
        })
        .catch((error) => {
            console.warn(error);
        });
    }
 
    useEffect(() => {
        setLoading(true);

        setFp()
        .then((id) => {
            sendForm(id)
        })
    }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      <h1>Done!</h1>
      <p>{data.toString()}</p>
    </div>
  )
}
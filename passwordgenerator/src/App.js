import React, { useState,useCallback,useEffect,useRef } from 'react'
import './index.css'

export default function App() {
    const [length,setLength] = useState(8);
    const [numAllowed,setNumAllowed] = useState(false);
    const[specialAllowed,setSpecialAllowed] = useState(false);
    const[password,setPassword] = useState();

    const PassWordGenerator= useCallback(()=>{
      let pass="";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numAllowed) str+='0123456789';
      if(specialAllowed) str+='~!@#$%^&*()[]{}+-*/_'

      for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }

      setPassword(pass);
       
    },[length,numAllowed,specialAllowed,setPassword])


    const copyToClipBoard = useCallback(()=>{
      window.navigator.clipboard.writeText(password);
      Passwordref.current?.select();
    },[password])

    useEffect(()=>{
       PassWordGenerator();
    },[length,numAllowed,specialAllowed,setPassword])

    const Passwordref = useRef(null);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-4 mx-2'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full px-1 py-3'
        placeholder='Password'
        readOnly
        ref={Passwordref}
        />
        <button onClick={copyToClipBoard} className='outline-none bg-blue-700 text-white  px-3 py-0.5 shrink-0 transition duration-300 hover:bg-blue-900'>
          copy
        </button>
      </div>
      <div className='flex  text-sm gap-x-2'>
         <div className='flex items-center gap-x-1'>
          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{
            setNumAllowed((prev)=> !prev)
          }}
          />
          <label>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={specialAllowed}
          id='charInput'
          onChange={()=>{
            setSpecialAllowed((prev)=> !prev)
          }}
          />
          <label>Characters</label>
         </div>
      </div>
    </div>
  )
}

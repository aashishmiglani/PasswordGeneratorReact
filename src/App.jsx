import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}|,"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const passwordRef = useRef(null)



  const copyToClipboard = useCallback(() => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
    toast("Copied!😊");

  }, [password])

  return (
    <>

      <h1>Password Generator</h1>
      <div className='flex mt-6'>

        <input type="text" ref={passwordRef} className='rounded border-2 p-3 w-full ' placeholder='Password' value={password} />
        <button className='bg-orange-400' onClick={copyToClipboard}>Copy</button>
        <ToastContainer />
      </div>
      <div className='mt-4'>

        <div className='flex gap-3'>
          <input type="checkbox" name="" id="" defaultChecked={charAllowed} onChange={() => {
            setCharAllowed(!charAllowed)
          }} />
          <h6>Charactor</h6>
        </div>
        <div className='flex gap-3'>
          <input type="checkbox" name="" id="" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed(!numberAllowed) }} />
          <h6>Number</h6>
        </div>
        <div className='flex gap-3'>
          <input type="range" name="" id="" min={6} max={40} value={length} onChange={(e) => { setLength(e.target.value); }} />
          <h6>Length : {length}</h6>
        </div>
      </div>
    </>
  )
}

export default App

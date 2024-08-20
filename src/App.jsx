import { useState, useCallback , useEffect, useRef} from 'react'
 
 

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
const passwordRef=useRef(null)
 
const passwordGenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if(charAllowed) str+="@!>&^%$*@}|{}<**??"
if(numberAllowed) str+="0123456789"

for(let i=1;i<=length;i++){
let char=Math.floor(Math.random()*str.length+1)
// console.log(char)
pass+=str.charAt(char)
}
// console.log(passowrd)
setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])
 

const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select()
   
  window.navigator.clipboard.writeText(password)

},[password])


useEffect(()=>{ passwordGenerator()},[length, numberAllowed, charAllowed, passwordGenerator])
 

  return (
    <>
      <div className='w-full  max-w-md mx-auto text-center rounded-lg text-orange-500 bg-gray-700 px-4 my-9' >
      <h1 className='pt-2 font-bold text-xl text-indigo-300 '>Password Generator</h1>
<div className='flex shadow rounded-lg mt-5 pb-7' >
 
 <input type='text' ref={passwordRef} value={password} placeholder='password' className='rounded-lg  outline-none w-full py-1 px-3' />
 <button type="submit"  onClick={copyPasswordToClipBoard} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">copy</button>
</div>

    <div className='text-sm gap-x-2 flex pb-4' > 
    <div className='flex items-center gap-x-1' >
<input type='range' min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer' /><label   >length:{length}</label>

    </div>

    <div className='flex items-center gap-x-1' >
    <input type='checkbox' defaultChecked={numberAllowed}  id="numberInput" onChange={( )=>{ setNumberAllowed((prev)=>!prev)}} className='cursor-pointer' /><label   >Numbers</label>
    <input type='checkbox' defaultChecked={charAllowed}  id="charInput" onChange={( )=>{ setCharAllowed((prev)=>!prev)}} className='cursor-pointer' /><label   >characters</label>
    </div>
    </div>
      </div>
    </>
  )
}

export default App

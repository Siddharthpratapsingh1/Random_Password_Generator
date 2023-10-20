import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [lenght, setLenght] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "012346789"
    if(charAllowed) str += "~`!@#$%^&*(){}[]:;'"

    for (let i = 1; i <= lenght; i++) {
       let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

      setPassword(pass)




  }, [lenght, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)},[password])

  useEffect(() => {
    passwordGenerator()
    },[lenght, numberAllowed, charAllowed, setPassword])
  

  return (
    <>
    <div className="w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-yellow-200">
      <h1 className="text-center my-3 text-black">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly ref={passwordRef}/>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursoir-pointer hover:bg-sky-300" onClick={copyPasswordToClipboard}>Copy</button>

      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={8} max={50} value={lenght} className="cursor-pointer" onChange={(e)=>{setLenght(e.target.value)}}/>
          <label>Lenght: {lenght}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
          <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{setCharAllowed((prev)=> !prev)}} />
          <label htmlFor="characterInput">Characters</label>

        </div>

      </div>
      </div>
    </>
  );
}

export default App;

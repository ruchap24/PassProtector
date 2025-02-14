import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  const[length,setLength] = useState(0);
  const[numberallowed,setNumberAllowed] = useState(false);
  const[charallowed,setCharAllowed] = useState(false);
  const[password,setpassword] = useState("");
  const[copyAlert,setCopyAlert]=useState(false);

   const password_generator = useCallback(()=>{
         let pass='';
         let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

         if(numberallowed) str +='0123456789';

         if(charallowed)  str += "!@#$%^&*()_+-=[]{}~`";

        for(let i=1;i<=length;i++){
          const char = Math.floor(Math.random() * str.length + 1);          
          pass +=str.charAt(char);
        }

        setpassword(pass);

         
   },[length,numberallowed,charallowed]);


   useEffect(()=>{
    password_generator();
   },[length,numberallowed,charallowed,password_generator])
  

  const copyToClipBoard = () => {

    window.navigator.clipboard.writeText(password);
   setCopyAlert(true);
  }


  setTimeout(()=>{
   setCopyAlert(false);
  },10000)

  return (
    <>
    <div className={`w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-black bg-red-600  transition-opacity duration-1000 ease-in-out ${!copyAlert ? 'opacity-0' : 'opacity-100'}`} role="alert">
     <p>Passoword is Copied to Clipboard</p>
    </div> 

      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-orange-500 bg-amber-300">
          <h1 className="text-blue-600 text-center">Random Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly/>
            <button className="outline-none bg-black-400 text-white px-3 py-0.5 hover:bg-lime-400 hover:text-black" onClick={copyToClipBoard}>Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
             <div className="flex items-center gap-x-1">
              <input type="range" min={0} max={100} value={length} className="cursor-pointer"  onChange={(e) =>setLength(e.target.value)} />
              <label htmlFor="length">Length:{length}</label>
             </div>
             <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={numberallowed} id="numberallowed"  onChange={()=>setNumberAllowed((prev) => !prev)} />
              <label htmlFor="numberInput">Numbers</label>
             </div>
             <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={charallowed} id="charallowed"  onChange={()=>setCharAllowed((prev) => !prev)}  />
              <label htmlFor="CharInput">Character</label>
             </div>
          </div>
      </div>    
    </>
  )
}

export default App
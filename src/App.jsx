
import { useState,  useCallback, useEffect,useRef} from "react"


function App() {

  const[length, setLength]= useState(8);
  const[numberAllowed, setNumberAllowed]=useState(true);
  const[charAllowed, setCharAllowed]=useState(true);
  const[password, setPassword]=useState("");

  // useRef Hook:------> When we need to take reference of any stuff then we use useRef.
  const PasswordRef= useRef(null); //---> null because useRef er moddhey amader kache akhin kono reference nei.

  const PasswordGen= useCallback(()=>{
    let pass=""; //to create the generated password
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // this is the string or data that will be used to generate the password
    if(numberAllowed){
      str+="0123456789"; // mane jeta mader existing strings or moddhey 0-9 kichu no.s add kore deoar jonney
    }
    if(charAllowed){
      str+="!@#$%^&*()_~`{}[]+"; //mane jeta mader existing strings or moddhey characters kichu add kore deoar jonney
    }

    for (let i = 0; i <= length; i++) { //iterating the loop for the length(useState er ta) of the password
      let char=Math.floor(Math.random()*str.length + 1); //this creartes a random no. from 0-10 and this random number serves as an index to pick a character from the str
      pass +=str.charAt(char); //We extract the character at that index using str.charAt(char)
    }
    //After the above loop completes, pass contains a random password of the specified length, with characters from the str
    setPassword(pass); //Finally, we set the password in the state
  }, [length, numberAllowed, charAllowed, setPassword]);//Here, we have also gave dependency as setPassword and not password, since the function will always depend on the password that has changed and not the password that is the initial one.

  
  // Here, we are also using useCallback hook because, we make the password copy on clicking
  const PasswordCopyOnClick= useCallback(()=>{
    // this is how we make "copy" anything:----->[NOTE: Remember, this way to copying functionality occurs only occurs only on React. If you wanna do using normal JS then you can't directly select window, there's a way how you do that.]
    PasswordRef.current?.select(); //This selects the text in the input field
    PasswordRef.current?.setSelectionRange(0,25); //This sets the range of the selected text
    window.navigator.clipboard.writeText(password)
  }, [password]);


  // Here we have used useEffect hook because, 
  useEffect(()=>{
    PasswordGen()
  },[length, numberAllowed, charAllowed, PasswordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} placeholder="Password" readOnly ref={PasswordRef} className="outline-none w-full py-1 px-3 text-black"/>
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={PasswordCopyOnClick} >COPY</button>
          
        </div>
        <div className="flex text-sm gap-x-1">
          <div className="flex items-center gap-x-1">
          <input type="range" name="Number" min={5} max={100} value={length} className="cursor-pointer" onChange={(e)=>setLength(e.target.value)}/>
            <label>Length:{length}</label>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="Numbers"  defaultChecked="{numberAllowed}" id="numberInput" onChange={()=>{setNumberAllowed((numberAllowed )=>!numberAllowed)}}/>
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input type="checkbox" name="Character"  defaultChecked="{charAllowed}" id="charInput" onChange={()=>{setCharAllowed((charAllowed )=>!charAllowed)}}/>
          <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
    </>
  )
  // PasswordGen();
}

export default App

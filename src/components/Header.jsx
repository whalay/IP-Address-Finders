
import React from 'react'

import background from "../assets/images/pattern-bg.png";
import arrow from '../assets/images/icon-arrow.svg';


const Header = ({ipData, fetchMoviesHandler, inputText, InputHandler, SubmitHandler, enteredNameIsInValid, nameInputBlurHandler, error}) => {

     
    // const [inputText, setInputText] = useState('');

    // const InputHandler = e =>{
    //     setInputText(e.target.value);
    // }

    
    return (
        <header className='bg-headerbg bg-no-repeat w-full  '>
            <div className="absolute w-full -z-10">
          <img src={background} alt="" className="w-full h-80" />
        </div>
            <div className='flex justify-center flex-col items-center '>
                <h1 className='text-2xl text-white my-5'>IP Address Tracker</h1>

                <form action="" onClick={SubmitHandler} className="p-2 flex" >
                    <input type="text" size="50" placeholder='search for any IP or domain' onBlur={nameInputBlurHandler} onChange={InputHandler} value={inputText} className='p-3 outline-none border rounded-l-2xl ' />
                    {enteredNameIsInValid && <p>IP cannot be empty</p>}
                    <button className='bg-black p-4 rounded-r-2xl text-white'><img src={arrow} alt="" /></button>
                    {error && <p>Put correct address</p>}
                </form>
             {/* <IpDetails ipData={ipData}/> */}
            </div>
        </header>
    )
}

export default Header;
import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import background from "./assets/images/pattern-bg.png"

import Header from './components/Header';
import Markerposition from "./components/Markerposition"


const API_KEY = 'at_2ShgtMJYPDGGiyJWrfZZAxftTkWaj';
const API_URL = 'https://geo.ipify.org/api/v2/country,city?';
const API_ENDPOINT = API_URL + 'apiKey=' + API_KEY + '&ipAddress=';


function App() {

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/


  const [ipAddress, setIpAddress] = useState("");
  const [enteredTextTouched, setEnteredTextTouched] = useState(false);
  const [url, setUrl] = useState(`${API_ENDPOINT}${ipAddress}`);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('')



  // const enteredTextIsValid = inputText.trim() !== '';
  // const enteredTextIsInValid = !enteredTextIsValid && enteredTextTouched;



  // const fetchMoviesHandler = useCallback(async () => {
  // useEffect(() => {
  //   function getInitialData() {

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         const ipData = data;
  //         console.log(data.location.city);
  //         console.log(data.location.country);
  //         // const IParray = Object.values(data).map((myIP) =>{
  //         //   return{
  //         //     ipAddress: myIP.ip,
  //         //     country: myIP.country,
  //         //     timezone: myIP.timezone,
  //         //     isp: myIP.isp
  //         //   }  
  //         // });
  //         setIpData(ipData);
  //         console.log(ipData);
  //         console.log(ipData.location.country);
  //         console.log(ipData.location.region);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //         setError(err.message);
  //       });
  //   };
  // }, [])
  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=8.8.8.8`
        )
        const data = await res.json()
        setAddress(data)
      }

      getInitialData()
    } catch (error) {
      console.trace(error)
    }
  }, [])

  const getEnteredData = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
      // https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=8.8.8.8&domain=google.com
    )
    const data = await res.json()
    setAddress(data)
  }




  // const InputHandler = e => {
  //   setInputText(e.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setEnteredTextTouched(true);
  // };


  const SubmitHandler = e => {
    e.preventDefault();


    console.log(ipAddress);
    console.log(address)
    console.log(address.location.lat);
    getEnteredData();
   setIpAddress("")
  }


  return (
    <>
      <header>
        <div className="absolute w-full -z-10">
          <img src={background} alt="" className="w-full h-80" />
        </div>
        <div className='flex justify-center flex-col items-center '>
          <h1 className='text-2xl text-white my-5'>IP Address Tracker</h1>

          <form
            onSubmit={SubmitHandler}
            autoComplete="off"
            className="w-full flex"
          >
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address or domain"
              className="w-full py-2 px-4 rounded-l-lg"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button type="submit" className="bg-black py-2 px-4 rounded-r-lg">
              search
            </button>
          </form>

        </div>
      </header>
      {address &&
        <>
          <div className='flex bg-white text-black justify-center text-left items-stretch my-7 mx-auto w-[80%] space-x-32 p-5 pb-16 rounded-3xl shadow-2xl z-50'>
            <div >
              <h3>IP ADDRESS</h3>
              <p className='text-3xl font-bold'>{address.ip}</p>
            </div>
            <div>
              <h3>LOCATION</h3>
              <p className='text-3xl font-bold'>{address.location?.region} <span>{address.location?.postalCode}, {address.location?.geonameId}</span></p>
            </div>
            <div>
              <h3>TIMEZONE</h3>
              <p className='text-3xl font-bold'>{address.location?.timezone}</p>
            </div>
            <div>
              <h3>ISP</h3>
              <p className='text-3xl font-bold'>{address.isp}</p>
            </div>
          </div>

          <MapContainer
            center={[address.location?.lat, address.location?.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markerposition address={address} />
          </MapContainer>
        </>
      }

      {/* <Header
        fetchMoviesHandler={getEnteredData}
        SubmitHandler={SubmitHandler}
        ipData={ipData}
        inputText={inputText}
        InputHandler={InputHandler}
        enteredTextIsInValid={enteredTextIsInValid}
        nameInputBlurHandler={nameInputBlurHandler}
        error={error} /> */}


      {/* <MapContainer
        center={[ipData.location?.lat, ipData.location?.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markerposition address={ipData} />
      </MapContainer> */}




    </>
  );
}

export default App;

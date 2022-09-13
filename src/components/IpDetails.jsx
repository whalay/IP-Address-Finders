import React from 'react'

const IpDetails = ({ ipData }) => {
    return (
       
            <div className="bg-white rounded-xl p-8 shadow max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left mt-14 relative lg:-mb-32 z-[9999] w-[90%]">
                <div className="lg:border-r border-slate-400 p-6" >
                    <h3>IP ADDRESS</h3>
                    <p className='text-3xl font-bold'>{ipData.ip}</p>
                </div>
                <div className="lg:border-r border-slate-400 p-6" >
                    <h3>LOCATION</h3>
                    <p className='text-3xl font-bold'>{ipData.location?.region} <span>{ipData.location?.postalCode}, {ipData.location?.geonameId}</span></p>
                </div>
                <div className="lg:border-r border-slate-400 p-6" >
                    <h3>TIMEZONE</h3>
                    <p className='text-3xl font-bold'>{'UTC '}{ipData.location?.timezone}</p>
                </div>
                <div className='p-6'>
                    <h3>ISP</h3>
                    <p className='text-3xl font-bold'>{ipData.isp}</p>
                </div>

            </div>
  
    )
}

export default IpDetails
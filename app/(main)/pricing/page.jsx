
"use client"

import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup'
import React, { useContext } from 'react'


function Pricing() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    return (
        <div className=' w-full p-10 md:px-32 lg:px-48'>
            <div className='flex flex-col items-center '>
                <h2 className='font-bold text-5xl w-full text-center'>Pricing</h2>
                <p className='text-gray-400 max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>
                <div className='mt-4 p-5 border rounded-xl w-[90%] flex justify-between items-center bg-white/6 backdrop-blur-md border-white/20'>
                    <h2 className='text-lg'><span className='font-bold'>{userDetail?.token}</span> Token Left</h2>
                    <div>
                        <h2 className='font-medium'>Need More Token</h2>
                        <p>Upgrade your plan below</p>
                    </div>
                </div>
            </div>
            <PricingModel />
        </div>
    )
}


export default Pricing
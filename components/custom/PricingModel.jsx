
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import Lookup from '@/data/Lookup'
import Image from 'next/image'
import { useSidebar } from '../ui/sidebar'
import { UserDetailContext } from '@/context/UserDetailContext'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

function PricingModel() {
    const { toggleSidebar } = useSidebar();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    // const [selectedOption, setSelectedOption] = useState();
    const updateToken = useMutation(api.users.UpdateToken)

    const onPaymentSuccess = async (pricing) => {
        const token = userDetail?.token + Number(pricing?.value) 
        console.log(token);
        await updateToken({
            token:token,
            userId:userDetail?._id
        });
        
    }

    return (
        <div className='relative w-full'>
            {/* Fixed avatar for sidebar toggle, e.g. bottom left */}
           
            <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full'>
                {Lookup.PRICING_OPTIONS.map((pricing) => (
                    <div key={pricing.name} className='p-7 border rounded-xl flex flex-col gap-3 bg-white/6 hover:bg-white/16  backdrop-blur-md border-white/20'>
                        <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                        <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
                        <p className='text-gray-400'>{pricing.desc}</p>
                        <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>
                        <div style={{ colorScheme: 'none' }} className='mt-3 -ml-2 '>
                            <PayPalButtons 
                                disabled={!userDetail}
                                onApprove={()=>onPaymentSuccess(pricing)}
                                onCancel={() => console.log("payment cancelled")}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units:[
                                            {
                                                amount:{
                                                    value:pricing.price,
                                                    currency_code:"USD"
                                                }
                                            }
                                        ]
                                    })
                                }}
                                style={{tagline:false, layout: "horizontal", borderRadius: 100, color: "gold" }} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingModel

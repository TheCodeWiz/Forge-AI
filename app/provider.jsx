"use client"

import React, { use, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import AppSideBar from '@/components/custom/AppSideBar'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ActionContext } from '@/context/ActionContext'
import { useRouter } from 'next/navigation'


function Provider({children}) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action, setAction] = useState();
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    IsAuthenticated();
  },[])
  
  const IsAuthenticated = async () => {
    if(typeof window !== undefined){
      const user = JSON.parse(localStorage.getItem('users'));
      // fetch from database
      if(!user){
        router.push('/')
        return;
      }
      const result = await convex.query(api.users.GetUser, {
        email: user?.email
      })
      setUserDetail(result);
      console.log(result);
    }
  }

  return (
    <div className='bg-gradient-to-b from-blue-500 via-black to-black h-screen w-screen fixed top-0 left-0 z-50 bg-[#181818] shadow-lg transition-transform'>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <MessagesContext.Provider value={{messages, setMessages}}>
              <ActionContext.Provider value={{action, setAction}}>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                  <Header />
                  <AppSideBar/>
                  {children}
                </NextThemesProvider>
              </ActionContext.Provider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Provider
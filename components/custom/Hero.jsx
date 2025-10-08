"use client"
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Lookup from '@/data/Lookup'
import { ArrowUp, Link } from 'lucide-react'
import React, { useContext } from 'react'
import { useState } from 'react'
import SignInDialog from './SignInDialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'


function Hero() {
    const [userInput, setUserInput] = useState();
    const {messages, setMessages} = useContext(MessagesContext);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();
    const onGenerate = async (input) => {
        if(!userDetail?.name){
            setOpenDialog(true);
            return;
        }
        if(userDetail?.token < 10){
            toast("You don't have enough token to generate!!.. upgrade to pro plans!")
            return 
        }
        const msg = {
            role:'user',
            content: input
        }
        setMessages(msg);
        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages:[msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    return (
        <div className=' flex flex-col w-screen items-center mt-36 xl:mt-40 gap-2'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
            <div className='p-5 rounded-xl max-w-xl w-full mt-3 border border-gray-800 hover:border-blue-700 focus:border-blue-500 transition-colors"'> 
                <div className='flex gap-2'>
                    <textarea 
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    />
                    {
                        userInput && (
                            <ArrowUp 
                            className='bg-blue-500 p-2 h-10 w-10 text-black rounded-md cursor-pointer' 
                            onClick={() => onGenerate(userInput)}/>
                        )
                    }
                </div>
                <div>
                    <Link className='h-5 w-5'/>
                </div>
            </div>
            <div className='flex mt-5 flex-wrap max-w-2xl justify-center items-center gap-3 '>
                {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                    <h2 key={index} onClick={() => onGenerate(suggestion)} className='p-1 px-2 rounded-full text-sm text-gray-400 hover:text-white cursor-pointer  border border-gray-800 hover:border-blue-700 focus:border-blue-500 transition-colors'>{suggestion}</h2>
                ))}
            </div>
            <SignInDialog 
                openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(false)}
            />
        </div>
    )
}

export default Hero
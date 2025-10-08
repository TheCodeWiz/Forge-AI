"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowUp, Link, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useRef, useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';
import { toast } from 'sonner';

export const countToken = (inputText) => {
    return inputText.trim().split(/\s+/).filter(word => word).length;
}

function ChatView() {
    const {id} = useParams();
    const convex = useConvex();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const {messages, setMessages} = useContext(MessagesContext);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);
    const UpdateMessages = useMutation(api.workspace.UpdateMessages);
    const thinkingRef = useRef(null);
    const lastMessageRef = useRef(null);
    const {toggleSidebar} = useSidebar();
    const UpdateTokens = useMutation(api.users.UpdateToken);


    useEffect(() => {
        if (loading && thinkingRef.current) {
            thinkingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loading]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);  // Remove loading here




    useEffect(() => {
        id && GetWorkspaceData();
    }, [id])
    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        setMessages(result?.messages)
        console.log(result);
    }

    useEffect(() => {
        if(messages?.length > 0){
            const role = messages[messages?.length-1].role;
            if(role == 'user'){
                GetAiResponse();
            }
        }
    } , [messages])

    const GetAiResponse = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
        const result = await axios.post('/api/ai-chat', {
            prompt: PROMPT
        });
        const aiResp = {
            role: 'ai',
            content: result.data.result
        }
        setMessages(prev => [...prev, aiResp]);
        await UpdateMessages({
            messages: [...messages, aiResp],
            workspaceId: id
        })
        const usedToken = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
        setUserDetail(prev => ({
            ...prev,
            token: usedToken
        }))
        await UpdateTokens({
            token: usedToken,
            userId: userDetail?._id
        })
        setLoading(false);
    }

    const onGenerate = async (input) => {
        if(userDetail?.token < 10){
            toast("You don't have enough token to generate!!.. upgrade to pro plans!")
            return;
        }
        setMessages(prev => [...prev,{
            role: 'user',
            content: input
        }])
        setUserInput('');
    }


  return (
    <div className='relative h-[85vh] -mt-10 flex flex-col'>
        <div className='flex-1 px-5 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {
                Array.isArray(messages) && messages.map((msg, index) => (
                    msg.role === 'user' ? (
                    // User message with margin-left
                    <div
                        key={index}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className='p-3 rounded-lg mb-2 leading-7 ml-20 -mr-10 shadow-lg bg-white/10 backdrop-blur-md border border-white/20 '
                    >
                        <div className='flex gap-5'>
                        <Image src={userDetail?.picture} alt='userImage' width={35} height={35} className='rounded-full' />
                        <p className='mt-2 text-md'>{userDetail?.name}</p>
                        </div>
                        <div className='flex gap-2 mt-2'>
                        <div className='flex flex-col'>
                            <ReactMarkdown>
                                {`**Prompt:** ${msg.content}`}
                            </ReactMarkdown>
                        </div>
                        </div>
                    </div>
                    ) : (
                    // AI message with margin-right
                    <div
                        key={index}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className='p-3 rounded-lg mb-2 mr-12 leading-7 bg-white/10 backdrop-blur-md border border-white/20 overflow-auto break-words'
                        style={{ wordBreak: "break-word" }}
                    >
                        <div className='flex gap-2 mt-2'>
                            <div className='flex flex-col w-full'>
                                <ReactMarkdown>
                                    {`**Forge AI:** ${msg.content}`}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    )
                ))
            }
            {
                loading && (
                    <div ref={thinkingRef} className='p-3 rounded-lg mb-2 flex gap-2 text-gray-500'>
                        <Loader2Icon className='animate-spin' />
                        <h2>Thinking...</h2>
                    </div>
                )
            }
        </div>
        {/* Input section */}
        <div className='flex gap-2 items-end '>
            {/* {
                userDetail && (
                    <div className='-ml-4'>
                        <Image src={userDetail?.picture} className='rounded-full cursor-pointer ' onClick={toggleSidebar} alt='user' width={30} height={30}/>
                    </div>
                )
            } */}
            <div className='p-5 rounded-xl max-w-xl w-full mt-3 border border-gray-800 hover:border-blue-700 focus:border-blue-500 transition-colors ml-4'> 
                <div className='flex gap-2'>
                    <textarea 
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                        placeholder={Lookup.INPUT2_PLACEHOLDER}
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
        </div>
    </div>
  )
}

export default ChatView
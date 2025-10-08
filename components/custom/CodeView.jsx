"use client"

import React, {useState, useContext, useEffect} from 'react'
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { countToken } from './ChatView';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';


function CodeView() {
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const {messages, setMessages} = useContext(MessagesContext);
  const updateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const {action, setAction} = useContext(ActionContext);


  useEffect(() => {
    id &&GetFiles();
  },[id])

  useEffect(() => {
    setActiveTab('preview')
  },[action])

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id
    });
    const mergedFiles = {...Lookup.DEFAULT_FILE, ...result?.fileData}
    setFiles(mergedFiles);
    setLoading(false);
  }

  useEffect(() => {
    if(messages?.length > 0){
      const role = messages[messages?.length-1].role;
      if(role == 'user'){
        GenerateAiCode();
      }
    }
  } , [messages])

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) +" "+ Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code', {
      prompt:PROMPT
    });
    console.log(result.data);
    const aiResp = result.data;
    console.log("AI returned files:", aiResp?.files);
    const mergedFiles = {...Lookup.DEFAULT_FILE, ...aiResp?.files}
    setFiles(mergedFiles);
    await updateFiles({
      workspaceId: id,
      files: aiResp?.files
    });
    const usedToken = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail(prev => ({
      ...prev,
      token: usedToken
    }))
    await UpdateTokens({
      token: usedToken,
      userId: userDetail?._id
    })
    setActiveTab('code');
    setLoading(false);
  }


  return (
    <div className='relative -mt-10'>
      <div className='bg-[#181818] w-full p-2 border rounded-t-lg'>
        <div className='flex items-center flex-wrap shrink-0 gap-3 bg-black p-1 w-[140px] justify-center rounded-full'>
          <h2 onClick={() => setActiveTab('code')} className={`text-sm cursor-pointer ${activeTab == 'code' && 'text-black font-bold bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}>Code</h2>
          <h2 onClick={() => setActiveTab('preview')} className={`text-sm cursor-pointer ${activeTab == 'preview' && 'text-black font-bold bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full '}`}>Preview</h2>
        </div>
      </div>
      <SandpackProvider 
        files={files}
        template="react"  theme={'dark'}
        customSetup={{
          dependencies:{
            ...Lookup.DEPENDANCY
          }
        }}
        options={{
          externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
        }}
      >
        <SandpackLayout>
          { activeTab == 'code' ? (
            <>
              <SandpackFileExplorer style={{height:'78vh'}} />
              <SandpackCodeEditor style={{height:'78vh'}} />
            </>
          ) : (
            <>
              {/* <SandpackPreview style={{height:'78vh'}} showNavigator={true}/> */}
              <SandpackPreviewClient />
            </>
          )
          }
        </SandpackLayout>
      </SandpackProvider>

      {
        loading && (
          <div className='p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center'>
            <Loader2Icon className='animate-spin h-10 w-10 text-white' />
            <h2 className='text-white'>Generating Code....</h2>
          </div>
        )
      }
    </div>
  )
}

export default CodeView
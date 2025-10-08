"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';

function WorkspaceHistory() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile && setOpenMobile(false);
    } else {
      setOpen && setOpen(false);
    }
  }


  useEffect(() => {
    userDetail && GetAllWorkspace();
  },[userDetail])

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id
    });
    setWorkspaceList(result);
    console.log(result);
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 -mt-10">
        {
          // workspaceList && workspaceList.map((workspace, index) => (
          workspaceList && [...workspaceList].reverse().map((workspace, index) => (  
            <Link href={'/workspace/' + workspace?._id} key={index}>
              <div className="py-0.5 hover:cursor-pointer hover:rounded-md hover:bg-white/5 hover:backdrop-blur-md hover:border hover:border-white/50 ">
                <h2 onClick={closeSidebar} className="text-md text-gray-200 mt-2 font-light text-center flex items-center justify-center transition-colors">
                  {workspace?.messages[0]?.content}
                </h2>
                <div className="border-b-2 mt-2 border-gray-600 w-full mx-auto"></div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );

}

export default WorkspaceHistory
// import React from 'react'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar"
// import Image from 'next/image'
// import { Button } from '../ui/button'
// import { MessageCircleCode } from 'lucide-react'
// import WorkspaceHistory from './WorkspaceHistory'
// import SideBarFooter from './SideBarFooter'
// import { useSidebar } from "@/components/ui/sidebar"


// function AppSideBar() {
//   const { setOpen, setOpenMobile, isMobile } = useSidebar();
//   const closeSidebar = () => {
//     if (isMobile) {
//       setOpenMobile && setOpenMobile(false);
//     } else {
//       setOpen && setOpen(false);
//     }
//   };
//   return (
//     <Sidebar>
//       <SidebarHeader className='p-5'>
//         <Image src={'/logo.png'} alt='logo' width={30} height={30}  />
//         <Button onClick={closeSidebar} className='bg-gray-700 mt-5 mb-2 text-white hover:cursor-pointer hover:text-black'><MessageCircleCode />Start New Chat</Button>
//         <div className="font-medium  text-lg flex-shrink-0 bg-transparent z-10">
//           <h2 className=''>Your Chats :</h2>
//         </div>
//       </SidebarHeader>
//       <SidebarContent className='p-5'>
//         <SidebarGroup>
//             <WorkspaceHistory />
//         </SidebarGroup>
//         {/* <SidebarGroup /> */}
//       </SidebarContent>
//       <SidebarFooter >
//         <SideBarFooter />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

// export default AppSideBar


import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '../ui/button'
import { MessageCircleCode } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import SideBarFooter from './SideBarFooter'
import { useSidebar } from "@/components/ui/sidebar"
import { useRouter } from 'next/navigation'


function AppSideBar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const router = useRouter();
  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile && setOpenMobile(false);
    } else {
      setOpen && setOpen(false);
    }
    router.push('/');
  };
  return (
    <Sidebar>
      <SidebarHeader className='p-5'>
        <Image src={'/logo.png'} alt='logo' width={30} height={30}  />
        <Button onClick={closeSidebar} className='bg-gray-700 mt-5 mb-2 text-white hover:cursor-pointer hover:text-black'><MessageCircleCode />Start New Chat</Button>
        <div className="font-medium  text-lg flex-shrink-0 bg-transparent z-10">
          <h2 className=''>Your Chats :</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className='p-5'>
        <SidebarGroup>
            <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar

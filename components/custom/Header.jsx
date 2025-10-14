
// import Image from 'next/image'
// import React, { useContext } from 'react'
// import { Button } from '../ui/button';
// import { UserDetailContext } from '@/context/UserDetailContext';
// import { useSidebar } from '../ui/sidebar';
// import { usePathname } from 'next/navigation';
// import { ActionContext } from '@/context/ActionContext';

// function Header() {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const { setOpen, setOpenMobile, isMobile, toggleSidebar } = useSidebar();  
//   const {action, setAction} = useContext(ActionContext);
//   const pathname = usePathname();
//   const isWorkspace = pathname.startsWith('/workspace/');

//   const onActionBtn = (action) => {
//     setAction({
//       actionType: action,
//       timeStamp:Date.now()
//     })
//   } 

//   return (
//     <div className='p-4 flex justify-between items-center'>
//       <Image
//         src={'/logo.png'} 
//         alt='logo'
//         width={40}
//         height={40}
//         className='cursor-pointer'
//         onClick={() => {
//           if (isMobile) {
//             setOpenMobile && setOpenMobile(true);
//           } else {
//             setOpen && setOpen(true);
//           }
//         }}
//       />
//       {
//         !userDetail ? (
//           <div className='flex gap-5'>
//             <Button variant="transparent" className="hover:bg-gray-700 cursor-pointer">Sign in</Button>
//             <Button variant="transparent" className="hover:bg-gray-700 cursor-pointer">Get Started</Button>
//           </div>
//         ) : (
//           <div className='mr-4 flex gap-1'>
//             {isWorkspace && (
//               <>
//                 <Button onClick={() => onActionBtn('export')} variant="transparent" className="hover:bg-gray-700 cursor-pointer">Export</Button>
//                 <Button onClick={() => onActionBtn('deploy')} variant="transparent" className="hover:bg-gray-700 cursor-pointer">Deploy</Button>
//               </>
//             )}
//             <Image
//               src={userDetail?.picture}
//               className='rounded-full ml-3 cursor-pointer border-2 border-white bg-white/30 hover:scale-110 transition'
//               onClick={toggleSidebar}
//               alt='user'
//               width={40}
//               height={40}
//             />
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default Header;




import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { setOpen, setOpenMobile, isMobile, toggleSidebar } = useSidebar();  
  const {action, setAction} = useContext(ActionContext);
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith('/workspace/');

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp:Date.now()
    })
  } 

  return (
    <div className='p-4 flex justify-between items-center'>
      <Image
        src={'/logo.png'} 
        alt='logo'
        width={40}
        height={40}
      />
      {
        !userDetail ? (
          <div className='flex gap-5'>
            <Button variant="transparent" className="hover:bg-gray-700 cursor-pointer">Sign in</Button>
            <Button variant="transparent" className="hover:bg-gray-700 cursor-pointer">Get Started</Button>
          </div>
        ) : (
          <div className='mr-4 flex gap-1'>
            {isWorkspace && (
              <>
                <Button onClick={() => onActionBtn('export')} variant="transparent" className="hover:bg-gray-700 cursor-pointer">Export</Button>
                <Button onClick={() => onActionBtn('deploy')} variant="transparent" className="hover:bg-gray-700 cursor-pointer">Deploy</Button>
              </>
            )}
            <Image
              src={userDetail?.picture}
              className='rounded-full ml-3 cursor-pointer border-2 border-white bg-white/30 hover:scale-110 transition'
              onClick={toggleSidebar}
              alt='user'
              width={40}
              height={40}
            />
          </div>
        )
      }
    </div>
  )
}

export default Header;

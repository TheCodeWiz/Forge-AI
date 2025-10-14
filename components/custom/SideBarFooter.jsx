// // import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
// // import React from 'react'
// // import { Button } from '../ui/button'
// // import { useRouter } from 'next/navigation'

// // function SideBarFooter() {
// //     const router = useRouter();
// //     const options=[
// //         {
// //             name:'Settings',
// //             icon: Settings
// //         },
// //         {
// //             name:'Help Center',
// //             icon: HelpCircle
// //         },
// //         {
// //             name:'Subscription Plan',
// //             icon: Wallet,
// //             path:'/pricing'
// //         },
// //         {
// //             name:'Sign Out',
// //             icon: LogOut
// //         }
// //     ]
// //     const onOptionClickEnd = (option) => {
// //         router.push(option.path)
// //         if (onOptionClickEnd) onOptionClickEnd()
// //     }
// //   return (
// //     <div className='p-2 mb-10'>
// //         {
// //             options.map((option, index) => (
// //                 <Button key={option.name} onClick={() => onOptionClickEnd(option)} className='w-full flex justify-start bg-transparent my-3 text-white cursor-pointer hover:text-black'>
// //                     <option.icon />
// //                     {option.name}
// //                 </Button>
// //             ))
// //         }
// //     </div>
// //   )
// // }

// // export default SideBarFooter


// import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
// import React from 'react'
// import { Button } from '../ui/button'
// import { useRouter } from 'next/navigation'
// import { useSidebar } from '../ui/sidebar'

// function SideBarFooter() {
//     const router = useRouter();
//     const { setOpen, setOpenMobile } = useSidebar();
//     const options=[
//         { name:'Settings', icon: Settings },
//         { name:'Help Center', icon: HelpCircle },
//         { name:'Subscription Plan', icon: Wallet, path:'/pricing' },
//         { name:'Sign Out', icon: LogOut }
//     ];

//     const handleOptionClick = (option) => {
//         if (option.path) router.push(option.path);
//         if (setOpen) setOpen(false);         // For desktop sidebar
//         if (setOpenMobile) setOpenMobile(false); // For mobile sidebar
//     };

//     return (
//         <div className='p-2 mb-10'>
//             {options.map(option => (
//                 <Button key={option.name} onClick={() => handleOptionClick(option)} className='w-full flex justify-start bg-transparent my-3 text-white cursor-pointer hover:text-black'>
//                     <option.icon />
//                     {option.name}
//                 </Button>
//             ))}
//         </div>
//     )
// }

// export default SideBarFooter



import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useSidebar } from '../ui/sidebar'

function SideBarFooter() {
    const router = useRouter();
    const { setOpen, setOpenMobile } = useSidebar();
    const options=[
        // { name:'Settings', icon: Settings },
        // { name:'Help Center', icon: HelpCircle },
        { name:'Subscription Plan', icon: Wallet, path:'/pricing' },
        // { name:'Sign Out', icon: LogOut }
    ];

    const handleOptionClick = (option) => {
        if (option.path) router.push(option.path);
        if (setOpen) setOpen(false);         // For desktop sidebar
        if (setOpenMobile) setOpenMobile(false); // For mobile sidebar
    };

    return (
        <div className='p-2 mb-10'>
            {options.map(option => (
                <Button key={option.name} onClick={() => handleOptionClick(option)} className='w-full flex justify-start bg-transparent my-3 text-white cursor-pointer hover:text-black'>
                    <option.icon />
                    {option.name}
                </Button>
            ))}
        </div>
    )
}

export default SideBarFooter

import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import uuid4 from 'uuid4';

function SignInDialog({openDialog, closeDialog}) {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);


    const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+ tokenResponse?.access_token  } },
        );

        console.log(userInfo);
        const user = userInfo.data;
        await CreateUser({
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            uid: uuid4()
        })
        if(typeof window !== undefined){
            localStorage.setItem('users', JSON.stringify(user))
        }
        setUserDetail(userInfo?.data);
        closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <h2 className='font-bold text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                    <p className='mt-2'>{Lookup.SIGNIN_SUBHEADING}</p>
                    <Button className='bg-gradient-to-b from-blue-500 via-blue-600 to-black mt-3 text-white hover:cursor-pointer' onClick={googleLogin}>Sign In with Google</Button>
                    <p className='mt-2'>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}

export default SignInDialog
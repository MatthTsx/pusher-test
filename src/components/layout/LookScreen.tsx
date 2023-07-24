import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'

interface props{
    changeId : React.Dispatch<React.SetStateAction<string>>
}

function LookScreen({...p} : props) {
    const session = useSession()
    const getUsers = api.LookRouter.getUsers.useQuery({userId: session.data?.user.id!})
    const addConvr = api.LookRouter.createConversation.useMutation()
    const search = api.LookRouter.findFirstConv

    const [users, setUsers] = useState(getUsers.data!);
    const [click, setClick] = useState(false)

    useEffect(() => {
        setUsers(getUsers.data!)
    }, [getUsers.data])

    useEffect(() => {
        if(!click) return
        console.log(addConvr.data)
    },[addConvr.data])

    const Handler = async (id: string) => {
        await addConvr.mutate({usersId: [id, session.data?.user.id!]})
        setClick(true)
    }

    if(!users || getUsers.status == "loading") return <div className='w-full
    h-screen p-2 flex flex-col items-center justify-end'/>

  return (
    <div className='w-full h-screen p-2 flex flex-row overflow-y-scroll
    no-scrollbar relative flex-wrap gap-4'>
        {users!.map((user, i) => (
            <div className='bg-white/5 w-64 h-16 p-4 flex items-center
            transition-all cursor-pointer gap-x-3 relative rounded-md scale-[97.5%]
            hover:scale-100 hover:bg-gradient-to-tr flex-shrink-0
            from-violet-500 from-5% to-sky-500 to-90%'
            key = {i}
            onClick={() => Handler(user.id)}>
                <Image src={user.image!} width={100} height={100} alt=''
                className='w-12 h-12 rounded-full object-cover shadow-md border border-black/20'/>
                <p className='text-xl'>{user.name}</p>
            </div>
        ))}
        <button onClick={() => signOut()} className='p-1.5 text-sky-300 rounded-md opacity-50 hover:opacity-100
        w-fit h-fit text-sm transition-all top-0 right-0 fixed hover:scale-100 scale-[97.5%]
        '>Sign Out</button>
    </div>
  )
}

export default LookScreen
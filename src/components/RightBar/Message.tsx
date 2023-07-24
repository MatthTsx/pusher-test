import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react'

interface props{
    author: {
        name: string | null;
        image: string | null;
        id: string | null;
    };
    text: string;
    isImage: boolean;
    isUser: boolean;
    isFirstOfUser: boolean
}

function Message({...msg} : props) {
    const [isUsers,setIsUser] = React.useState<boolean>(false)
    const update = React.useRef(true)
    const [reload, setReload] = React.useState(1)
    const session = useSession()

    // useEffect(() => {
    //     if (msg.isUser == undefined) msg.isUser = session.data?.user.id == msg.author.id
    //     if(msg.isUser == undefined) return
    //     update.current = false
    //     setIsUser(msg.isUser)   
    // }, [update, msg.isUser])

    // useEffect(() => {
    //     console.log(isUsers)
    //     setReload((current) => (current * -1))
    // }, [isUsers])

    // useEffect(() => {
    //     msg.isUser = session.data?.user.id == msg.author.id
    //     setIsUser(msg.isUser)
    //     console.log(msg.isUser, session.data?.user.id, msg.author.id, isUsers)
    // })

    // useEffect(() => {
    //     update.current = true
    // },[msg.author.id])

    // if(isUsers == undefined || msg.author.id == undefined) return <></>

  return (
    <div className={`w-full h-fit min-h-[2rem] py-1 flex-shrink-0 flex flex-row px-4 gap-x-2 relative`}
    style={{
        justifyContent: msg.isUser ? "end" : "start"
    }}>
        {!msg.isUser && msg.isFirstOfUser &&
        <Image src={msg.author.image!} width={75} height={75} alt=''
        className='w-10 h-10 rounded-full object-cover absolute'/>
        }

        <div className='bg-gradient-to-tr w-fit min-w-[2rem] h-fit flex flex-row rounded-md items-center
        min-h-[100%] max-w-[45rem] ml-14
        from-indigo-500 from-10% to-sky-500 to-90%'
        style={{
            flexDirection: msg.isUser ? "row-reverse" : "row"
        }}>
            <p className='px-4 break-words py-2 break-all'>{msg.text}</p>
        </div>
    </div>
  )
}

export default Message
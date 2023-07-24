import Image from 'next/image';
import React from 'react'
import { pusherClient } from '~/libs/pusher';
import { UsViewer } from '~/libs/types';
import { msg } from '../RightBar/MessagesContainer';
import { useSession } from 'next-auth/react';

interface Props extends UsViewer {
  changeId : React.Dispatch<React.SetStateAction<string>>
  Channel_id: string
}
interface mawdas extends msg{
  id: string
}

function ChatProfile({...props} : Props) {
  const [showMsg, setShowMsg] = React.useState<string>(props.Messages[props.Messages.length - 1]?.text!)
  const {data: session} = useSession()
  const Handler = () => {
    props.changeId(props.id)
  }

  React.useEffect(() => {

    const handler = (m: mawdas) => {
      if (m.id != props.id) return
      setShowMsg(m?.Messages![props.Messages.length - 1]?.text!)
      if(m?.Messages![props.Messages.length - 1]?.author.id == session?.user.id) return
      console.log("mensagem nova")
    }
    const handler2 = (on: {
      LastOnline: Date | null;
      OnlineStatus: string | null;
      id: string;
  }) => {
      if(props.Users.length != 1 || on.id != props.Users[0]!.id) return
      props.Users[0]!.OnlineStatus = on.OnlineStatus
      props.Users[0]!.LastOnline = on.LastOnline
    }

    pusherClient.subscribe(`Conversation-${props.id}`)
    pusherClient.bind("Messages:new", handler)

    pusherClient.subscribe(`User-${props.Users[0]?.id}`)
    pusherClient.bind("Online-Change", handler2)

    return () => {
      pusherClient.unsubscribe(`User-${props.Users[0]?.id}`)
      pusherClient.unbind("Online-Change", handler2)

      pusherClient.unsubscribe(`Conversation-${props.id}`)
      pusherClient.unbind("Messages:new", handler)
    }
  })

  return (
    <div className='bg-sky-700 w-full h-16 p-4 flex items-center hover:bg-opacity-50 bg-opacity-0
    transition-all cursor-pointer gap-x-3 relative' onClick={() => Handler()}>
        <Image src={props.Users[0]?.image!} width={100} height={100} alt='' className='object-fill w-12 h-12 rounded-full
        shadow-lg'/>
        {/* Mostrador de status */}
        {
          props.Users[0]!.OnlineStatus != "OFFLINE" &&
        <div className='absolute bottom-1.5 left-12 bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center' style={{
          backgroundColor: props.Users[0]!.OnlineStatus == "ONLINE" ? "green" : "blue",
        }}>

        </div>
        }
        <div className='h-full w-[80%] flex flex-col justify-center'>
            <p className='font-semibold text-[1rem] font-sans cursor-pointer'>{props.Users[0]?.name?.length! > 20 ? props.Users[0]?.name?.substring(0,20) + "..."
            :props.Users[0]?.name}</p>

            <div className='w-[100%]'>
                {showMsg ? showMsg.length > 25 ? showMsg.substring(0,25) + "..." : showMsg : "Started a conversation"}
            </div>
        </div>
    </div>
  )
}

export default ChatProfile
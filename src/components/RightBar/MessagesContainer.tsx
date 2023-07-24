import React, { useEffect } from 'react'
import { api } from '~/utils/api'
import { pusherClient } from '~/libs/pusher'
import Message from './Message';
import { useSession } from 'next-auth/react';

//TODO: Auto scrool down on new message

interface props {
    id: string
}

export interface msg {
    Messages: {
        author: {
            name: string | null;
            image: string | null;
            id: string;
        };
        text: string;
        isImage: boolean;
    }[] | undefined;
    id: string
}

function MessagesContainer({...p} : props) {
    const getMsg = api.RightBar.getMessages.useQuery({id: p.id})
    const {data: session} = useSession()
    const [Msgs, setMsgs] = React.useState<msg>()

    useEffect(() => {
        setMsgs(getMsg.data!)
    },[getMsg.data])

    useEffect(() => {
        const handler = (m : msg) => {
            if(m.id != p.id) return
            setMsgs((current) => {
                // if(!current) return m
                const ma : msg = {
                    Messages: [m.Messages![0]!, ...current?.Messages!],
                    id: current!.id
                }
                return ma
            })
        }

        pusherClient.subscribe(`Conversation-${p.id}`)
        pusherClient.bind("Messages:new", handler)

        return () => {
            pusherClient.unsubscribe(`Conversation-${p.id}`)
            pusherClient.unbind("Messages:new", handler)
        }
    })

  return (
    <div className='w-full h-full flex flex-col-reverse overflow-y-scroll scroll-smooth no-scrollbar'>
        {Msgs?.Messages?.map((msg,i) => (
            <Message {...msg} key={i} isUser={session?.user.id == msg.author.id} isFirstOfUser={
                i != Msgs.Messages?.length! - 1 ? Msgs.Messages![i]?.author.id != Msgs.Messages![i + 1]?.author.id
                : true
            }/>
        ))}
    </div>
  )
}

export default MessagesContainer
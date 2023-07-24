import React from 'react'
import MessagesContainer from '../RightBar/MessagesContainer'
import MessageUpload from '../RightBar/MessageUpload'

interface params {
    id: string
}

function RightBar({...p} : params) {


    if(p.id === "") return <div className='w-full'></div>
  return (
    <div className='w-full h-screen p-2 flex flex-col items-center justify-end'>
        <MessagesContainer id={p.id}/>
        <MessageUpload id={p.id}/>
    </div>
  )
}

export default RightBar
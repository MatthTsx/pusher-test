import React, { useEffect } from 'react'
import type { UserViewer } from '~/libs/types'
import ChatProfile from './ChatProfile'

interface props{
    _userToShow : UserViewer,
    changeId : React.Dispatch<React.SetStateAction<string>>,
    channel_Id : string
}

function Show({...props} : props) {

  const load = React.useRef(true);
  useEffect(() => {
    if(!load.current) return
    load.current = false
    props._userToShow?.forEach((m) => {
      console.log(m.id, "a")
    })
  }, [load.current])

  return (
    <div className='flex flex-col items-center w-full overflow-y-scroll no-scrollbar'>
        {
            props._userToShow?.map((user, i) => (
                <ChatProfile {...user} key={i} changeId={props.changeId} Channel_id={props.channel_Id}/>
            ))
        }
    </div>
  )
}

export default Show
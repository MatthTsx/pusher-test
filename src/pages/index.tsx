import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import LeftBar from '~/components/layout/LeftBar'
import LookScreen from '~/components/layout/LookScreen'
import RightBar from '~/components/layout/RightBar'
import { api } from '~/utils/api'

enum OnStatus {
  ONLINE = 2,
  OFFLINE = 0,
  AWAY = 1
}

function Home() {
  const [ConversationId, setConversationId] = React.useState("")
  const load = React.useRef(true)
  const markOnline = api.UserRouter.ChangeStatus.useMutation()
  const {data: session} = useSession()
  const [screen, setScreen] = useState(0)

  const handlerOnline = async (Online: OnStatus) => {
    if(!session?.user.id) return
    console.log('a', session.user.id, Online)
    await markOnline.mutate({id: session?.user.id!, status: Online})
  }

  useEffect(() => {
    if(!load.current) return
    load.current = false

    // window.addEventListener("focus", () => handlerOnline(OnStatus.ONLINE))
    // window.addEventListener("blur", () => handlerOnline(OnStatus.AWAY))
    // window.addEventListener("click", () => handlerOnline(OnStatus.ONLINE))
  }, [load])


  return (
    <>
    <Head>
      <title>Howszap</title>
    </Head>
    <div className='w-full h-screen bg-black flex relative'>
        <LeftBar changeId={setConversationId} id={ConversationId}/>
        {ConversationId == "_LOOK_" ? 
        <LookScreen changeId={setConversationId}/>
        :<RightBar id={ConversationId}/>
        }
    </div>
    </>
  )
}

export default Home
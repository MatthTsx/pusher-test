import React, { useEffect, useRef, useState } from 'react'
import Search from '../leftBar/search'
import { api } from '~/utils/api'
import Show from '../leftBar/Show'
import { useSession } from 'next-auth/react'
import { UserViewer } from '~/libs/types'
import LookForUsers from '../leftBar/LookForUsers'

interface Props {
    changeId : React.Dispatch<React.SetStateAction<string>>
    id: string,
}

function LeftBar({...p} : Props) {
    const s = useSession()
    const [search, setSearch] = useState("")
    const getConv = api.LeftBar.getUsers.useQuery({id: s.data?.user.id!})
    const dvc = api.DevPower.addConversation.useMutation()

    const [users, setUsers] = useState<UserViewer>()
    const [visables, setVisibles] = useState<UserViewer>(users!)
    const load = useRef(true)

    useEffect(() => {
        if(!load.current) return
        load.current = false
        setUsers(getConv.data)
    }, [load])

    useEffect(() => {
        setVisibles(getVisibles())
    }, [search])

    const getVisibles = () => {
        const r: UserViewer = []
        users?.map((u) => {
            u.Users.forEach((us,i) => {
                if(us.id == s.data?.user.id){
                    u.Users.splice(i, 1)
                }
            })
            if(u.Users[0]?.name?.toLowerCase().includes(search.toLowerCase())) return r.push(u)
        })
        return r
    }

    useEffect(() => {
        setUsers((current) => {
            if(current == getConv.data) return current
            return getConv.data
        })
        setVisibles(getVisibles())
    }, [getConv.data, users])

  return (
    <div className=' w-96 flex flex-col items-center rounded-md relative
    bg-gradient-to-bl from-indigo-600 via-purple-500 to-pink-500 via-75% from-35%
    opacity-50 hover:opacity-100 transition-all scale-[97.5%] hover:scale-100'>
        <Search func={setSearch}/>
        <button onClick={() => dvc.mutate({
            ids: [{
                id: 
                "64bd9ef5c7abccab6ebd9334",
            },
            {
                id:
                "64bd9f00c7abccab6ebd9337"
            }
            ]
        })}>Click me</button>
        <Show _userToShow={visables} changeId={p.changeId} channel_Id={p.id}/>
        <LookForUsers ChangeScreen={p.changeId}/>
    </div>
  )
}

export default LeftBar
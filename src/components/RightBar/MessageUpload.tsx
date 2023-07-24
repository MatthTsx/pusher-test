import { useSession } from 'next-auth/react'
import React from 'react'
import { api } from '~/utils/api'

interface props{
    id: string
}

function MessageUpload({...p} : props) {
    const [text, setText] = React.useState("")
    const upload = api.RightBar.UploadMessage.useMutation()
    const session = useSession()
    const deleteALL = api.DevPower.DeleteAllThings.useMutation()
    const [isFocus, setFocus] = React.useState(false)

    const Upload = () => {
        if(text.length == 0) return
        upload.mutate({
            id: p.id,
            isImage: false,
            text,
            userId: session.data?.user.id!,
        })
        setText("");
        try {
            const txA = document.querySelector("textarea#MessageTextInput")! as HTMLTextAreaElement
            txA.value = "";
            txA.style.height = 30 + "px"
        } catch (error) {}

    }

  return (
    <div className='bg-gradient-to-tr w-full min-h-16 rounded-md flex flex-row items-end p-4 justify-between
    opacity-50 bg-opacity-5 scale-[97.5%] h-fit max-h-32
    hover:opacity-100 transition-all hover:scale-100 mt-5
    from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'
    style={{
        opacity: isFocus ? 1 : 0.5
    }}>
        <textarea onChange={(e) => {
            const tx = e.target
            setText(tx.value)
            tx.style.height = 0 + "";
            tx.style.height = (tx.scrollHeight > 100 ? 100 : tx.scrollHeight) + "px";
            if(tx.textLength < 200 && parseInt(tx.style.height.replace("px","")) >= 99) tx.style.height = 30 + "px"
        }}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        cols={120}
        rows={1}
        maxLength={120*7}
        className='outline-none rounded-sm p-1 transition-all peer bg-transparent border-b-black
        border-b no-scrollbar'
        id={"MessageTextInput"}/>
        <button onClick={() => Upload()} className=''>Send</button>
        {/* <button onClick={() => deleteALL.mutate()}>Hard reset</button> */}
    </div>
  )
}

export default MessageUpload
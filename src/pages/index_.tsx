// import { signIn, signOut, useSession } from "next-auth/react";
// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { env } from "~/env.mjs";
// import Pusher from "pusher-js";
// import { api } from "~/utils/api";


// export default function Homer() {
//   const s = useSession();
//   const [message, setMessage] = useState("");
//   const getMessage = api.test.getMessages.useQuery()
//   const dlAll_ = api.test.DeleteALL.useMutation()
//   const addMessage = api.test.addMessage.useMutation()
//   const [messages, setMessages] = useState(getMessage.data);

//   const dlAll = () => {
//     dlAll_.mutate()
//     console.log('a')
//   }

//   useEffect(() => {
//     setMessages(getMessage.data)
//   }, [getMessage.data])

//   useEffect(() => {
//     const k = process.env.NEXT_PUBLIC_PUSHER_KEY
//     let do_ = true
//     console.log(k, messages, getMessage.data)

//     if(!do_) return
//     if(!k) return
    
//     const channel = new Pusher(k, {
//       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//     })
//     channel.subscribe("A");
//     const handler = (m : {
//       text: string, id:string,
//       author: {
//         name: string | null;
//       }
//     }) => {
//       console.log("aw!!")
//       setMessages((current) => {
//         if (current?.find(x => x.id === m.id)?.id === m.id) return current
//         return [...current!, m]
//       })
//       // getMessage.refetch() //outro modo +lento e consome mais do server
//     }
//     channel.bind("message:new", handler)
    
//     console.log(channel)
//     return () => {
//       channel.unsubscribe("A")
//       channel.unbind("message:new", handler)
//       do_ = false
//     }
//   }, [])

//   if(!s.data?.user && s.status != "loading"){
//     return <button onClick={() => signIn("google")}>Sign In</button>
//   }else if(s.status == "loading"){
//     return <>loading</>
//   }

//   async function Add () {
//     if(message == ""){
//       return;
//     }
//     await addMessage.mutate({
//       text: message,
//       id: s.data?.user.id!
//     })
//     setMessage("");
//   }

//   return (
//     <>
//       <div className="bg-red-400 h-24 flex flex-col items-center">
//         <input onChange={(e) => setMessage(e.target.value)} type="text"/>
//         <button onClick={() => Add()}>Add</button>
//         <button onClick={() => dlAll()}>Up</button>
//       </div>
//       <div className="bg-red-500 h-72 flex flex-col items-center">
//         {messages?.map((m,i) => (
//           <div key={i}>
//             {m.author.name}: {m.text}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }



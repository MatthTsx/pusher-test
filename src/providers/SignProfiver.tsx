import { signIn, useSession } from 'next-auth/react'
import React from 'react'

function SignProfiver({children} : {children: React.ReactNode}) {
    const session = useSession()

    if(session.status == "loading") return <>Loading</>

    if(!session.data?.user){
        return <button onClick={() => signIn("google")}>SignIn</button>
    }

  return ( children )
}

export default SignProfiver
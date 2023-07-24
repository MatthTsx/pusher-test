import React from 'react'

interface Props {
    ChangeScreen: React.Dispatch<React.SetStateAction<string>>
}

function LookForUsers({...p} : Props) {
  return (
    <button className='absolute bottom-0 left-0 bg-pink-500 w-12 h-12 flex items-center justify-center cursor-pointer
    transition-all scale-[75.5%] hover:scale-100 rounded-md animate-bounce'
    onClick={() => p.ChangeScreen("_LOOK_")}>
        Look
    </button>
  )
}

export default LookForUsers
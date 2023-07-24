import React, { useEffect, useState } from 'react'

function Search({
    func
}:{
    func: React.Dispatch<React.SetStateAction<string>>
}) {
    
  return (
    <input type='text'
    onChange={(e) => func(e.target.value)}
    className='outline-none w-[75%] rounded-sm bg-transparent border-b border-b-black py-0.5 my-2'
    />
  )
}

export default Search
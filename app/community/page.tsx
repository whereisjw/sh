import Link from 'next/link'
import React from 'react'
import CommunityList from './CommunityList'

const page = () => {
  return (
<div className="py-4 space-y-8">
 
<CommunityList/>
 
<button className="fixed bottom-24 right-5 hover:bg-teal-500 cursor-pointer transition-colors bg-teal-400 rounded-full p-4 text-white shadow-xl">
  <Link href={'/community/write'}>
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
  </svg>
  </Link>
</button>
</div>
  )
}

export default page
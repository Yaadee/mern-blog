import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterC = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="">
            <div className="">
                <div className="">
                          <Link to = '/' className='self-center whitespace-nowrap text-sm
      sm:text-lg font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' > Yadasa's </span>
      Blog
      </Link>
                </div>
            </div>

        </div>
    </Footer>
  )
}

export default FooterC

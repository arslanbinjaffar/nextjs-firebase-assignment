import React from 'react'

const Hero = ({setIsShowAddModal}:{setIsShowAddModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
      <div className='mt-6 hero_bg'>
          <div className='py-12 px-9'>
              <h1 className='text-white text-3xl font-semibold'> Hi! 👋 James Doe</h1>
              <p className='text-white mt-4'>Lorem ipsus dolor sit amen, something important to say here</p>
              <button className='bg-purple-500 rounded-full py-4  text-white px-7 mt-9' onClick={()=>setIsShowAddModal(true)}>Add Check In</button>
        </div>
    </div>
  )
}

export default Hero
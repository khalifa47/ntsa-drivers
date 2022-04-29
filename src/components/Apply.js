import React from 'react'
import ApplyForm from './mini-components/ApplyForm'

const Apply = () => {
  
  return (
    <div className="max-w-7xl mx-auto p-5 mt-8">

      <div className="border border-black w-full bg-green-400 rounded py-3">
        <h1 className="text-2xl text-center font-semibold text-white">Apply for smart Driving License</h1>
      </div>

      <div className="p-5 mt-3 mx-auto">
        <ApplyForm />
      </div>
    </div>
  )
}

export default Apply

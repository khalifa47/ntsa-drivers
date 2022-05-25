import React from 'react'
import RenewForm from '../mini-components/RenewForm'

const Renew = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 mt-8">
      <div className="w-full py-3">
        <h1 className="text-2xl text-center font-semibold uppercase">Renew Diving License</h1>
      </div>

      <div className="p-5 mt-3 mx-auto">
        <RenewForm />
      </div>
    </div>
  )
}


export default Renew;
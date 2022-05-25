import React from 'react'
import InputIcon from '@mui/icons-material/Input';

const RenewForm = () => {
  return (
    <form className="w-full max-w-5xl mx-auto">
      {/* Div 1 */}
      <div className="flex flex-wrap -mx-3 mb-10">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-national-id">
                National ID
            </label>
            <input
                className="appearance-none block  w-full border-b-2 border-b-black outine-none py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-national-id" type="number" placeholder="12345678"/>

        </div>
        <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-license-number">
                Serial Number
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-license-number" type="number" placeholder="123456789"/>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-national-id">
                License Number
            </label>
            <input
                className="appearance-none block uppercase w-full border-b-2 border-b-black outine-none py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-national-id" type="text" placeholder="ABC123"/>

        </div>
      </div>

      {/* Div 2 */}
      <div className="flex flex-wrap -mx-3 mb-10">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-given-name">
                Given Names
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-given-name" type="text" placeholder="Jane Doe"/>

        </div>
        <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name">
                Surname
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-last-name" type="text" placeholder="McCall"/>
        </div>
      </div>

      {/* Div 3 */}
      <div className="flex flex-wrap -mx-3 mb-10">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-nationality">
                Nationality
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-nationality" type="text" placeholder="Kenyan"/>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-county">
                County of Residence
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-county" type="text" placeholder="Nairobi"/>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-phone-number">
                Phone Number
            </label>
            <input
                className="appearance-none block w-full border-b-2 border-b-black outine-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                id="grid-phone-number" type="text" placeholder="+254712345678"/>
        </div>
      </div>
      <div className="mx-auto py-8">
        <button
            className="w-full mx-auto file:shadow bg-amber-400 hover:bg-amber-500 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded duration-700"
            type="button">
            <span className="pr-3">Submit</span>
            <InputIcon/>
        </button>
      </div>
    </form>
  )
}

export default RenewForm
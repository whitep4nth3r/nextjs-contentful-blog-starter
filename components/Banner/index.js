import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useEffect } from 'react'

export default function Banner({message, showBanner, hideBanner}) {

    // On componentDidMount set the timer
    useEffect(() => {
        console.log('uEBanner')
    
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            hideBanner()
          }, 3000)
      
          return () => {
            clearTimeout(timeId)
        }
    
      },[showBanner]) //když by tam nebyl ani array 2 argument tak to reaguje na vše
  
    // If showBanner is false the component will return null and stop here
    if (!showBanner) {
      return null;
    }

    
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">{message}</span>
              <span className="hidden md:inline">{message}</span>
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
            onClick={() => hideBanner()}
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Zavřít</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
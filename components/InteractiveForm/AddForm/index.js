import React, { useState, useEffect, useContext } from 'react'

export function AddForm(props) {

  const { setCurrentFilter, deleteForm,
     userList, setFilterList,
      currentFilter, currentItem2,
       handleSubmit, updateChange,
        button, handleChange} = props;


  const filterChange = (e) =>{
    setCurrentFilter(e.target.value)
    //console.log(e.target.value.length)
    
    const re = new RegExp('^' + e.target.value.toLowerCase(),"g");

    const startsWith = e.target.value.length >= 1 ? (
    //userList.filter((list) => list.email.startsWith(e.target.value)) ---> 
    
    userList.filter((list) => {
      const search = Object.keys(list).map((el) =>{
        const word = String(list[el]).toLowerCase()
        return (word.match(re) || []).length;
      })
      return search.reduce((a, b) => a + b, 0) >= 1 && list
    })
    ) : (
      userList
    )

    //console.log(startsWith)
    setFilterList(startsWith)
  }

  return (

    <form onSubmit={button === 'Přidat' ? handleSubmit : updateChange}>
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-nevim sm:p-6">

      <div className="grid grid-cols-6 gap-6 mb-5">
          <div className="col-span-3 sm:col-span-3">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Filter
            </label>
            <input
              onChange={filterChange}
              value={currentFilter || ''}
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-solid border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Jméno
            </label>
            <input
              onChange={handleChange}
              value={currentItem2.first_name || ''}
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-solid border-gray-300"
            />
          </div>

          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Příjmení
            </label>
            <input
              onChange={handleChange}
              value={currentItem2.last_name || ''}
              type="text"
              name="last_name"
              id="last_name"
              autoComplete="family-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-solid border-gray-300"
            />
          </div>

          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleChange}
              value={currentItem2.email_address || ''}
              type="text"
              name="email_address"
              id="email_address"
              autoComplete="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-solid border-gray-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              disabled={button === 'Přidat' ? false : 'disabled'}
            />
          </div>

        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        
      {button === 'Přidat' ? (
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {button}
        </button>)
        :
        (<div>
            <button
          type="submit"
          className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {button}
        </button>
        <span
        onClick={deleteForm}
        className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
          Smazat formulář
      </span>
      </div>
        )
      }
      
      </div>
    </div>
  </form>

  );
}

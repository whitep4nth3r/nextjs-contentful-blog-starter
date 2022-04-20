import React, { useState, useEffect, useContext } from 'react'

export function Profil(props) {

  const { currentItem2, usr, i, banner, deleteUser, increaseRanking, decreaseRanking, changeUser} = props;

  const showContainer = banner && currentItem2 && currentItem2.email_address === usr.email ? 'bg-active-sky' : 'bg-white'

  return (

    <div key={i}>
    <div className={"block rounded-lg shadow-lg mb-2 " + showContainer}>
      <div className="overflow-hidden rounded-t-lg h-28 bg-nevim"></div>
      <div className="w-24 -mt-12 overflow-hidden border border-2 border-white rounded-full mx-auto bg-white">
        <img src={usr.avatar} />
      </div>
      <div className="p-6">
        <h4 className="text-2xl font-semibold mb-4">{usr.first_name} {usr.last_name}</h4>
        <hr />
        <div className="grid md:grid-cols-2 gap-2 pt-5 text-center">
        <button onClick={changeUser} value={i} className="text-sm text-sky-500 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
        type="button">
         Upravit </button>
        <button onClick={(e) => deleteUser(e,i)} className="text-sm text-sky-500 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
        type="button">
         Smazat </button>
        </div>
        <p className="mt-2 text-sm">
          Email:<br/> {usr.email}
        </p>
        <p className="mt-2">
        <button onClick={() => increaseRanking(i)} className="rounded-full fa-arrow-up"><svg className="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
</svg>
</button>

        {usr.ranking ? usr.ranking : 0}

        <button onClick={() => decreaseRanking(i)} className="rounded-full fa-arrow-down"><svg className="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
</svg></button>
        </p>
      </div>
    </div>
  </div>

  );
}

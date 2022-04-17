import React, { useState, useEffect, PureComponent } from 'react'
import ContentfulApi from "@utils/ContentfulApi";
import { Result } from 'postcss';
import Banner from "@components/Banner";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar, Line, Pie } from 'react-chartjs-2';

let a = 1

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

    let ranking = 0

export const InteractiveForm = ({data}) => {
    const [userList, setUserList] = useState(data)
    const [countList, setCountList] = useState(null)
    const [currentItem, setCurrentItem] = useState([])
    const [currentItem2, setCurrentItem2] = useState({})
    const [banner, setBanner] = useState(false)
    const [messageToBanner, setMessageToBanner] = useState('')
    const [button, setButton] = useState('Přidat')

    const [dataMap, setDataMap] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: 'Nejlépe hodnocení',
            data: [33, 25, 35, 51, 54, 76],
            fill: true,
        backgroundColor: "rgb(54, 162, 235)"
          }
        ],
      })
    const [optionsMap, setOptionsMap] = useState({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Nejlepší hodnocení',
          },
        },
      })






  useEffect(() => {
    setCountList(userList.length)

 
    const lab = userList.map((el) => el.first_name)
    dataMap.labels = lab
    const data = userList.map((el) => el.ranking ? el.ranking : 0)
    dataMap.datasets[0].data = data
    setDataMap(dataMap)

    console.log(userList)
    console.log(dataMap.datasets[0].data)
    
  },[userList])

  useEffect(() => {
    const curItem = currentItem.reduce((obj, item) => ({
        ...obj,
        [item.name]: item.value
      }), {});
      setCurrentItem2(curItem)
  },[currentItem]) //protoze jsem blbec a spatne se mi cetlo y objektu tak jsem to nakopiroval do jineho ktere je pak ve value v input

  
  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList))
  }, [userList])

  /*useEffect(() => {
    let localList = JSON.parse(localStorage.getItem('userList'));
    if (localList !== null) {
      setList(localList)
    }
  }, []) // empty array as second argument will behave exactly like componentDidMount - means only one time in the beginning of render
*/

  const handleChange = e => {
    const target = e.target;
    const name = target.name;
    const actual = {name: name, value: target.value}
    const finHan = currentItem.find((el) => el.name === name)

    if(finHan){
        const res = currentItem.map((el,i) => {
            return el.name === name ? { ...el, value: target.value } : el;
        })
        setCurrentItem(res)
    }
    else{
        setCurrentItem([...currentItem, actual])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const curName = currentItem.reduce((obj, item) => ({
        ...obj,
        [item.name]: item.value
      }), {});
      const curRes = {
        id: userList.length,
        email: curName.email_address,
        first_name: curName.first_name,
        last_name: curName.last_name,
        avatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
    }
    setUserList(prevUserList => {
        return [...prevUserList,curRes]
    })
    setMessageToBanner('Úspěšně přidán: ' + curRes.first_name + ' ' + curRes.last_name + ' - Email: ' + curRes.email);
    setBanner(true)
    setCurrentItem([])
  }

const updateChange = e =>{
    e.preventDefault()
    //const fin = userList.find((el) => el.email === currentItem2.email_address)
    //console.log(currentItem2)

const usrlst = userList.map((el) =>{
   return el.email === currentItem2.email ? ({...el, first_name: currentItem2.first_name, last_name: currentItem2.last_name}) : (el)
})
console.log(usrlst)
setUserList(usrlst)

    setMessageToBanner('Úspěšně aktualizován: ' + currentItem2.first_name + ' ' + currentItem2.last_name + ' - Email: ' + currentItem2.email);
    setBanner(true)
    //setCurrentItem2({})
    setButton('Přidat')
}

const deleteUser = (e,id) =>{
    const res = userList.filter((el,i) => i !== id)
    setUserList(res)
}

const changeUser = (e) =>{
    //console.log(e.target.value)
    const user2 = userList[e.target.value]
    user2 = {...user2, email_address: user2.email}
    
    const user = Object.keys(user2).map((el) =>{
        return {name: el, value: user2[el]}
    })

    setCurrentItem(user)
    setCurrentItem2(user2)
    setButton('Upravit')
}

const hideBanner = () =>{
    setBanner(false)
}

const deleteForm = () =>{
    setCurrentItem2({})
    setButton('Přidat')
}

const increaseRanking = (id) =>{
    const user2 = userList[id]

    const usrlst = userList.map((el) =>{
        return el.email === user2.email ? ({...el, ranking: user2.ranking ? user2.ranking += 1 : 1}) : (el)
     })
     setUserList(usrlst)

    //console.log(user2)
}

const decreaseRanking = (id) =>{
    const user2 = userList[id]

    const usrlst = userList.map((el) =>{
        return el.email === user2.email ? ({...el, ranking: user2.ranking >= 1 ? user2.ranking -= 1 : 0}) : (el)
     })
     setUserList(usrlst)
}

    return (
        
    <div>

    <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-vk-red">{a} Formulář 30 days - {countList}</h2>

    <Bar options={optionsMap} data={dataMap} redraw={true}/>

    <div className="mt-10 mb-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">

          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={button === 'Přidat' ? handleSubmit : updateChange}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-nevim sm:p-6">
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
          </div>
        </div>
      </div>

      <div className="grid my-10">
      <Banner message={messageToBanner} showBanner={banner} hideBanner={hideBanner} />
      </div>

    <div className="grid md:grid-cols-3 gap-2 text-center mb-10">
  {userList && userList.map((usr,i) => {
      
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
            )
        })}
    </div>

    </div>
    )
}
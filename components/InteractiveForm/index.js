import React, { useState, useEffect, useContext } from 'react'
import ContentfulApi from "@utils/ContentfulApi";
import {  } from "@utils/FormControl";
import Banner from "@components/Banner";
import { AppContext } from '../../context/state';
import { Profil } from "@components/InteractiveForm/Profil";
import { AddForm } from "@components/InteractiveForm/AddForm";

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


export const InteractiveForm = ({data}) => {
    const [userList, setUserList] = useState(data)
    
    const [currentItem, setCurrentItem] = useState([])
    const [currentItem2, setCurrentItem2] = useState({})
    const [banner, setBanner] = useState(false)
    const [messageToBanner, setMessageToBanner] = useState('')
    const [button, setButton] = useState('Přidat')
    const [currentFilter, setCurrentFilter] = useState('')
    const [filterList, setFilterList] = useState(data)

    const {countList, setCountList } = useContext(AppContext);

    const [dataMap, setDataMap] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: 'hodnocení',
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

  useEffect(() => {
    let localList = JSON.parse(localStorage.getItem('userList'));
    if (localList !== null) {
      setUserList(localList)
      //console.log(localList)
      console.log('uE[]' + a++)
    }
  }, []) // empty array as second argument will behave exactly like componentDidMount - means only one time in the beginning of render
  // in load [] useEffect then [userList] useEffect and [] useEffect set new setUserList and then it's trigger [userList] useEffect

  useEffect(() => {
    setCountList(userList.length)

    dataMap.labels = userList.map((el) => el.first_name)
    dataMap.datasets[0].data = userList.map((el) => el.ranking ? el.ranking : 0)

    setFilterList(userList)
    setDataMap(dataMap)
    localStorage.setItem('userList', JSON.stringify(userList))
    
    console.log('uE/userList' + a++)
    //console.log(dataMap.datasets[0].data)
    
  },[userList])

  useEffect(() => {
    const curItem = currentItem.reduce((obj, item) => ({
        ...obj,
        [item.name]: item.value
      }), {});
      setCurrentItem2(curItem)
  },[currentItem]) //protoze jsem blbec a spatne se mi cetlo y objektu tak jsem to nakopiroval do jineho ktere je pak ve value v input


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

    <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-vk-red">{a} Formulář 30 days - {countList} - localStorage</h2>

    <Bar options={optionsMap} data={dataMap} redraw={true}/>

    <div className="mt-10 mb-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">

          <div className="mt-5 md:mt-0 md:col-span-3">
<AddForm currentFilter={currentFilter} currentItem2={currentItem2} handleSubmit={handleSubmit} updateChange={updateChange} button={button} handleChange={handleChange} deleteForm={deleteForm} setCurrentFilter={setCurrentFilter} userList={userList} setFilterList={setFilterList}/>
          </div>
        </div>
      </div>

      <div className="grid my-10">
      <Banner message={messageToBanner} showBanner={banner} hideBanner={hideBanner} />
      </div>

    <div className="grid md:grid-cols-3 gap-2 text-center mb-10">
  {filterList && filterList.map((usr,i) => {
      return (
<Profil currentItem2={currentItem2} usr={usr} i={i} changeUser={changeUser} deleteUser={deleteUser} increaseRanking={increaseRanking} decreaseRanking={decreaseRanking}/>
            )
        })}
    </div>

    </div>
    )
}
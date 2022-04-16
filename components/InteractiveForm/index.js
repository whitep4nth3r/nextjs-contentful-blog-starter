import React, { useState, useEffect } from 'react'
import ContentfulApi from "@utils/ContentfulApi";
import { Result } from 'postcss';





export const InteractiveForm = ({data}) => {
    const [userList, setUserList] = useState(data)
    const [countList, setCountList] = useState(null)
    const [currentItem, setCurrentItem] = useState([])
    const [currentItem2, setCurrentItem2] = useState({})

  useEffect(() => {
    setCountList(userList.length)
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
  }, []) // empty array as second argument will behave exactly like componentDidMount
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

    //const fin = userList.find((el) => el.email === curRes.email)
    setUserList(prevUserList => {
        return [...prevUserList,curRes]
    })
    setCurrentItem([])
  }

const deleteUser = (e,id) =>{
    const res = userList.filter((el,i) => i !== id)
    setUserList(res)
}

    return (
    <div>
    <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-vk-red">Formulář 30 days - {countList}</h2>
 

    <div className="mt-10 mb-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">

          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-nevim sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First name
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
                        Last name
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
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-solid border-gray-300"
                      />
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


    <div className="grid md:grid-cols-3 gap-2 text-center mb-10">
  {userList && userList.map((usr,i) => {
        return (
            <div key={i}>
            <div className="block rounded-lg shadow-lg bg-white mb-2">
              <div className="overflow-hidden rounded-t-lg h-28 bg-nevim"></div>
              <div className="w-24 -mt-12 overflow-hidden border border-2 border-white rounded-full mx-auto bg-white">
                <img src={usr.avatar} />
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-semibold mb-4">{usr.first_name} {usr.last_name}</h4>
                <hr />
                <div className="grid md:grid-cols-2 gap-2 pt-5 text-center">
                <button className="text-sm text-sky-500 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                type="button">
                <i className="fas fa-delete"></i> Upravit </button>
                <button onClick={(e) => deleteUser(e,i)} className="text-sm text-sky-500 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                type="button">
                <i className="fas fa-delete"></i> Smazat </button>
                </div>
                <p className="mt-2">
                  {usr.email}
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



    /*
    async function fetchMoviesJSON() {
        const response = await fetch('https://reqres.in/api/users?page=2');
        const movies = await response.json();
        return movies;
      }
      fetchMoviesJSON().then(movies => {
        console.log(movies.data); // fetched movies
      });

    const test = async () =>{
        const rest = async () =>{
        return await fetch('https://reqres.in/api/users?page=2')
        .then(res => res.json())
        .then(data => data.data);
        }
        const test2 = await rest()
        setUserList(test2)
    }
    test();
    

  useEffect(() => {
    /*fetch("https://dog.ceo/api/breeds/image/random/3")
    .then(response => response.json())
    .then(data => setDogImage(data.message))

    const getUsers = () =>{
    return fetch('https://reqres.in/api/users?page=2')
    .then(res => res.json())
    .then(data => setUserList(data.data));
    }
    getUsers();
  },[])
  */
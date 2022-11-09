import React, { useState, useEffect } from "react";



function useFetch(endpoint) {
  const URL = "http://localhost:3000/"

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)


  useEffect(()=>{
    // console.log("fetching")

    async function fetchData() {
      setLoading(true)
      await fetch(URL + endpoint)
      .then(response=>{
        if(response.ok){
         response.json().then((i)=>
         setData(i))
        }
      })
      .catch(err =>{
        return (err)
      })
      setLoading(false)

      // console.log(res)
    }
    fetchData()

  }, [endpoint])

  // console.log(data)

  return [loading, data]
}

export default useFetch
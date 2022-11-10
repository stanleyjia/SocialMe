const SERVER_HOST = "http://localhost:3000/"
export function fetchData(endpoint, args={}) {
  // console.log(endpoint)
  return fetch(SERVER_HOST + endpoint,
    {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(args)
  })
  .then(response=>{
    if(response.ok){
      // console.log(response)
      // console.log(response.json())
       return response.json()
    }
  })
  .catch(err =>{
    return (err)
  })
}
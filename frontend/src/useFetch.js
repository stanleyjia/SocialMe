import React, { useState, useEffect } from "react";

function useFetch(endpoint, args={}) {
  const URL = "http://localhost:3000/";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // console.log("fetching")

    async function fetchData() {
      setLoading(true);
      await fetch(URL + endpoint, {
        method: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log(response.json());
            response.json().then((i) => setData(i));
          }
        })
        .catch((err) => {
          return err;
        });
      setLoading(false);

      // console.log(res)
    }
    fetchData();
  }, [endpoint, args]);

  // console.log(data)

  return [loading, data];
}

export default useFetch;

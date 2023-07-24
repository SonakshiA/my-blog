import { useState, useEffect } from "react";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] = useState(null);


    useEffect(() => {
        const abortContr = new AbortController();
        setTimeout(() => { //setTimeout to stimulate the idea of request taking time
          fetch(url, { signal: abortContr.signal })
              .then(res => {
                  if(!res.ok){
                      throw Error('Could not fetch data');
                  }
                  return res.json() //async function as well, returns data
              })
              .then(data => {
                  setData(data);
                  setIsPending(false);
                  setError(null); //if fetch is succesful
              })
              .catch(err => {
                  if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                  }else{
                    setError(err.message);
                    setIsPending(false); //so loading message is not seen
                  }
              })
  
        },1000)

        return () => abortContr.abort() //cleanup function. When the component using useFetch() unmounts, this function is fired
      }, [url]); //runs after first render and whenever 'url' changes

    return { data, isPending, error };
}

export default useFetch;


//useFetch is a custom hook. All hooks must start from the word 'use' in React.js

//custom hooks make the code reusable for any url/endpoint

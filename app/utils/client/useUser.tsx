'use client'
import axios from "axios";
import useSWR from "swr";


const fetcher = (url:string)=> axios.get(url)

export default function useUser () {
    const { data} = useSWR(`/api/users/me`, fetcher)
   console.log(data);
   
    return data
  }
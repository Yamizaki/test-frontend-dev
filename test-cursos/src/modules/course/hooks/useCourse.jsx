import React, { use, useEffect, useState } from 'react'
import { authStore } from '../../auth/store/auth-store';
import axios from 'axios';

export const useCourse = () => {

  const {userToken} = authStore()
  const header = `Bearer ${userToken}`;

  const [course, setCourse] = useState([])

  const getCourses = async () => {
    try{
      const response = await axios.get("/api/api/modulos",{ headers: { 'Authorization': header } });
      if(response.status === 200){
        setCourse(response.data)
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getCourses()
  },[])

  return{
    course
  }
}

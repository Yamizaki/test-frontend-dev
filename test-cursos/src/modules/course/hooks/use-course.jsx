import React, { use, useEffect, useState } from 'react'
import { authStore } from '../../auth/store/auth-store';
import axios from 'axios';
import { courseStore } from '../store/course-store';

export const useCourse = () => {

  const { course, setCourse } = courseStore()
  const { userToken } = authStore()
  const header = `Bearer ${userToken}`;


  const getCourses = async () => {
    try {
      const response = await axios.get("/api/api/modulos", { headers: { 'Authorization': header } });
      if (response.status === 200) {
        setCourse(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  return {
    course
  }
}

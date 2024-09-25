"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SingleAllCheckIn from './components/SingleAllCheckIn'
import CheckInModal from './components/CheckInModal'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase/firebaseConfig'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export interface Data {
    id: string;
    image: string;
    title: string
    updateAt: string
    createAt:string
}
const AllCheckins = () => {
    const [isShowAddModal, setIsShowAddModal] = useState(false)
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState<Data[]>([])
    const collectionRef = collection(db, "/users");
    useEffect(() => {
        async function getData() {  
            try {
                setLoading(true)
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Data[];
                setData(data)
                setLoading(false)   
            } catch (error) {
                setLoading(false)
                console.log(error,"error")
            }
        } 
        getData()
    }, [collectionRef])
    return (
      <>
      <div className='pt-5 px-11'>
          <Header />
          <Hero setIsShowAddModal={setIsShowAddModal} />
          <div className='flex justify-between items-center mt-10'>
              <h3 className='text-3xl font-medium'>Added CheckIns</h3>
            <ListOutlinedIcon/>
                </div>
        {loading && <Box >
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            </Box>}
        <div className='py-6 grid gap-8 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 place-items-center'>
                    {data?.map((item) => {
                        return (
                            <SingleAllCheckIn {...item} key={`${item.id+item.title}`}/>
                )
            })}
          </div>
            </div>
            <CheckInModal open={ isShowAddModal} setOpen={setIsShowAddModal} />
      </>
  )
}

export default AllCheckins
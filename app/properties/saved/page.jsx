'use client'
import React, { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
import { toast } from 'react-toastify'
import PropertyCard from '@/components/PropertyCard'

const page = () => {

    const [properties , setProperties] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchSavedProperties = async () => {
            try{
                const res = await fetch('/api/bookmarks')

                if(res.status == 200){
                    const data = await res.json()
                    setProperties(data)
                }
                else{
                    console.log(res.statusText)
                    toast.error('Failed to fetch properties')
                }
            }
            catch(error){
                console.log(error)
                toast.error('Failed to fetch properties')
            }
            finally{
                setLoading(false)
            }
        }

        fetchSavedProperties()
    } , [])

  return loading ? <Spinner loading = {loading}/> : (
    <section class="px-4 py-6">
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
      <div class="container-xl lg:container m-auto px-4 py-6">
        { properties.length == 0 ? <p>No saved found</p> : (
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            { properties.map((property) => (
              <PropertyCard key={property._id} property={property}/>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default page
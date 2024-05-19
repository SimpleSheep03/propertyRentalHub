'use client'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import Message from './Message'

const Messages = () => {

    const [messages , setMessages] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await fetch('/api/messages')

                if(res.status == 200){
                    const data = await res.json()
                    setMessages(data)
                }
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }

        }

        getMessages()
    } , [])

  return loading ? <Spinner loading={loading}/> : (
    <section className="bg-blue-50">
      {<div className="container m-auto py-24 max-w-6xl">
        {messages.length == 0 ? <p>You have no messages</p> : (
            messages.map((message) => (
                <Message key={message._id} message = {message}/>
            ))
        )}
      </div>}
    </section>
  )
}

export default Messages
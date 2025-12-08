import React, { useContext, useState } from 'react'
import { ProfileContext } from './context/context'

const Contact = () => {
  const {contactRef} = useContext(ProfileContext)
   const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    console.log("Form Submitted:", formData);
    // You can send the data to an API route here

    // Clear fields after submit
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div  className="md:h-screen py-10 md:py-0 w-screen justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden" ref={contactRef} >
       <form onSubmit={handleSubmit} className="flex flex-col gap-4  mx-auto  border p-5 sm:p-20 rounded-[10px]  px-5 py-10 lg:py-[96px] max-w-[592px] w-full">
      <div className='w-full justify-center text-center ' >
        <h1 className='text-4xl josefin font-bold mb-10'>Get In Touch</h1>
      </div>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        // rows="4"
        className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition border"
      >
        Send Message
      </button>
    </form>
    </div>
  )
}

export default Contact
import React, { useContext, useState } from "react";
import { ProfileContext } from "./context/context";
import { GithubIcon } from "@/lib/GithubIcon";
import { LinkedInIcon } from "./LinkedinIcon";
import { InstagramIcon } from "./InstagramIcon";
import { TextAnimate } from "./ui/text-animate";

const Contact = () => {
  const { contactRef } = useContext(ProfileContext);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
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
    <div
      className="md:h-[80vh] py-7 md:py-0 w-screen justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden"
      ref={contactRef}
    >
       <div className='flex flex-col gap-y-5 my-5 text-center ' >
        <h1 className='text-xl sm1:text-4xl  font-bold ' >Get In Touch</h1>
         <TextAnimate animation="blurInUp" by="character"  startOnView={true} once={false} className='text-[16px] sm1:text-[18px]' > Feel free to reach out if you'd like to collaborate or have a project in mind. I'm always open to new opportunities and interesting conversations.
</TextAnimate>
         
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  mx-auto  border-b p-5 sm:pb-10 rounded-[10px]  px-5 py-10 lg:py-[29px] max-w-[592px] w-full"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border backdrop-blur-md bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border backdrop-blur-md bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          // rows="4"
          className="p-3 border backdrop-blur-md bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        {/* <div className=' bg-gray-400/2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5s border border-gray-100'> */}

        <button
          type="submit"
          className=" backdrop-blur-md bg-white/5 text-white py-3 rounded-lg font-semiboldhover:bg-blue-700 ransition border "
        >
          Send Message
        </button>
        {/* </div> */}
         <div className="flex flex-col justify-center items-center"  >
             <span className="my-2 text-xl font-bold" >OR</span>
             <div className='flex gap-x-5 sm1:gap-x-10 items-center text-white mt-2'>

           <a href="https://github.com/Ramprasadya" target='_blank'><GithubIcon/></a>
            <a href="https://www.linkedin.com/in/ramprasad-yadav-29bba337a" target='_blank'><LinkedInIcon/></a>

           <a href="https://www.instagram.com/iamyadavram" target='_blank'><InstagramIcon/></a>
             </div>

        </div>
      </form>
      <div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react'
import Title from './Title'
import { assets } from '../assets/data'

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 ! pt-36">
     {/*container*/}
     <div className="flex items-center flex-col lg:flex-row gap-3.5">
      {/*info - left side*/}
      <div>
        <Title
         title1={"Your Trusted Real Estate Partner"}
          title2={"Helping You Every Step Of The Way"}
          para={"Trust, Clarity, and simplicity are at the core of everything we do to make your property journey easy."}
          titleStyles={'mb-10'}
         />
         <div className='flex flex-col gap-6 mt-5'>
          <div className='flex gap-3'>
            <img src={assets.calendarSecondary} alt=""  width={20}/>
            <p>In-app scheduling for property viewing</p>
          </div>
           <div className='flex gap-3'>
            <img src={assets.graph} alt=""  width={20}/>
            <p>Real-time market price update</p>
          </div>
           <div className='flex gap-3'>
            <img src={assets.map} alt=""  width={20}/>
            <p>Useer-friendly interface for smooth navigation</p>
          </div>
           <div className='flex gap-3'>
            <img src={assets.pound} alt=""  width={20}/>
            <p>Access to off-market properties</p>
          </div>
         </div>
         {/*rating*/}
         <div className="flex items-center divide-x divide-gray-300">
            <div className="flex -space-x-3 pr-3">
                
                <img src={assets.client1} 
                alt="image" 
                width={20}
                className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1 hover:z-10 "  />

                <img src={assets.client2} 
                alt="image" 
                width={20}
                className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1 hover:z-10" />

                <img src={assets.client3} 
                alt="image" 
                width={20}
                className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1 hover:z-10" />

                <img src={assets.client4} 
                alt="image" 
                width={20}
                className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1 hover:z-10" />
               
            </div>
            <div className="pl-3">
                <div className="flex items-center">
                   <img src={assets.star} alt="starIcon" width={17} />
                   <img src={assets.star} alt="starIcon" width={17} />
                   <img src={assets.star} alt="starIcon" width={17} />
                   <img src={assets.star} alt="starIcon" width={17} />
                   <img src={assets.star} alt="starIcon" width={17} />
                    <p className="text-gray-600 medium ml-2">5.0</p>
                </div>
                <p className="text-sm text-gray-500">Trusted by <span className="font-medium text-gray-800">100,000+</span> users</p>
            </div>
        </div>
      </div>
      {/* image right side*/}
      <div className="flex-1"></div>
      <div className="relative flex justify-end">
        <img src={assets.about} alt="aboutImg" className="rounded-3x1" />
      </div>
     </div>
    </section>
  )
}

export default About
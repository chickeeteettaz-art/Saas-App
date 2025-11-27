import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';

const Page = () => {
  return (
    <main>
        <h1 className='text-2xl underline'>Popular Companions</h1>

        <section className='home-section'>
          <CompanionCard 
          id = "123"
          name="Neura the Brainy Eplorer"
          topic = "Neural Network of the Brain"
          subject = "Science"
          duration ={45}
          color = "#ffda6e"/>

          <CompanionCard 
          id = "2"
          name="County the number wizard"
          topic = "Derivatives and integrals"
          subject = "Mathematics"
          duration ={40}
          color = "#e5d0ff"/>

          <CompanionCard 
          id = "3"
          name="Verba the vocubalary builder"
          topic = "Language"
          subject = "English Literature"
          duration ={30}
          color = "#bde7ff"/>
         
        </section>

        <section className='home-section'>
          <CompanionsList
            title="Recently completed sessions"
            companions = {recentSessions}
            classNames = "w-2/3 max-lg:w-full"
          />
          <CTA/>
        </section>  
        <Button>Lets do it!</Button>
    </main>
  )
}

export default Page


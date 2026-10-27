import React from 'react'
import HowItWorkItem from './HowItWorkItem'
import { ContentItem } from '../../types/content'

export default function index() {
    const items :ContentItem[] =[
        {
            id:1,
            title:"Create",
            description:'Write a SKILL.md, describe it to AI, or import one you already have.'
            
        },
        {
           id:  2,
           title: "Keep",
            description:"One library for all your skills, with their files attached."
        },
        {
          id :3,
          title:  "Share",
          description:  "Send a link. Others can preview, copy or download it as a zip."
        }
    ]
    return (
        <section
            className="relative overflow-hidden my-3"
            aria-labelledby="pain-point-heading"
        >
            <div className="container mx-auto px-4 py-14  ">
                {/* Heading */}
                <div className='py-2'>
                    <h2
                        id="pain-point-heading"
                        className="text-3xl font-semibold tracking-tight leading-tight md:text-[56px]"
                    >
                        Make it. Keep it. Share it.
                    </h2>
                    <span className="text-muted-foreground">From a blank file to a skill anyone can open.
                    </span>
                </div>
            </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {items.map(item=>(
                            <HowItWorkItem item={item} key={item.id} />

                        ))

                        }
                          
                    </div>
        </section>
    )
}

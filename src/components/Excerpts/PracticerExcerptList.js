import React, { useContext, useEffect, useState } from "react"
import { ExcerptContext } from "./ExcerptProvider"
import { Excerpt } from "./Excerpt"
import { Heading } from "grommet";


export const PracticerExcerptList = (props) => {
    const { getExcerptByMusician } = useContext(ExcerptContext)
   
    const [filteredExcerpts, setFilteredExcerpts] = useState([])

    useEffect(() => {
        getExcerptByMusician(props.practicerId)
            .then(setFilteredExcerpts)
    }, [])


    return (
        <section>
            <Heading level="3">Excerpts</Heading>
            <div className="excerpts">

                {
                    filteredExcerpts.map(excerpt => {

                        return excerpt.done === false ? <Excerpt key={excerpt.id} excerpt={excerpt} {...props} /> : ""
                    })

               }

            </div>
        </section>
    )
}

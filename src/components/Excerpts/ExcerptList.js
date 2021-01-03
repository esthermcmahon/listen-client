import React, { useContext, useEffect, useState } from "react"
import { ExcerptContext } from "./ExcerptProvider"
import { Excerpt } from "./Excerpt"
import { MusicianContext } from "../Musicians/MusicianProvider"


export const ExcerptList = (props) => {
    const { excerpts, getExcerpts, getExcerptByMusician } = useContext(ExcerptContext)
    const { getCurrentUser } = useContext(MusicianContext)

    const [filteredExcerpts, setFilteredExcerpts] = useState([])

    const [change, setChange] = useState(false)

    const func = () => {
        change ? setChange(false) : setChange(true)

    }

    useEffect(() => {
        getCurrentUser()
            .then((user) => getExcerptByMusician(user.id))
            .then(setFilteredExcerpts)
    }, [change])


    return (
        <section>
            <h3>Excerpts</h3>
            <div className="excerpts">

                {
                    filteredExcerpts.map(excerpt => {

                        return excerpt.done === false ? <Excerpt key={excerpt.id} excerpt={excerpt} {...props} func={func}/> : ""
                    })

                }

            </div>
            
        </section>
    )
}

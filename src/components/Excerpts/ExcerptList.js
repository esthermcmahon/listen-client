import React, { useContext, useEffect, useState } from "react"
import { ExcerptContext } from "./ExcerptProvider"
import { Habit } from "./Habit"


export const ExcerptList = (props) => {
    const { excerpts, getExcerpts } = useContext(ExcerptContext)

    const [filteredExcerpts, setFilteredExcerpts] = useState([])

    useEffect(() => {
        getExcerpts()
    }, [])

    useEffect(() => {
        setFilteredHabits(habits.filter(habit => habit.userId === parseInt(localStorage.getItem("BetterMe__user"))))
    }, [habits])
    


    return (
        <section>
            <h3>Habits</h3>
            <div className="habits">

                {
                    filteredHabits.map(habit => {

                        return habit.archive === false ? <Habit key={habit.id} habit={habit} {...props} /> : ""
                    })

                }
            </div>
        </section>
    )
}

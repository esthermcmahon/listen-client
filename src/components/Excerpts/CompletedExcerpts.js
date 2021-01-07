import React, { useContext, useEffect, useState } from "react"
import { ExcerptContext } from "./ExcerptProvider"
import { Link } from "react-router-dom"
import { MusicianContext } from "../Musicians/MusicianProvider"
import { Add } from "grommet-icons"
import "./extra.css"
import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CheckBox,
    CardHeader,
    Heading,
    Text,
} from "grommet";


export const CompletedExcerpts = (props) => {
    const { excerpts, getExcerpts, getExcerptByMusician, undone } = useContext(ExcerptContext)
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
            <h3>Completed</h3>
            <div className="excerpts">

                {
                    filteredExcerpts.map(excerpt => {

                        return excerpt.done === true ?
                            <Box key={excerpt.id} width="medium">
                                <Card
                                    className="container__cardContent"
                                    background="light-1"
                                    margin="small"
                                    pad="xsmall"
                                    width="medium"
                                    className="completedCard"
                                >

                                    <CardHeader>
                                        <Anchor
                                            color="brand"
                                            as={Link}
                                            to={{ pathname: `/excerpts/${excerpt.id}` }}
                                        >
                                            <CardHeader>
                                                <Text margin="xsmall" weight="bold">{excerpt.name}</Text>
                                            </CardHeader>
                                        </Anchor>
                                    </CardHeader>
                                    {excerpt.created_by_current_user ?
                                        <Button
                                            primary
                                            onClick={() => undone(excerpt.id).then(func)}
                                            icon={<Add />}
                                            label="Add to Dashboard"
                                            className="excerptDetailsButton"
                                            margin="small"
                                            pad="small"
                                            
                                        /> : ""

                                    }


                                </Card>
                            </Box>



                            : ""
                    })

                }

            </div>
        </section>
    )
}
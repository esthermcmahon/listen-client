import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { ExcerptContext } from "./ExcerptProvider"
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "grommet";



export const Excerpt = (props) => {
    const { getExcerptById, excerpts, getExcerpts } = useContext(ExcerptContext)
    
    const [excerpt, setExcerpt] = useState({})

    useEffect(() => {
        const excerptId = parseInt(props.excerpt.id)
        getExcerptById(excerptId)
            .then(setExcerpt)
  
            
    }, [])





    return (
        <Box key={excerpt.id} width="medium">
                  <Card
                    className="container__cardContent"
                    background="light-1"
                    margin="small"
                    pad="xsmall"
                    width="medium"
                  >
                    <Anchor
                      color="brand"
                      as={Link}
                      to={{ pathname: `/excerpts/${excerpt.id}` }}
                    >
                      <CardHeader>
                        <Text weight="bold">{excerpt.name}</Text>
                      </CardHeader>
                    </Anchor>
    
                  </Card>
        </Box>

    )

    }
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { ExcerptContext } from "./ExcerptProvider"
import {
  Anchor,
  Box,
  Card,
  CheckBox,
  CardHeader,
  Text,
} from "grommet";





export const Excerpt = (props) => {
  const { getExcerptById, done } = useContext(ExcerptContext)

  const [excerpt, setExcerpt] = useState({})

  const [checked, setChecked] = useState(false)

  const [change, setChange] = useState(false)

  useEffect(() => {
    const excerptId = parseInt(props.excerpt.id)
    getExcerptById(excerptId)
      .then(setExcerpt)
  }, [change])

  const handleChange = (event) => {
    setChecked(event.target.checked)
    done(excerpt.id)
    props.func()
  }



  return (
    <>

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
          {excerpt.created_by_current_user ?
            <>
              <CheckBox
                checked={checked}
                onChange={handleChange}
              />

            </> : ""
          }


        </Card>
      </Box>

    </>

  )

}
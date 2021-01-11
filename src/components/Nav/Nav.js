//renders nav links that redirect user to various paths
import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { MusicianContext } from "../Musicians/MusicianProvider"
import { Anchor, Box, Heading, Image, Nav, Text } from "grommet"
import Logo from "../images/sheetmusic.png"

export const NavBar = () => {
    const history = useHistory()

   

    return (
        <Nav direction="row-responsive" background="brand" className="navbar" pad="small" align="baseline">
            <Image alignSelf="center" src={Logo} height="150px" />
            <Box>
                <Box margin={{ bottom: "medium" }}>
                    <Heading color="text-weak" level="1" margin={{ bottom: "0" }}>Listen</Heading>
                </Box>
                <Box direction="row-responsive" gap="small" align="baseline">
                    <Anchor color="text-weak" as={Link} className="navbar__link" to="/home" label="Dashboard" />
                    <Anchor color="text-weak" as={Link} className="navbar__link" to="/excerpts/create" label="New Excerpt" />
                    <Anchor color="text-weak" as={Link} className="navbar__link" to="/connections" label="My Connections" />
                    <Anchor color="text-weak" as={Link} className="navbar__link" to="/completed" label="Completed" />

                    {
                        (localStorage.getItem("listen_user_id") !== null) ?
                            <Anchor color="text-weak" as={Link} className="navbar__item__fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("listen_user_id")
                                    history.push({ pathname: "/" })
                                }}
                                label="Logout" />
                            :
                            <>
                                <Anchor as={Link} className="nav-link" to="/login" label="Login" />
                                <Anchor as={Link} className="nav-link" to="/register" label="Register" />
                            </>
                    }
                </Box>
            </Box>
        </Nav>
    )
}
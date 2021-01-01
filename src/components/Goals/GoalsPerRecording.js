//module to render goals for a specific recording
import React, { useEffect, useContext, useState } from "react";
import { GoalContext } from "./GoalProvider";
import { RecordingContext } from "../Recordings/RecordingProvider"
import { Button, Box, Heading, List, Text, Card, Menu } from "grommet";
import { Link } from "react-router-dom";
import { Edit, More, Trash } from "grommet-icons";
import { DeleteGoal } from "./DeleteGoal"

export const GoalsPerRecording = (props) => {
    const { getGoalByRecording, deleteGoal } = useContext(GoalContext);

    const [goals, setGoals] = useState([])

    const [change, setChange] = useState(false)

    const func = () => {
        change ? setChange(false) : setChange(true)

    }

    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    const relatedExcerpt = props.relatedExcerpt

    //gets the goals from the database
    useEffect(() => {
        getGoalByRecording(props.recordingId)
            .then(setGoals);
    }, [change]);


    return (
        <Box>
            <Box className="" direction="row">
                <Box background="background-contrast" elevation="small">
                </Box>
                <Box>
                    {goals.map((goal) => {
                        return (
                            <>
                                <DeleteGoal open={open} onClose={onClose} goalId={goal.id} relatedExcerpt={relatedExcerpt} func={func}/>
                                <Box key={goal.id} width="medium">
                                    <Card className="container__cardContent" margin="small" pad="medium" background="#CCE1CE">
                                        <Heading level="3">{goal.category.label}</Heading>
                                        <Text>Goal: {goal.goal}</Text>
                                        <Text>Action: {goal.action}</Text>
                                        {relatedExcerpt.created_by_current_user ?
                                            <Box width="xsmall">
                                                <Menu
                                                    icon={<More />}
                                                    hoverIndicator
                                                    alignSelf="center"
                                                    size="small"
                                                    items={[
                                                        {
                                                            icon: (
                                                                <Box>
                                                                    <Edit />
                                                                </Box>
                                                            ),
                                                            onClick: () =>
                                                                props.history.push(`/editgoal/${goal.id}/${props.recordingId}`),
                                                        },
                                                        {
                                                            icon: (
                                                                <Box>
                                                                    <Trash />
                                                                </Box>
                                                            ),
                                                            onClick: () => onOpen(),
                                                            // onClick: () => deleteGoal(goal.id).then(func)
                                                        },
                                                    ]}
                                                />
                                            </Box>
                                            : ""
                                        }


                                    </Card>

                                </Box>
                            </>
                        )
                    })}
                </Box>
            </Box>
        </Box>

    );
};

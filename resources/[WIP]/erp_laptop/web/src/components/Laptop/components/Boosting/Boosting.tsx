import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Boosting.module.scss";
import { useNavigationState } from "../../atoms/navigation";
import { fetchNui } from "../../../../hooks/fetchNui";
import { Zoom, Typography, IconButton, Button, CircularProgress, LinearProgress } from "@mui/material";
import { Contract } from './Contract/Contract'

export const Boosting: React.FC = () => {
    const [navigationState, setNavigationState] = useNavigationState();
    const [boostingData, setBoostingData] = useState({
        Level: 'D',
        ProgLevel: 'C',
        Progress: 22
    });
    const [queueText, setQueueText] = useState('Join Queue');
    const [joiningQueue, setJoiningQueue] = useState(false);

    const fetchData = async () => {
        const result = await fetchNui('erp_laptop:boostingData')

        if (result) {
            setBoostingData(result)
        }

        const inQueue = await fetchNui('erp_laptop:boosting:isInQueue')

        if (!inQueue) {
            setQueueText('Join Queue')
        } else {
            setQueueText('Leave Queue')
        }
    }

    useEffect(() => {
        if (navigationState.path === 'Boosting') {
            fetchData();
        }
    }, [navigationState.path === 'Boosting'])

    return (
        <Zoom
            in={navigationState.path === "Boosting"}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.main}>
                <Draggable
                    handle="section"
                >
                    <div
                        className={styles.boostingContainer}
                    >
                        <section
                            className={styles.header}
                        >
                            <Typography
                                style={{
                                    color: "white",
                                    fontSize: "1.5vh"
                                }}
                            >
                                Boosting
                            </Typography>

                            <IconButton
                                className={styles.button}
                                style={{
                                    marginLeft: "93%",
                                    height: "3vh",
                                    width: "3vh"
                                }}

                                onClick={() => {
                                    setNavigationState({
                                        path: 'Home',
                                    });
                                }}
                            >
                                <i
                                    style={{
                                        fontSize: "2vh"
                                    }}
                                    className={
                                        "fa-solid fa-xmark"
                                    }
                                />
                            </IconButton>
                        </section>

                        <div
                            className={styles.Actions}
                            style={{
                                width: "100%",
                                marginTop: "3vh",
                                height: "4vh"
                            }}
                        >
                            <Button
                                style={{
                                    fontFamily: "Inter",
                                    float: "right",
                                    marginRight: "2vh",
                                    height: "4vh",
                                    width: "15vh",
                                    fontSize: "1.5vh",
                                    borderRadius: "0.25vh",
                                }}
                                disabled={joiningQueue}
                                variant="contained"
                                onClick={() => {
                                    setJoiningQueue(true)

                                    setTimeout(() => {
                                        setJoiningQueue(false)
                                        
                                        if (queueText === 'Join Queue') {
                                            fetchNui('erp_laptop:boosting:queueToggle', {
                                                Toggle: true
                                            })

                                            setQueueText('Leave Queue')
                                        } else {
                                            fetchNui('erp_laptop:boosting:queueToggle', {
                                                Toggle: false
                                            })

                                            setQueueText('Join Queue')
                                        }
                                    }, 1000)
                                }}
                            >
                                {joiningQueue &&
                                    <CircularProgress
                                        size={20}
                                        style={{
                                            height: "2vh",
                                            width: "2vh",
                                            marginRight: "1vh",
                                            color: '#fff',
                                        }}
                                    />
                                }
                                {queueText}
                            </Button>
                        </div>

                        <div
                            style={{
                                marginTop: "2vh"
                            }}
                        >
                            <Typography
                                style={{
                                    float: "left",
                                    marginLeft: "2vh",
                                    marginTop: "-1vh",
                                    color: "#fff",
                                    fontSize: "1.75vh",
                                    userSelect: 'none'
                                }}
                            >
                                {boostingData.Level}
                            </Typography>

                            <div
                                className={styles.Progress}
                                style={{
                                    height: "0.5vh",
                                    width: "92.5%",
                                    marginLeft: "5vh",
                                    borderRadius: "1vh",
                                    color: "white",
                                    fontSize: "2vh"
                                }}
                            >

                                <LinearProgress
                                    style={{
                                        borderRadius: 5,
                                        height: "0.5vh",
                                        width: "100%"
                                    }}
                                    variant="determinate"
                                    value={boostingData.Progress}
                                />
                            </div>

                            <Typography
                                style={{
                                    float: "right",
                                    marginRight: "2%",
                                    marginTop: "-1%",
                                    color: "#fff",
                                    fontSize: "1.75vh",
                                    userSelect: 'none'
                                }}
                            >
                                {boostingData.ProgLevel}
                            </Typography>
                        </div>

                        <Contract/>
                    </div>
                </Draggable>
            </div>
        </Zoom>
    )
}
import './Game.css';

import { useEffect, useState } from 'react';

import BackgroundCanvas from '../BackgroundCanvas/BackgroundCanvas';
import { Car } from '../../lib/utils';
import CarCanvas from '../CarCanvas/CarCanvas';
import CatCanvas from '../CatCanvas/CatCanvas';
import Cookies from 'universal-cookie';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { IPoint } from '../../Models';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Game = () => {

    const [carArray, setCarArray] = useState<Car[]>([])
    const [catPosition, setCatPosition] = useState<IPoint>({ x: 780, y: 400 });
    const [isCollision, setIsCollision] = useState<boolean>(false);
    const [catScore, setCatScore] = useState<number>(0);
    const [carScore, setCarScore] = useState<number>(0);
    const [timerFinished, setTimerFinished] = useState<boolean>(false);
    const cookies = new Cookies();

    const navigate = useNavigate()

    useEffect(() => {
        if (!isCollision) {
            carArray.forEach(position => {
                if ((catPosition.x < position.x + 51 && position.y + 110 > catPosition.y) && (catPosition.y + 32 > position.y && catPosition.x + 41 > position.x)) {
                    setIsCollision(true)
                }
            })
        }
    }, [catPosition, carArray, isCollision]);

    const createPlayer = async () => {
        const accessToken = cookies.get("Try_Token");
        const dataCreate = {
            score: catScore,
            accountId: 8,
            gameId: 1
        };
        const dataUpdate = {
            score: catScore,
            Id: 1,
            gameId: 1
        };
        try {
            const response = await axios.get(`https://localhost:7055/api/Player/GetPlayerById?id=8`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.data.value) {
                console.log("Create player")
                await axios.post(`https://localhost:7055/api/Player/CreatePlayer`, dataCreate, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        ContentType: 'application/json'
                    }
                })
            } else if (response.data.value.score < catScore) {
                console.log("Update player")
                console.log(dataUpdate.score)
                await axios.put(`https://localhost:7055/api/Player/UpdatePlayer`, dataUpdate, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        ContentType: 'application/json'
                    }
                })
            }
            navigate("/leaderboard");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (timerFinished) {
            createPlayer();
            navigate("/home");
        }
        if (timerFinished) {
            createPlayer();
            navigate("/home");
        }
    }, [timerFinished])

    return (<div>
        <div className='score'>
            <p className='cat-score'>Cat Score: {catScore}</p>
            <p className='car-score'>Car Score: {carScore}</p>
        </div>
        <div className='wrapperNew'>
            <BackgroundCanvas />
            <CatCanvas position={catPosition} setPosition={setCatPosition} isCollision={isCollision} setIsCollision={setIsCollision} catScore={catScore} setCatScore={setCatScore} carScore={carScore} setCarScore={setCarScore} />
            <CarCanvas carArray={carArray} setCarArray={setCarArray} />
        </div>
        <div className='timer-wrapper'>
            <CountdownCircleTimer
                isPlaying
                duration={5}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => setTimerFinished(true)}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    </div>
    );
};

export default Game;
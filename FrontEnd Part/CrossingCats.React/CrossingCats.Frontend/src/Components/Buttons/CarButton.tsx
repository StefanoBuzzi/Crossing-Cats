import { useEffect, useState } from 'react';

interface ICarButtonProps {
    index: number;
    addCar: (index: number, count: number) => void
}

const CarButton = (props: ICarButtonProps) => {
    const { index, addCar } = props;
    const [time, setTime] = useState<number>(0);
    const [pressed, setPressed] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    const addSpeed = () => {
        setCount(prevCount => prevCount + 1);
    };

    const getTimeBasedOnCount = (count: number) => {
        if (count === 0) {
            return 3;
        } else if (count === 1) {
            return 5;
        } else if (count >= 2) {
            return 7;
        }
        return 0;
    };

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (pressed && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            setPressed(false);
        }

        return () => clearInterval(interval);
    }, [pressed, time]);

    return (
        <div>
            <button className={`btn-${index + 1}-speed`} onClick={() => addSpeed()}>+</button>
            <button
                className={`btn-${index + 1}`}
                disabled={pressed}
                onClick={() => {
                    addCar(index, count);
                    setTime(getTimeBasedOnCount(count));
                    setPressed(true);
                    setCount(0);
                }}
            >
                {pressed ? time : "Lancia Auto"}
            </button>
        </div>
    )
};

export default CarButton;
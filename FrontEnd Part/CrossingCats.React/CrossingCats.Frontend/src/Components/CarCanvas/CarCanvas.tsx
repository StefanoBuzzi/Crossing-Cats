import { useEffect, useRef, useState } from 'react';

import { Car } from '../../lib/utils';
import CarButton from '../Buttons/CarButton';
import carSettings from '../../lib/carSettings';
import { carType } from '../../lib/types/carTypes';

interface ICarProps {
    carArray: Car[];
    setCarArray: React.Dispatch<React.SetStateAction<Car[]>>;
}

const CarCanvas = (props: ICarProps) => {

    const canvasRefCars = useRef<HTMLCanvasElement>(null);
    const [ctxCars, setCtxCars] = useState<CanvasRenderingContext2D | null>(null);
    const { carArray, setCarArray } = props;

    const animate = () => {
        ctxCars?.clearRect(0, 0, ctxCars.canvas.width, ctxCars.canvas.height);
        const newCarArray = carArray.map(car => {
            if (car.y > 0 - car.height && car.y < 1000) {
                car.handleCarMovement();
                car.drawCar();
            }
            return car;
        });
        setCarArray(newCarArray);

        requestAnimationFrame(() => animate());
    };

    const displayCars = () => {
        ctxCars?.clearRect(0, 0, ctxCars.canvas.width, ctxCars.canvas.height);
        carArray.forEach(car => {
            console.log(car.x);
            car.drawCar();
        });
        animate();
    };

    useEffect(() => {
        if (canvasRefCars.current) {
            const context = canvasRefCars.current.getContext('2d');
            if (context) {
                setCtxCars(context);
            }
        }
    }, []);

    useEffect(() => {
        if (ctxCars) {
            displayCars();
        }
    }, [carArray.length]);

    const addCar = (index: number, count: number) => {
        setCarArray([...carArray, new Car(
            canvasRefCars.current?.getContext('2d'),
            carSettings[index].x,
            carSettings[index].y,
            carSettings[index].direction,
            carSettings[index].lane,
            count
        )]);
    };

    return <>
        <canvas className='canvaCars center' ref={canvasRefCars} width='840px' height='840px' />
        {carSettings.map((_, index) => (
            <CarButton
                key={index}
                index={index}
                addCar={addCar}
            />
        ))}
    </>
}

export default CarCanvas
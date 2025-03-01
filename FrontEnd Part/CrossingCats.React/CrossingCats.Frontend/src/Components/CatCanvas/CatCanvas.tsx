import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ICatMovement } from '../../Indexes/IndexCatMovement';
import { IPoint } from '../../Models';

interface ICatCanvasProps {
    position: IPoint;
    setPosition: React.Dispatch<React.SetStateAction<IPoint>>;
    isCollision: boolean;
    setIsCollision: React.Dispatch<React.SetStateAction<boolean>>;
    catScore: number;
    setCatScore: React.Dispatch<React.SetStateAction<number>>;
    carScore: number;
    setCarScore: React.Dispatch<React.SetStateAction<number>>;
}

const CatCanvas = (props: ICatCanvasProps) => {
    const canvasRefCats = useRef<HTMLCanvasElement>(null);
    const [ctxCat, setCtxCat] = useState<CanvasRenderingContext2D | null>(null);
    const [catAnimation, setCatAnimation] = useState<boolean>(false);
    const [drawStart, setDrawStart] = useState<boolean>(false);
    const [draw, setDraw] = useState<boolean>(false);
    const [catImageSrc, setCatImageSrc] = useState<string>(ICatMovement.Left);
    const [triggerDraw, setTriggerDraw] = useState<boolean>(true);

    const { position, setPosition, isCollision, setIsCollision, catScore, setCatScore, carScore, setCarScore } = props;

    const drawCat = useCallback(() => {
        if (ctxCat && draw) {
            const catImage = new Image();
            catImage.src = catImageSrc;
            catImage.onload = () => {
                ctxCat.clearRect(0, 0, ctxCat.canvas.width, ctxCat.canvas.height);
                ctxCat.beginPath();
                ctxCat.drawImage(catImage, 0, 0, 200, 45, position.x, position.y, 200, 34);
                ctxCat.closePath();
            };
        }
    }, [position, ctxCat, catImageSrc, draw]);

    const animate = useCallback(() => {
        if (draw && (position.y > 0 && position.y < 840) && (position.x > 40 && position.x < 840)) {
            ctxCat?.clearRect(0, 0, ctxCat?.canvas.width, ctxCat?.canvas.height);
            drawCat();
        }
    }, [drawCat, ctxCat, draw, position]);

    const handleCatMovement = useCallback((source: ICatMovement) => {
        if (!draw) return;

        switch (source) {
            case ICatMovement.Up:
                setCatImageSrc(ICatMovement.Up);
                setPosition({ x: position.x, y: position.y - 20 });
                break;
            case ICatMovement.Down:
                setCatImageSrc(ICatMovement.Down);
                setPosition({ x: position.x, y: position.y + 20 });
                break;
            case ICatMovement.Left:
                setCatImageSrc(ICatMovement.Left);
                setPosition({ x: position.x - 20, y: position.y });
                break;
            case ICatMovement.Left2:
                setCatImageSrc(ICatMovement.Left2);
                setPosition({ x: position.x - 20, y: position.y });
                break;
            case ICatMovement.Right:
                setCatImageSrc(ICatMovement.Right);
                setPosition({ x: position.x + 20, y: position.y });
                break;
            case ICatMovement.Right2:
                setCatImageSrc(ICatMovement.Right2);
                setPosition({ x: position.x + 20, y: position.y });
                break;
        }
    }, [position, draw, setPosition]);

    const handleMovement = useCallback((e: KeyboardEvent) => {
        if (!draw) return;

        switch (e.key) {
            case 'ArrowLeft':
                handleCatMovement(catAnimation ? ICatMovement.Left : ICatMovement.Left2);
                setCatAnimation(!catAnimation);
                animate();
                break;
            case 'ArrowUp':
                handleCatMovement(ICatMovement.Up);
                animate();
                break;
            case 'ArrowRight':
                handleCatMovement(catAnimation ? ICatMovement.Right : ICatMovement.Right2);
                setCatAnimation(!catAnimation);
                animate();
                break;
            case 'ArrowDown':
                handleCatMovement(ICatMovement.Down);
                animate();
                break;
        }
    }, [handleCatMovement, animate, catAnimation, draw]);

    useEffect(() => {
        if ((!drawStart && !!ctxCat) || !isCollision) {
            drawCat();
            setDrawStart(true);
        }
    }, [ctxCat, drawStart, drawCat, isCollision]);

    useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => window.removeEventListener('keydown', handleMovement);
    }, [handleMovement]);

    useEffect(() => {
        setCtxCat(canvasRefCats.current!.getContext('2d'));
    }, []);

    useEffect(() => {
        if (position.x <= 80) {
            setCatScore(catScore + 10);
            ctxCat?.clearRect(0, 0, ctxCat?.canvas.width, ctxCat?.canvas.height);
            setPosition({ x: 780, y: 400 });
            setTriggerDraw(true);
            setDraw(false);
        }
    }, [position, setCatScore, catScore, setPosition, ctxCat]);

    useEffect(() => {
        if (isCollision) {
            setIsCollision(false);
            setCatScore(catScore - 5);
            setCarScore(carScore + 10);
            ctxCat?.clearRect(0, 0, ctxCat?.canvas.width, ctxCat?.canvas.height);
            setPosition({ x: 780, y: 400 });
            setTriggerDraw(true);
            setDraw(false);
        }
    }, [isCollision, setIsCollision, setCatScore, catScore, setPosition, ctxCat, carScore, setCarScore]);
 
    const handleButtonClick = () => {
        setDraw(true);
        setTriggerDraw(false);
        drawCat();
    };

    return (
        <div style={{ position: 'relative' }}>
            <canvas className='canvaCats center' ref={canvasRefCats} width='840px' height='840px' />
            {triggerDraw && (
                <button
                    className='btn-spawn-cat'
                    onClick={handleButtonClick}
                >
                    Draw Cat
                </button>
            )}
        </div>
    );
};

export default CatCanvas;
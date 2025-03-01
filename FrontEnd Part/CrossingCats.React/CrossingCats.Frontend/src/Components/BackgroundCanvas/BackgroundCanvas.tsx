import { useEffect, useRef, useState } from 'react';

import { Background } from '../../Indexes/IndexBackgrounds';
import { DrawBackground } from '../../Backgrounds';

const BackgroundCanvas = () => {
    const canvasRefBackground = useRef<HTMLCanvasElement>(null);
    const [ctxBackground, setCtxBackground] = useState<CanvasRenderingContext2D | null>(null);

    let type = Background.classic;

    useEffect(() => {
        setCtxBackground(canvasRefBackground.current!.getContext('2d'));
    }, []);

    useEffect(() => {
        DrawBackground(ctxBackground, type);
    }, [ctxBackground]);

    return <>
        <canvas className='canvaBackground center' ref={canvasRefBackground} width='840px' height='840px' />
    </>
}

export default BackgroundCanvas
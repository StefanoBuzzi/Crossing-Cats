import { Background, Streets } from './Indexes/IndexBackgrounds';

const imageDesert = new Image();
imageDesert.src = 'https://crossingcatsstorage.blob.core.windows.net/images/BeachSandBackground.png';

const imageRainbow = new Image();
imageRainbow.src = 'https://crossingcatsstorage.blob.core.windows.net/images/RainbowBackground.png';

const rainbowRoadBackground = new Image();
rainbowRoadBackground.src = 'https://crossingcatsstorage.blob.core.windows.net/images/BlackSkyBackground.png';

const imageOriginPoint = { x: 0, y: 0 };
const originPoint = { x: 40, y: 0 };

const DrawBackground = (context: CanvasRenderingContext2D | null, backgroundType: { color1: string; color2: string; color3: string }) => {
    if (context) {
        switch (backgroundType) {
            case Background.desert:
                imageDesert.addEventListener('load', () => {
                    context.drawImage(imageDesert, imageOriginPoint.x, imageOriginPoint.y, 135, 160, originPoint.x, originPoint.y, 120, 840);
                    context.drawImage(imageDesert, imageOriginPoint.x, imageOriginPoint.y, 80, 160, 400, 0, 80, 840);
                    context.drawImage(imageDesert, imageOriginPoint.x, imageOriginPoint.y, 120, 258, 720, 0, 120, 840);
                });
                break;
            case Background.rainbow:
                imageRainbow.addEventListener('load', () => {
                    context.drawImage(imageRainbow, imageOriginPoint.x, imageOriginPoint.y, 1333, 1333, 160, 0, 400, 1400);
                    context.drawImage(imageRainbow, imageOriginPoint.x, imageOriginPoint.y, 1333, 1333, 480, 0, 400, 1400);
                });
                rainbowRoadBackground.addEventListener('load', () => {
                    context.drawImage(rainbowRoadBackground, imageOriginPoint.x, imageOriginPoint.y, 512, 512, originPoint.x, originPoint.y, 120, 840);
                    context.drawImage(rainbowRoadBackground, imageOriginPoint.x, imageOriginPoint.y, 512, 512, 400, 0, 80, 840);
                    context.drawImage(rainbowRoadBackground, imageOriginPoint.x, imageOriginPoint.y, 512, 512, 720, 0, 120, 840);
                });
                break;
        }

        context.setLineDash([]);
        context.fillStyle = backgroundType.color1;
        context.fillRect(originPoint.x, originPoint.y, 120, 840);
        context.fillRect(400, 0, 80, 840);
        context.fillRect(720, 0, 120, 840);

        context.fillStyle = backgroundType.color2;
        context.fillRect(160, 0, 240, 840);
        context.fillRect(480, 0, 240, 840);

        context.beginPath();
        // 800 = (7x + 1.5x(2))
        context.moveTo(Streets.leftStreet.firstLine.startPoint.x, Streets.leftStreet.firstLine.startPoint.y);
        context.lineTo(Streets.leftStreet.firstLine.endPoint.x, Streets.leftStreet.firstLine.endPoint.y);

        context.moveTo(Streets.leftStreet.fourthLine.startPoint.x, Streets.leftStreet.fourthLine.startPoint.y);
        context.lineTo(Streets.leftStreet.fourthLine.endPoint.x, Streets.leftStreet.fourthLine.endPoint.y);

        context.moveTo(Streets.rightStreet.firstLine.startPoint.x, Streets.rightStreet.firstLine.startPoint.y);
        context.lineTo(Streets.rightStreet.firstLine.endPoint.x, Streets.rightStreet.firstLine.endPoint.y);

        context.moveTo(Streets.rightStreet.fourthLine.startPoint.x, Streets.rightStreet.fourthLine.startPoint.y);
        context.lineTo(Streets.rightStreet.fourthLine.endPoint.x, Streets.rightStreet.fourthLine.endPoint.y);

        context.lineWidth = 3;
        context.strokeStyle = backgroundType.color3;
        context.stroke();
        context.fill();

        context.beginPath();
        context.setLineDash([14, 11]);

        context.moveTo(Streets.leftStreet.secondLine.startPoint.x, Streets.leftStreet.secondLine.startPoint.y);
        context.lineTo(Streets.leftStreet.secondLine.endPoint.x, Streets.leftStreet.secondLine.endPoint.y);

        context.moveTo(Streets.leftStreet.thirdLine.startPoint.x, Streets.leftStreet.thirdLine.startPoint.y);
        context.lineTo(Streets.leftStreet.thirdLine.endPoint.x, Streets.leftStreet.thirdLine.endPoint.y);

        context.moveTo(Streets.rightStreet.secondLine.startPoint.x, Streets.rightStreet.secondLine.startPoint.y);
        context.lineTo(Streets.rightStreet.secondLine.endPoint.x, Streets.rightStreet.secondLine.endPoint.y);

        context.moveTo(Streets.rightStreet.thirdLine.startPoint.x, Streets.rightStreet.thirdLine.startPoint.y);
        context.lineTo(Streets.rightStreet.thirdLine.endPoint.x, Streets.rightStreet.thirdLine.endPoint.y);

        context.lineWidth = 3;
        context.strokeStyle = backgroundType.color3;

        context.stroke();
        context.fill();
    }
};

export { DrawBackground };
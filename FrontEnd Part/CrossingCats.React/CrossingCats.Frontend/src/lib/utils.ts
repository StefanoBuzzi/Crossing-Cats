import { ICars } from '../Indexes/IndexCars';
import { ICatMovement } from '../Indexes/IndexCatMovement';

export const generateRandomNumber = () => {
    // const lanes = [170, 250, 330, 487, 567, 647];
    // const randomIndex = Math.floor(Math.random() * lanes.length);

    return {
        // x: lanes[randomIndex],
        // y: randomIndex > 2 ? 712 : 5,
        // imagePath: randomIndex > 2 ? ICars.CityCar : ICars.CityCarReverse,
        // direction: randomIndex > 2 ? 'up' : 'down',
    };
};
 
export class Car {
    x: number;
    y: number;
    speed: number;
    ctx: CanvasRenderingContext2D | null | undefined;
    image: HTMLImageElement;
    imageNumber: number;
    direction: string;
    width: number;
    height: number;

    constructor(ctx: CanvasRenderingContext2D | null | undefined, lane: number, start: number, way: string, imageType: number, sp: number) {
        const imageElement = new Image();
        this.imageNumber = imageType;
        if(this.imageNumber === 1){
            imageElement.src = ICars.CityCarReverse;
        }else if(this.imageNumber === 2){
            imageElement.src = ICars.CityCar;
        }
        imageElement.style.backgroundColor = 'blue';

        this.speed = 7.5;
    
        if(sp === 1){
            this.speed = 15;
        }else if(sp >= 2){
            this.speed = 30;
        }

        this.x = lane;
        this.y = start;
        this.ctx = ctx;
        this.image = imageElement;
        this.direction = way;
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
    }

    handleCarMovement = () => {
        if (this.direction === 'up') {
            this.y -= this.speed;
        } else if (this.direction === 'down') {
            this.y += this.speed;
        }
    };

    drawCar = () => {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.drawImage(this.image, 0, 0, 24, 46, this.x, this.y, 64, 123);
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
}
 
export class Cat {
    x: number;
    y: number;
    speed: number;
    ctx: CanvasRenderingContext2D | null | undefined;
    image: HTMLImageElement;
 
    constructor(ctx: CanvasRenderingContext2D | null | undefined, source: ICatMovement) {
        const imageElement = new Image();
        imageElement.src = source;
 
        this.x = 780;
        this.y = 400;
        this.speed = 10;
        this.ctx = ctx;
        this.image = imageElement;
    }
   
 
    drawCat = (onload?: boolean) => {
        if (this.ctx!!) {
            if (onload) {
                this.image.onload = () => {
                    this.ctx?.beginPath();
                    this.ctx?.drawImage(this.image, 0, 0, 50, 34, this.x, this.y, 50, 34);
                    this.ctx?.fill();
                    this.ctx?.closePath();
                };
            } else {
                this.ctx?.beginPath();
                this.ctx?.drawImage(this.image, 0, 0, 50, 34, this.x, this.y, 50, 34);
                this.ctx?.fill();
                this.ctx?.closePath();
            }
        }
    };
}
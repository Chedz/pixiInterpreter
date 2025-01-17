import { Assets, Sprite, Spritesheet } from "pixi.js";
import { lazyLoadResources } from "./assetLoader";

async function initInterpreter(appObject: any, jsonUrl: string) {
    console.log(`Json URL: ${jsonUrl}`);
    // Load the json specified in the URL
    try {
        const response = await fetch(`http://localhost:8080/public${jsonUrl}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Json Object: ");
        console.log(json);


        lazyLoadResources(json); // lazy load the resources for the excercises
        let currentStageSprites = await constructStage(json.item[0].info.uid, json.item[0].animation.content, appObject); // load the first excercise by default (index 0)

        //create two arrow buttons at the top of the screen via the dom to change excercises
        let leftArrow = document.createElement("button");
        leftArrow.innerHTML = "Excercise 5";
        leftArrow.style.position = "absolute";
        leftArrow.style.bottom = "10";
        leftArrow.style.top = "0";
        leftArrow.style.left = "0";
        leftArrow.style.right = "10";
        leftArrow.style.zIndex = "1000";
        leftArrow.onclick = async () => {
            await clearStage(appObject);
            await constructStage(json.item[0].info.uid, json.item[0].animation.content, appObject);
        }
        document.body.appendChild(leftArrow);


        let rightArrow = document.createElement("button");
        rightArrow.innerHTML = "Excercise 6";
        rightArrow.style.position = "absolute";
        rightArrow.style.bottom = "10";
        rightArrow.style.top = "0";
        rightArrow.style.left = "10";
        rightArrow.style.right = "0";
        rightArrow.style.zIndex = "1000";
        rightArrow.onclick = async () => {
            await clearStage(appObject);
            await constructStage(json.item[1].info.uid, json.item[1].animation.content, appObject);
        }
        document.body.appendChild(rightArrow);

        return currentStageSprites;

    } catch (error) {
        console.error((error as Error).message);
    }
}

async function constructStage(stageId: string, jsonContent: any, app: any){
    console.log(`constructing stage: ${stageId}`);

    // Load assets for this staghe if not already lazy-loaded
    const loadedStageAssets = await Assets.loadBundle(stageId);
    globalThis.loadedStageAssets = loadedStageAssets;

    let stageSprites = [];

    const promises = await Object.keys(jsonContent).map(async (contentType) => {
        switch (contentType) {
            case "background":
                // handle background here
                let sprite = await addBackgroundToStage(app, jsonContent[contentType]);
                stageSprites.push(sprite);
                return sprite;

            case "img":
                // handle img here
                let spritesArray = await addAllImagesToStage(app, jsonContent[contentType]);
                stageSprites = stageSprites.concat(spritesArray);
                return stageSprites;

            case "chooseCard":
                // handle chooseCard here
                return;
        
            default:
                return;
        }
    });

    await Promise.all(promises); // returns data in the order of the promises array
    return stageSprites;
}

async function clearStage(appObject: any) {
    await appObject.stage.removeChildren();
    console.log("Stage cleared!");
}

async function addBackgroundToStage(app, backgroundObject) {
    let background = await addImageToStage(app, { imageSource: backgroundObject._source, id: backgroundObject._id, x: app.screen.width/2, y: app.screen.height/2, width: app.screen.width, height: app.screen.height, update: false, zIndex: -1 });
    return background;
}

async function addAllImagesToStage(app, imagesArray) {
    let images: { id: any; update: any; sprite: Sprite; }[] = [];

    imagesArray.forEach(async (imageObject) => {
        if(imageObject._sprites){
            let spriteImage = await addSpriteSheetToStage(app,  { imageSource: imageObject._source, id: imageObject._id, x: Number(imageObject._x), y: Number(imageObject._y), update: false, zIndex: 20, spriteCount: imageObject._sprites });
            images.push(spriteImage);
        } else {
            let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: Number(imageObject._x), y: Number(imageObject._y), update: false, zIndex: 10 });
            images.push(image);
        }
    });

    return images;
}

async function addImageToStage(app, imageObject) {

    // Create a new Sprite from the resolved loaded texture
    let texture = loadedStageAssets[imageObject.imageSource];
    let sprite = new Sprite(texture);

    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(imageObject.x, imageObject.y);
    imageObject.zIndex ? sprite.zIndex = imageObject.zIndex : sprite.zIndex = 0;
    imageObject.width ? sprite.width = imageObject.width : texture.frame.width;
    imageObject.height ? sprite.height = imageObject.height : texture.frame.height;
    
    app.stage.addChild(sprite);

    return {id: imageObject.id, update: imageObject.update, sprite: sprite};
}


async function addSpriteSheetToStage(app, imageObject ){
    // get the texture from the loaded assets
    const texture = loadedStageAssets[imageObject.imageSource];
    // construct the atlas data for the spritesheet
    const atlasData = {
        meta: {
            size: { w: texture.frame.width, h: texture.frame.height },
            image: `${imageObject.imageSource}`,
        },
        frames: await constructFramesForSprite(texture.frame, [Number(imageObject.spriteCount), 1]),
    };
    // Create the SpriteSheet from data and image
    const spritesheet = new Spritesheet(
        texture,
        atlasData
    );

    // Generate all the Textures asynchronously
    await spritesheet.parse();

    // for this example just use the first frame of the sprite sheet for all sprite sheets when loaded
    const sprite = new Sprite(spritesheet.textures.frame_1);

    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(imageObject.x, imageObject.y);
    imageObject.zIndex ? sprite.zIndex = imageObject.zIndex : sprite.zIndex = 0;
    imageObject.width ? sprite.width = imageObject.width : texture.frame.width;
    imageObject.height ? sprite.height = imageObject.height : texture.frame.height;

    app.stage.addChild(sprite);
}

const constructFramesForSprite = async (imageData, spriteSplit = []) => {
    const { width, height } = imageData;

    const wSplit = width / spriteSplit[0];
    const hSplit = height / spriteSplit[1];

    const frames = {};

    for (let i = 0; i < spriteSplit[1]; i++) {
        for (let j = 0; j < spriteSplit[0]; j++) {
            const frameName = `frame_${i * spriteSplit[0] + j}`;
            frames[frameName] = {
                frame: { x: j * wSplit, y: i * hSplit, w: wSplit, h: hSplit },
                sourceSize: { w: wSplit, h: hSplit },
                spriteSourceSize: { x: 0, y: 0, w: wSplit, h: hSplit },
            };
        }
    }

    return frames;
};


export { initInterpreter };
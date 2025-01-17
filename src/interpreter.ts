import { Assets, Sprite, Spritesheet, AnimatedSprite } from "pixi.js";
import { lazyLoadResources } from "./assetLoader";

async function initInterpreter(appObject: any, jsonUrl: string) {
    console.log(jsonUrl);
    // Load the json specified in the URL
    try {
        const response = await fetch(`http://localhost:8080/public${jsonUrl}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // lazyLoadResources(json.item.info.uid, json.item.animation.resources, appObject, json.item.animation.content);
        // await constructStage(json.item.info.uid, json.item.animation.content, appObject);

        lazyLoadResources(json, appObject);
        await constructStage(json.item[0].info.uid, json.item[0].animation.content, appObject);
        // await constructStage(json.item[1].info.uid, json.item[1].animation.content, appObject);

        console.log(appObject.stage.children);

        //create two arrow buttons at the bottom of the screen via the dom
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


        // setTimeout(async () => {
        //     await clearStage(appObject);
        //     await constructStage(json.item[1].info.uid, json.item[1].animation.content, appObject);
        // }, 5000);


    } catch (error) {
        console.error(error.message);
    }
}

async function constructStage(stageId, jsonContent: any, app: any){
    console.log(jsonContent);
    console.log("constructStage");
    console.log(stageId);

    // Load assets for this staghe if not already lazy-loaded
    const loadedStageAssets = await Assets.loadBundle(stageId);
    globalThis.loadedStageAssets = loadedStageAssets;

    let stageSprites = [];

    Object.keys(jsonContent).forEach(async (contentType) => {
        console.log(contentType);
        // let sprite = addImageToStage(app, element);

        let sprite;

        switch (contentType) {
            case "background":
                // handle background here
                sprite = await addBackgroundToStage(app, jsonContent[contentType]);
                // console.log(sprite);
                break;
            case "img":
                // handle img here
                sprite = await addAllImagesToStage(app, jsonContent[contentType]);
                // console.log(sprite);
                break;
            case "chooseCard":
                // handle chooseCard here
                break;
        
            default:
                break;
        }

        stageSprites.push(sprite);
    });

    console.log("stageSprites!!!!!");
    console.log(stageSprites);
}

async function clearStage(appObject: any) {
    await appObject.stage.removeChildren();
    console.log("Stage cleared!");
}

async function addBackgroundToStage(app, backgroundObject) {
    let background = await addImageToStage(app, { imageSource: backgroundObject._source, id: backgroundObject._id, x: app.screen.width/2, y: app.screen.height/2, width: app.screen.width, height: app.screen.height, update: false, zIndex: -1 }, true);
    console.log(background);
    return background;
}

async function addAllImagesToStage(app, imagesArray) {
    console.log("addAllImagesToStage");
    console.log(imagesArray);
    let images = [];

    imagesArray.forEach(async (imageObject) => {
        // let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: imageObject._x, y: imageObject._y, update: false, zIndex: 10 });
        // let xPosition = (app.screen.width/2) - Number(imageObject._x);
        // let yPosition = (app.screen.width/2) - Number(imageObject._y);

        // console.log(imageObject);

        if(imageObject._sprites){
            console.log("foound some sprites:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            console.log(imageObject);

            let spriteImage = await addSpriteSheetToStage(app,  { imageSource: imageObject._source, id: imageObject._id, x: Number(imageObject._x), y: Number(imageObject._y), update: false, zIndex: 20, spriteCount: imageObject._sprites });
        } else {
            // let xPosition = Number(imageObject._x);
            // let yPosition = Number(imageObject._y);
        
            // console.log(xPosition);
            // console.log(yPosition);
        
            let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: Number(imageObject._x), y: Number(imageObject._y), update: false, zIndex: 10 });
            images.push(image);
        }
    });


    // let imageObject = imagesArray[0];
    // console.log(imageObject);
    // //x: -Number(imageObject._x), y: -Number(imageObject._y),
    // let xPosition = (app.screen.width/2) - Number(imageObject._x);
    // let yPosition = (app.screen.width/2) - Number(imageObject._y);

    // console.log(xPosition);
    // console.log(yPosition);

    // let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: -xPosition, y: -yPosition, update: false, zIndex: 10 });

    // console.log(image);
    // images.push(image);

    return images;
}

async function addImageToStage(app, imageObject, background = false) {
    console.log("addImageToStage");
    console.log(imageObject);
    // // Create a new sprite
    // const texture = await Assets.load(`/assets/g1-02-3-e5/img/${imageObject.imageSource}`);

    // let sprite = new Sprite(texture);
    // // sprite.id = imageObject.id;
    // imageObject.zIndex ? sprite.zIndex = imageObject.zIndex : sprite.zIndex = 0;
    // sprite.position.set(app.screen.width / 2 + imageObject.x, app.screen.height / 2 + imageObject.y);
    // sprite.width = imageObject.width;
    // sprite.height = imageObject.height;
    // app.stage.addChild(sprite);
    // return {id: imageObject.id, update: imageObject.update, sprite: sprite};


    // const loadScreenAssets = await Assets.loadBundle("G1-052-3-e5");

    // console.log(loadScreenAssets);

    // console.log(loadedStageAssets)

    let backImg = loadedStageAssets[imageObject.imageSource];
    // console.log(backImg);

    // Create a new Sprite from the resolved loaded texture
    let backgroundSprite = new Sprite(backImg);

    // if(!background) backgroundSprite.anchor.set(0.5, 0.5);
    // else backgroundSprite.anchor.set(0.5, 0.5);
    backgroundSprite.anchor.set(0.5, 0.5);
    imageObject.zIndex ? backgroundSprite.zIndex = imageObject.zIndex : backgroundSprite.zIndex = 0;
    // backgroundSprite.position.set(app.screen.width / 2 + imageObject.x, app.screen.height / 2 + imageObject.y);
    backgroundSprite.position.set(imageObject.x, imageObject.y);
    imageObject.width ? backgroundSprite.width = imageObject.width : backImg.frame.width;
    imageObject.height ? backgroundSprite.height = imageObject.height : backImg.frame.height;
    app.stage.addChild(backgroundSprite);
    // console.log("-----------------");
    return {id: imageObject.id, update: imageObject.update, sprite: backgroundSprite};
}


async function addSpriteSheetToStage(app, imageObject ){

    console.log("addSpriteSheetToStage");
    console.log(imageObject);
    console.log(imageObject.imageSource);

    const texture = loadedStageAssets[imageObject.imageSource];
    console.log(texture);
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

    console.log("spritesheet parse starting");
    // Generate all the Textures asynchronously
    await spritesheet.parse();

    // // spritesheet is ready to use!
    // const anim = new AnimatedSprite(spritesheet.animations.enemy);

    // // set the animation speed
    // anim.animationSpeed = 0.1666;
    // // play the animation on a loop
    // anim.play();
    // // add it to the stage to render
    // app.stage.addChild(anim);


    // for this example just use the first frame of the sprite sheet for all sprite sheets when loaded
    const sprite = new Sprite(spritesheet.textures.frame_1);

    console.log("sprite from spritesheet!!!");
    console.log(sprite);
    console.log(imageObject)

    sprite.anchor.set(0.5, 0.5);
    imageObject.zIndex ? sprite.zIndex = imageObject.zIndex : sprite.zIndex = 0;
    // backgroundSprite.position.set(app.screen.width / 2 + imageObject.x, app.screen.height / 2 + imageObject.y);
    sprite.position.set(imageObject.x, imageObject.y);
    imageObject.width ? sprite.width = imageObject.width : texture.frame.width;
    imageObject.height ? sprite.height = imageObject.height : texture.frame.height;

    // sprite.interactive = true;
    // sprite.accessible = true;
    

    console.log(app.stage.children);
    app.stage.addChild(sprite);
    console.log("-----------------");

    console.log(app.stage.children);
}

const constructFramesForSprite = async (imageData, spriteSplit = []) => {
    console.log('in constructFramesForSprite')
    const { width, height } = imageData;

    const wSplit = width / spriteSplit[0];
    const hSplit = height / spriteSplit[1];

    console.log(imageData)
    console.log(spriteSplit);

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

    console.log("frames");
    console.log(frames);

    return frames;
};


export { initInterpreter };
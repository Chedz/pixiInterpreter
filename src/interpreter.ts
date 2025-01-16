import { Assets, Sprite } from "pixi.js";
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

        lazyLoadResources(json.item.info.uid, json.item.animation.resources, appObject);
        constructStage(json.item.info.uid, json.item.animation.content, appObject);
    } catch (error) {
        console.error(error.message);
    }

    // const json = await Assets.load("/assets/g1-02-3-e5/G1-052-3-e5.json"); //jsonUrl
    // console.log("json:");
    // console.log(json);
    // const json = {
    //     item: {
    //         info: "dasa",
    //         animation: {
    //             resources: {
    //             },
    //         }
    //     }
    // }

    // lazyLoadResources(json.item.info.uid, json.item.animation.resources, appObject);


    // constructStage(json.item.info.uid, json.item.animation.content, appObject);
    // fetch(jsonUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Now parse json and construct the scene
    //         constructScene(data, appObject);
    //     });
    // let data = { hi: "hello" };
    // return constructScene(data, appObject);
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
                console.log('in background');
                console.log(jsonContent[contentType]);
                sprite = await addBackgroundToStage(app, jsonContent[contentType]);
                console.log(sprite);
                break;
            case "img":
                // handle img here
                sprite = await addAllImagesToStage(app, jsonContent[contentType]);
                console.log(sprite);
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

async function addBackgroundToStage(app, backgroundObject) {
    let background = await addImageToStage(app, { imageSource: backgroundObject._source, id: backgroundObject._id, x: -app.screen.width/2, y: -app.screen.height/2, width: app.screen.width, height: app.screen.height, update: false, zIndex: -1 }, true);
    console.log(background);
    return background;
}

async function addAllImagesToStage(app, imagesArray) {
    console.log("addAllImagesToStage");
    console.log(imagesArray);
    let images = [];

    imagesArray.forEach(async (imageObject) => {
        // let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: imageObject._x, y: imageObject._y, update: false, zIndex: 10 });
        let xPosition = (app.screen.width/2) - Number(imageObject._x);
        let yPosition = (app.screen.width/2) - Number(imageObject._y);
    
        console.log(xPosition);
        console.log(yPosition);
    
        let image = await addImageToStage(app, { imageSource: imageObject._source, id: imageObject._id, x: -xPosition, y: -yPosition, update: false, zIndex: 10 });
        images.push(image);
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

// async function constructScene(jsonObject: any, app: any) {
//     // Construct the scene from the json object

//     // Create sprites array to store all the sprites
//     let sprites = [];
//       // Load the bunny texture
// //   const texture = await Assets.load("/assets/bunny.png");

// //   // Create a bunny Sprite
// //   const bunny = new Sprite(texture);

// //   // Center the sprite's anchor point
// //   bunny.anchor.set(0.5);

// //   // Move the sprite to the center of the screen
// //   bunny.position.set(app.screen.width / 2, app.screen.height / 2);

// //   // Opt-in to interactivity
// //   bunny.eventMode = 'static';

// //   // Shows hand cursor
// //   bunny.cursor = 'pointer';

// //   // Pointers normalize touch and mouse (good for mobile and desktop)
// //   bunny.on('pointerdown', onClick);

// //   bunny.accessible = true;

// //   // Add the bunny to the stage
// //   app.stage.addChild(bunny);

// //   console.log("Hello, Pixi!");
// //   console.log(bunny);

// //   function onClick()
// //   {
// //     bunny.scale.x *= 1.25;
// //     bunny.scale.y *= 1.25;
// //   }

//     // let bunny1 = await createBunny(app, { x: 0, y: 0 });
//     // sprites.push(bunny1);

//     // let bunny2 = await createBunny(app, { x: 0, y: 50 });
//     // sprites.push(bunny2);

//     // let bunny3 = await addImageToStage(app, { imageSource: "/assets/bunny.png", id: "bunny3", x: 0, y: 100, width: 50, height: 50, update: true });
//     // sprites.push(bunny3);

//     let bunny4 = await addImageToStage(app, { imageSource: "/assets/bunny.png", id: "bunny4", x: 0, y: -100, width: 50, height: 50, update: true });
//     sprites.push(bunny4);

//     // let background = await addImageToStage(app, { imageSource: "/assets/g1-02-3-e5/img/back.svg", id: "back", x: -400, y: -300, width: 800, height: 600, update: false, zIndex: -1 });
//     // sprites.push(background);

//     return sprites;
// }

// async function createBunny(app: any, posOffset: any = { x: 0, y: 0 }) {
//     const texture = await Assets.load("/assets/bunny.png");

//   // Create a bunny Sprite
//   const bunny = new Sprite(texture);

//   // Center the sprite's anchor point
//   bunny.anchor.set(0.5);

//   // Move the sprite to the center of the screen
//   bunny.position.set(app.screen.width / 2 + posOffset.x, app.screen.height / 2 + posOffset.y);

//   // Opt-in to interactivity
//   bunny.eventMode = 'static';

//   // Shows hand cursor
//   bunny.cursor = 'pointer';

//   // Pointers normalize touch and mouse (good for mobile and desktop)
//   bunny.on('pointerdown', onClick);

//   bunny.accessible = true;

//   // Add the bunny to the stage
//   app.stage.addChild(bunny);

//   console.log("Hello, Pixi!");
//   console.log(bunny);

//   function onClick()
//   {
//     bunny.scale.x *= 1.25;
//     bunny.scale.y *= 1.25;
//   }

//   return bunny;
// }

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

    console.log(loadedStageAssets)

    let backImg = loadedStageAssets[imageObject.imageSource];
    console.log(backImg);

    // Create a new Sprite from the resolved loaded texture
    let backgroundSprite = new Sprite(backImg);

    if(!background) backgroundSprite.anchor.set(0.5);
    imageObject.zIndex ? backgroundSprite.zIndex = imageObject.zIndex : backgroundSprite.zIndex = 0;
    backgroundSprite.position.set(app.screen.width / 2 + imageObject.x, app.screen.height / 2 + imageObject.y);
    imageObject.width ? backgroundSprite.width = imageObject.width : backImg.frame.width;
    imageObject.height ? backgroundSprite.height = imageObject.height : backImg.frame.height;
    app.stage.addChild(backgroundSprite);
    console.log("-----------------");
    return {id: imageObject.id, update: imageObject.update, sprite: backgroundSprite};
}


export { initInterpreter };
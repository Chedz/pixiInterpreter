import { Assets, Sprite } from 'pixi.js';

// async function lazyLoadResources(taskUid: string, resourcesObject: any, appObj: any, contentObject: any) {
    async function lazyLoadResources(jsonObject: any, appObj: any) {
    console.log("lazyLoadResources");
    console.log(jsonObject);
    // console.log(taskUid);
    // console.log(resourcesObject);

    // Check how many excercises are in the item array
    let excerciseCount = jsonObject.item.length;
    console.log(excerciseCount);

     // Define Manifest for each scene
     let manifestExample = {
        bundles: []
     };

    // Loop through each excercise
    for (let i = 0; i < excerciseCount; i++) {
        console.log(i);
        console.log(jsonObject.item[i].info.uid);
        console.log(jsonObject.item[i].animation.resources);
        console.log(jsonObject.item[i].animation.content);


        let taskUid = jsonObject.item[i].info.uid;
        let resourcesObject = jsonObject.item[i].animation.resources;
        let contentObject = jsonObject.item[i].animation.content;
        
        manifestExample.bundles[i] = {
            name: taskUid,
            assets: [],
        }

        resourcesObject.image.forEach((image: {
            _sprites: any; _id: any; source: any; 
        }) => {
    
            if(image._sprites){
                console.log("found some sprites");
                console.log(image);
                //iterate through contentObject and find the sprite
                contentObject.img.forEach((content: {
                    _sprites: any; _id: any; _x: any; _y: any; _source: any; 
                }) => {
                   if(content._source === image._id){
                    console.log("found the sprite");
                    content._sprites = image._sprites;
                   }
                });
                // console.log(spriteObject);
            } 
    
            // let manifestObject = {
            //     alias: image._id,
            //     src: `/assets/${taskUid.toLowerCase()}/${image.source._src}`
            // };
            
            return manifestExample.bundles[i].assets.push({
                alias: image._id,
                src: `/assets/${taskUid.toLowerCase()}/${image.source._src}`
            });
        });
    }

    console.log(manifestExample)
    // // Define Manifest for each scene
    // let manifestExample = {
    //     bundles: [
    //         {
    //             name: taskUid,
    //             assets: [],
    //         }
    //     ]
    // };
    // return;

    // console.log(contentObject)

    // resourcesObject.image.forEach((image: {
    //     _sprites: any; _id: any; source: any; 
    // }) => {

    //     if(image._sprites){
    //         console.log("found some sprites");
    //         console.log(image);
    //         //iterate through contentObject and find the sprite
    //         contentObject.img.forEach((content: {
    //             _sprites: any; _id: any; _x: any; _y: any; _source: any; 
    //         }) => {
    //            if(content._source === image._id){
    //             console.log("found the sprite");
    //             content._sprites = image._sprites;
    //            }
    //         });
    //         // console.log(spriteObject);
    //     } 

    //     let manifestObject = {
    //         alias: image._id,
    //         src: `/assets/${taskUid.toLowerCase()}/${image.source._src}`
    //     };
        
    //     return manifestExample.bundles[0].assets.push({
    //         alias: image._id,
    //         src: `/assets/${taskUid.toLowerCase()}/${image.source._src}`
    //     });
    // });


    // resourcesObject.image.forEach((image: { _id: any; source: any; }) => {

    //     if(Array.isArray(image.source)) image.source = image.source[0]; // temp workaround for multiple sources

    //     let manifestObject = {
    //         name: image._id, //alias
    //         srcs: `/assets/${taskUid.toLowerCase()}/${image.source._src}`, //src
    //         format: image.source._type
    //     };

    //     manifestExample.bundles[0].assets.push(manifestObject);
    // });

    // let manifestString = {"bundles":[{"name":"G1-052-3-e5","assets":[{"name":"placeholder_img","srcs":"/assets/g1-052-3-e5/img/placeholder.svg","format":"image/svg+xml"},{"name":"less_img","srcs":"/assets/g1-052-3-e5/img/less.svg","format":"image/svg+xml"},{"name":"equal_img","srcs":"/assets/g1-052-3-e5/img/equal.svg","format":"image/svg+xml"},{"name":"greater_img","srcs":"/assets/g1-052-3-e5/img/greater.svg","format":"image/svg+xml"},{"name":"plate3_img","srcs":"/assets/g1-052-3-e5/img/plate3.svg","format":"image/svg+xml"},{"name":"digit9_img","srcs":"/assets/g1-052-3-e5/img/digit9.svg","format":"image/svg+xml"},{"name":"digit8_img","srcs":"/assets/g1-052-3-e5/img/digit8.svg","format":"image/svg+xml"},{"name":"num1_img","srcs":"/assets/g1-052-3-e5/img/num1.svg","format":"image/svg+xml"},{"name":"rightCell1_img","srcs":"/assets/g1-052-3-e5/img/rightCell1.svg","format":"image/svg+xml"},{"name":"leftCell1_img","srcs":"/assets/g1-052-3-e5/img/leftCell1.svg","format":"image/svg+xml"},{"name":"plate1_img","srcs":"/assets/g1-052-3-e5/img/plate1.svg","format":"image/svg+xml"},{"name":"num2_img","srcs":"/assets/g1-052-3-e5/img/num2.svg","format":"image/svg+xml"},{"name":"rightCell2_img","srcs":"/assets/g1-052-3-e5/img/rightCell2.svg","format":"image/svg+xml"},{"name":"leftCell2_img","srcs":"/assets/g1-052-3-e5/img/leftCell2.svg","format":"image/svg+xml"},{"name":"plate2_img","srcs":"/assets/g1-052-3-e5/img/plate2.svg","format":"image/svg+xml"},{"name":"back_img","srcs":"/assets/g1-052-3-e5/img/back.svg","format":"image/svg+xml"}]}]}
// let manifestString = {
//     "bundles":[
//     {
//         "name":"G1-052-3-e5",
//         "assets":[
//             {
//                 "alias":"placeholder_img",
//                 "src":"/assets/g1-052-3-e5/img/placeholder.svg",
//                 "format":"image/svg+xml"
//             },
//                 {"alias":"less_img","src":"/assets/g1-052-3-e5/img/less.svg","format":"image/svg+xml"},{"alias":"equal_img","src":"/assets/g1-052-3-e5/img/equal.svg","format":"image/svg+xml"},{"alias":"greater_img","src":"/assets/g1-052-3-e5/img/greater.svg","format":"image/svg+xml"},{"alias":"plate3_img","src":"/assets/g1-052-3-e5/img/plate3.svg","format":"image/svg+xml"},{"alias":"digit9_img","src":"/assets/g1-052-3-e5/img/digit9.svg","format":"image/svg+xml"},{"alias":"digit8_img","src":"/assets/g1-052-3-e5/img/digit8.svg","format":"image/svg+xml"},{"alias":"num1_img","src":"/assets/g1-052-3-e5/img/num1.svg","format":"image/svg+xml"},{"alias":"rightCell1_img","src":"/assets/g1-052-3-e5/img/rightCell1.svg","format":"image/svg+xml"},{"alias":"leftCell1_img","src":"/assets/g1-052-3-e5/img/leftCell1.svg","format":"image/svg+xml"},{"alias":"plate1_img","src":"/assets/g1-052-3-e5/img/plate1.svg","format":"image/svg+xml"},{"alias":"num2_img","src":"/assets/g1-052-3-e5/img/num2.svg","format":"image/svg+xml"},{"alias":"rightCell2_img","src":"/assets/g1-052-3-e5/img/rightCell2.svg","format":"image/svg+xml"},{"alias":"leftCell2_img","src":"/assets/g1-052-3-e5/img/leftCell2.svg","format":"image/svg+xml"},{"alias":"plate2_img","src":"/assets/g1-052-3-e5/img/plate2.svg","format":"image/svg+xml"},{"alias":"back_img","src":"/assets/g1-052-3-e5/img/back.svg","format":"image/svg+xml"}]}]};
    // const manifestExample = {
    //     bundles: [
    //         {
    //             name: 'load-screen',
    //             assets: [
    //                 {
    //                     alias: 'flowerTop',
    //                     src: 'https://pixijs.com/assets/flowerTop.png',
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'game-screen',
    //             assets: [
    //                 {
    //                     alias: 'eggHead',
    //                     src: 'https://pixijs.com/assets/eggHead.png',
    //                 },
    //             ],
    //         },
    //     ],
    // };

    // console.log("manifestExample");
    // console.log(manifestExample);
    // console.log("manifestString");
    // console.log(manifestString)
    // console.log(JSON.stringify(manifestExample));

    await Assets.init({ manifest: manifestExample });

    // Bundles can be loaded in the background too!
    // Assets.backgroundLoadBundle(['load-screen', 'game-screen']);
    Assets.backgroundLoadBundle(["G1-052-3-e5", "G1-052-3-e6"]);
    // Assets.loadBundle("G1-052-3-e5");

    // makeLoadScreen(appObj);
    return;

    // If the background load hasn't loaded this asset yet, calling load forces this asset to load now.
    // const loadScreenAssets = Assets.loadBundle("G1-052-3-e5");
}

async function makeLoadScreen(app: any) {
    // If the background load hasn't loaded this asset yet, calling load forces this asset to load now.
    const loadScreenAssets = await Assets.loadBundle("G1-052-3-e5");

    console.log(loadScreenAssets);

    let backImg = loadScreenAssets.back_img;
    console.log(backImg);

    // Create a new Sprite from the resolved loaded texture
    const goNext = new Sprite(backImg);

    goNext.anchor.set(0.5);
    goNext.x = app.screen.width / 2;
    goNext.y = app.screen.height / 2;
    app.stage.addChild(goNext);
}

export {lazyLoadResources}
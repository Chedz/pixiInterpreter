import { Assets } from 'pixi.js';

async function lazyLoadResources(jsonObject: any) {

    // Check how many excercises are in the item array
    let excerciseCount = jsonObject.item.length;
    console.log(`Beginning lazy-loading of resources for ${excerciseCount} excercises`);

     // Define Manifest for each scene
     let resourceLoadingManifest = {
        bundles: []
     };

    // Loop through each excercise
    for (let i = 0; i < excerciseCount; i++) {
        let taskUid = jsonObject.item[i].info.uid;
        let resourcesObject = jsonObject.item[i].animation.resources;
        let contentObject = jsonObject.item[i].animation.content;
        
        resourceLoadingManifest.bundles[i] = {
            name: taskUid,
            assets: [],
        }

        resourcesObject.image.forEach((image: {
            _sprites: any; _id: any; source: any; 
        }) => {
    
            if(image._sprites){
                //iterate through contentObject and find the sprite
                contentObject.img.forEach((content: {
                    _sprites: any; _id: any; _x: any; _y: any; _source: any; 
                }) => {
                   if(content._source === image._id){
                    content._sprites = image._sprites;
                   }
                });
            } 
            
            return resourceLoadingManifest.bundles[i].assets.push({
                alias: image._id,
                src: `/assets/${taskUid.toLowerCase()}/${image.source._src}`
            });
        });
    }

    await Assets.init({ manifest: resourceLoadingManifest });

    // Bundles can be loaded in the background too!
    Assets.backgroundLoadBundle(["G1-052-3-e5", "G1-052-3-e6"]);
    
    return;
}

export {lazyLoadResources}
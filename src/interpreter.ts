import { Assets, Sprite } from "pixi.js";

function initInterpreter(appObject: any, jsonUrl: string) {
    // Load the json specified in the URL
    // fetch(jsonUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Now parse json and construct the scene
    //         constructScene(data, appObject);
    //     });
    let data = { hi: "hello" };
    return constructScene(data, appObject);
}

async function constructScene(jsonObject: any, app: any) {
    // Construct the scene from the json object

    // Create sprites array to store all the sprites
    let sprites = [];
      // Load the bunny texture
//   const texture = await Assets.load("/assets/bunny.png");

//   // Create a bunny Sprite
//   const bunny = new Sprite(texture);

//   // Center the sprite's anchor point
//   bunny.anchor.set(0.5);

//   // Move the sprite to the center of the screen
//   bunny.position.set(app.screen.width / 2, app.screen.height / 2);

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

let bunny1 = await createBunny(app, { x: 0, y: 0 });
  sprites.push(bunny1);

  let bunny2 = await createBunny(app, { x: 0, y: 50 });
  sprites.push(bunny2);

  return sprites;
}

async function createBunny(app: any, posOffset: any = { x: 0, y: 0 }) {
    const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2 + posOffset.x, app.screen.height / 2 + posOffset.y);

  // Opt-in to interactivity
  bunny.eventMode = 'static';

  // Shows hand cursor
  bunny.cursor = 'pointer';

  // Pointers normalize touch and mouse (good for mobile and desktop)
  bunny.on('pointerdown', onClick);

  bunny.accessible = true;

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  console.log("Hello, Pixi!");
  console.log(bunny);

  function onClick()
  {
    bunny.scale.x *= 1.25;
    bunny.scale.y *= 1.25;
  }

  return bunny;
}

export { initInterpreter };
import { Application, Assets, Sprite } from "pixi.js";
import {initInterpreter} from "./interpreter";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: document.getElementById("pixi-container") });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  let sprites = await initInterpreter(app, "/assets/scene.json");

  console.log(sprites);
  console.log(sprites[0]);
  // // Load the bunny texture
  // const texture = await Assets.load("/assets/bunny.png");

  // // Create a bunny Sprite
  // const bunny = new Sprite(texture);

  // // Center the sprite's anchor point
  // bunny.anchor.set(0.5);

  // // Move the sprite to the center of the screen
  // bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // // Opt-in to interactivity
  // bunny.eventMode = 'static';

  // // Shows hand cursor
  // bunny.cursor = 'pointer';

  // // Pointers normalize touch and mouse (good for mobile and desktop)
  // bunny.on('pointerdown', onClick);

  // bunny.accessible = true;

  // // Add the bunny to the stage
  // app.stage.addChild(bunny);

  // console.log("Hello, Pixi!");
  // console.log(bunny);

  // function onClick()
  // {
  //   bunny.scale.x *= 1.25;
  //   bunny.scale.y *= 1.25;
  // }

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // bunny.rotation += 0.1 * time.deltaTime;

    sprites.forEach((sprite) => {
      sprite.rotation += 0.1 * time.deltaTime;
    });
  });
})();

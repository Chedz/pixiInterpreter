import { Application } from "pixi.js";
import { initInterpreter } from "./interpreter";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: document.getElementById("pixi-container") });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  let currentStageSprites = await initInterpreter(app, "/assets/combinedJson.json") as any[];

  console.log("currentStageSprites");
  console.log(currentStageSprites);

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // bunny.rotation += 0.1 * time.deltaTime;

    currentStageSprites.forEach((spriteHolder) => {
      if(spriteHolder.update){ // If the sprite is set to update
        // do some updating here
        spriteHolder.sprite.rotation += 0.1 * time.deltaTime;
      }
    });
  });
})();

import { ErrorMapper } from "utils/ErrorMapper";
import { RoleHarvester } from "roles/harvester";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  /*
  * The code below handles the spawning of Creeps
  */
  const populationSize = Object.keys(Game.creeps).length // TODO
  const desiredPopulationSize = 5;

  if (populationSize < desiredPopulationSize) {
    // This only works if the player only has one spawn / one room
    // TODO add multiple room support
    // TODO different populationSizes per room according tot their tech level?
    const spawn = Object.values(Game.spawns)[0];
    // TODO support multiple roles and different levels, according to room tech level
    // body found via https://codepen.io/findoff/details/RPmqOd
    spawn.createCreep([MOVE, MOVE, CARRY, WORK]);
  }

  /*
  * The code below handles the mining behaviour of creeps
  */
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    RoleHarvester.run(creep);
  }


  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

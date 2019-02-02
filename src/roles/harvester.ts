export class RoleHarvester {
    public static run(creep: Creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            // This selects a random source
            // May not be the closest one
            // May change even during mining
            const source = creep.room.find(FIND_SOURCES)[0];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            // Check if the spawn needs some energy, if so, refuel spawn
            // Otherwise rebuild the controller
            if (spawn.energy < spawn.energyCapacity) {
                if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            } else {
                const controller = creep.room.controller;
                // CONTINUE HERE
                /*
                * Since the creep first checks if he is carrying the max amount of energy,
                * after one upgrade cycle the miner will revert to mining,
                * so upgrading is pretty slow
                */
                // Make sure that the room has a controller (needed for TS)
                if (controller != undefined && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        }
    }
};

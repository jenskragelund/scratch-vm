const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const log = require("../../util/log");

const cupMaxVolume = 20;

const drinkIngredients = {
    a: "Fanta",
    b: "Cola",
    c: "Sprite",
    d: "Danskvand",
    e: "Cola Zero",
};

class Scratch3MissMixALot {
    constructor(runtime) {
        this.runtime = runtime;
        this.drinkIngredientTargets = null;
    }

    getInfo() {
        return {
            id: "missmixalot",
            name: "Miss Mix A Lot",
            blocks: [
                {
                    opcode: "addDrinkIngredient_a",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.a} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2,
                        },
                    },
                },
                {
                    opcode: "addDrinkIngredient_b",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.b} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2,
                        },
                    },
                },
                {
                    opcode: "addDrinkIngredient_c",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.c} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2,
                        },
                    },
                },
                {
                    opcode: "addDrinkIngredient_d",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.d} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2,
                        },
                    },
                },
                {
                    opcode: "addDrinkIngredient_e",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.e} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2,
                        },
                    },
                },
                {
                    opcode: "getDrinkVolume",
                    blockType: BlockType.REPORTER,
                    text: "drink størrelse (ml)",
                },
                {
                    opcode: "getCupMaxVolume",
                    blockType: BlockType.REPORTER,
                    text: "krus størrelse (ml)",
                },
            ],
            menus: {},
        };
    }

    _loadDrinkIngredientTargets() {
        this.drinkIngredientTargets = {};

        for (const [key, value] of Object.entries(drinkIngredients)) {
            this.drinkIngredientTargets[key] = this.runtime.targets.find(
                (t) => t.sprite.name === value
            );
        }
    }

    addDrinkIngredient(key, addedVolume) {
        if (this.drinkIngredientTargets === null) {
            this._loadDrinkIngredientTargets();
        }
        const variable = Object.values(
            this.drinkIngredientTargets[key].variables
        ).find((v) => v.name === "ml");

        this.drinkIngredientTargets[key].variables[variable.id].value =
            parseInt(variable.value) + parseInt(addedVolume);
    }

    addDrinkIngredient_a(args) {
        console.log(args);
        this.addDrinkIngredient("a", args.VOLUME);
    }

    addDrinkIngredient_b(args) {
        this.addDrinkIngredient("b", args.VOLUME);
    }

    addDrinkIngredient_c(args) {
        this.addDrinkIngredient("c", args.VOLUME);
    }

    addDrinkIngredient_d(args) {
        this.addDrinkIngredient("d", args.VOLUME);
    }

    addDrinkIngredient_e(args) {
        this.addDrinkIngredient("e", args.VOLUME);
    }

    getCupMaxVolume() {
        return cupMaxVolume;
    }

    getDrinkVolume(args) {
        if (this.drinkIngredientTargets === null) {
            this._loadDrinkIngredientTargets();
        }

        let volume = 0;
        for (const [key, value] of Object.entries(drinkIngredients)) {
            const variable = Object.values(
                this.drinkIngredientTargets[key].variables
            ).find((v) => v.name === "ml");

            if (variable) {
                volume += variable.value;
            }
        }
        return volume;
    }
}

module.exports = Scratch3MissMixALot;

const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const log = require("../../util/log");

const endpoint = "http://missmixalot.local/scratch-extension-api";
// const endpoint = "http://localhost:80/scratch-extension-api";
const cupMaxVolume = 20;

const drinkIngredients = {
    a: "Fanta",
    b: "Cola",
    c: "Sprite",
    d: "Cola Zero",
    e: "Vand",
    f: "Danskvand",
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
                            defaultValue: 20,
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
                            defaultValue: 20,
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
                            defaultValue: 20,
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
                            defaultValue: 20,
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
                            defaultValue: 20,
                        },
                    },
                },
                {
                    opcode: "addDrinkIngredient_f",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj [VOLUME]ml ${drinkIngredients.f} til din drink`,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 20,
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
                {
                    opcode: "postVolumes",
                    blockType: BlockType.COMMAND,
                    text: `Mix drink`,
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

    _getVolumes() {
        const volumes = {};
        for (const [key, value] of Object.entries(drinkIngredients)) {
            const variable = Object.values(
                this.drinkIngredientTargets[key].variables
            ).find((v) => v.name === "ml");

            if (variable) {
                volumes[key] = parseInt(variable.value);
            }
        }
        return volumes;
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

    addDrinkIngredient_f(args) {
        this.addDrinkIngredient("f", args.VOLUME);
    }

    getCupMaxVolume() {
        return cupMaxVolume;
    }

    getDrinkVolume(args) {
        if (this.drinkIngredientTargets === null) {
            this._loadDrinkIngredientTargets();
        }

        return Object.values(this._getVolumes).reduce(
            (acc, cur) => acc + cur,
            0
        );
    }

    postVolumes() {
        const volumes = this._getVolumes();

        fetch(`${endpoint}?volumes=${JSON.stringify(volumes)}`)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
}

module.exports = Scratch3MissMixALot;

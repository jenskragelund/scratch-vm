const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const log = require("../../util/log");

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
                    text: `Tilføj ${drinkIngredients.a} til din drink`,
                    arguments: {},
                },
                {
                    opcode: "addDrinkIngredient_b",
                    blockType: BlockType.COMMAND,
                    text: `Tilføj ${drinkIngredients.b} til din drink`,
                    arguments: {},
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

    addDrinkIngredient(key) {
        if (this.drinkIngredientTargets === null) {
            this._loadDrinkIngredientTargets();
        }
        const variable = Object.values(
            this.drinkIngredientTargets[key].variables
        ).find((v) => v.name === "ml");
        this.drinkIngredientTargets[key].variables[variable.id].value = variable.value + 1;
    }

    addDrinkIngredient_a() {
        this.addDrinkIngredient("a");
    }

    addDrinkIngredient_b() {
        this.addDrinkIngredient("b");
    }

    addDrinkIngredient_c() {
        this.addDrinkIngredient("c");
    }

    addDrinkIngredient_d() {
        this.addDrinkIngredient("d");
    }
    addDrinkIngredient_e() {
        this.addDrinkIngredient("e");
    }
}

module.exports = Scratch3MissMixALot;

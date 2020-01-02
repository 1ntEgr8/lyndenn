// what does a lindenmayer system need
/*
    variables -> set of symbols that can be replaced
    constants -> set of symbols that cannot be replaced
    start -> the initial state of the system
    production_rules -> for any symbol in variables
*/

/*
    {
        variables: [],
        constants: [],
        start: ,
        rules: {},
        op: {
            variable -> action
        }
    }

    lyndenn({
        variables: [0, 1],
        constants: ["[", ",", "]"],
        axiom: 0,
        rules: {
            1: "11",
            0: "1[0]0"
        },
        op: {
            1: 
        }
    })
*/

class lyndenn {
    constructor(config, shouldDraw=true) {
        console.log(config);
    }
}

const koch = new lyndenn({
    variables: ["F"],
    constants: ["+", "-"],
    start: "F",
    rules: {
        "F": "F+F-F-F+F"
    },
    op: {
        "F": () => console.log("F"),
        "+": () => console.log("+"),
        "-": () => console.log("-")
    }
});

// koch.execute(1); // executes koch for order 1

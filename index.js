// what does a lindenmayer system need
/*
    variables -> set of symbols that can be replaced
    constants -> set of symbols that cannot be replaced
    start -> the initial state of the system
    production_rules -> for any symbol in variables
*/

// need a very simple language to convey info
/*
    f10
    b10
    r60
    r-60
    push
    pop
*/

const turtle = new Turtle(500, 500, 1000, 1000);
turtle.setStyles({
    "stroke-width": "1px"
});
turtle.setSpeed(1);

function lyndenn(config) {
    function dispatch(command) {
        switch(command) {
            case "f": turtle.forward(1); break;
            case "l": {
                turtle.rotate(-90); break;
            }
            case "r": turtle.rotate(90); break; 
        }
    }

    const variables = new Set(config["variables"]);
    const constants = new Set(config["constants"]);

    function exec(order, rule=config.axiom) {
        if (order == 0) {
            dispatch(config.ops[rule]);
        } else {
            for (let op1 of rule) {
                if (constants.has(op1)) {
                    dispatch(config.ops[op1]);
                } else {
                    for (let op2 of config.rules[op1]) {
                        if (constants.has(op2)) {
                            dispatch(config.ops[op2]);
                        } else if (variables.has(op2)) {
                            exec(order - 1, op2);
                        }
                    }
                }
            }
        }
    }

    exec(20);
    turtle.done();
}

const koch = lyndenn({
    variables: ["X", "Y"],
    constants: ["F", "+", "-"],
    axiom: "FX",
    rules: {
        "X": "X+YF+",
        "Y": "-FX-Y"
    },
    ops: {
        "X": "",
        "Y": "",
        "F": "f",
        "+": "r",
        "-": "l"
    }
})

// const gosper = lyndenn({
//     variables: ["A", "B"],
//     constants: ["-", "+"],
//     axiom: "A",
//     rules: {
//         "A": "A-B--B+A++AA+B-",
//         "B": "+A-BB--B-A++A+B"
//     },
//     ops: {
//         "A": "f",
//         "B": "f",
//         "-": "r",
//         "+": "b"
//     }
// });

// koch.execute(1, 10); // executes koch for order 1
// 
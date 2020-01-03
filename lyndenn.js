/*
    L-System or LINDENMAYER SYSTEM
    https://en.wikipedia.org/wiki/L-system

    An L-system or Lindenmayer system is a parallel rewriting system and a type of formal grammar. 

    variables -> set of symbols that can be replaced
    constants -> set of symbols that cannot be replaced
    start -> the initial state of the system
    production_rules -> for any symbol in variables
*/

/*
    Language for describing operations

        command := <nop> | <code><val> command
        code := f | b | r | > | <
        val := float

        <nop> = no operation, which is equivalent to an empty string in this context
        f = forward
        b = backward
        r = rotate
        > = push current state of turtle onto stateStack
        < = pop off stateStack, and set state of turtle to popped value
*/

function lyndenn(config) {
    const turtle = new Turtle(0, 0, 1000, 1000);
    const stateStack = []; // for pushing and popping

    const tks = {
        'f': (tk) => turtle.forward(parseFloat(tk.substring(1))),
        'b': (tk) => turtle.backward(parseFloat(tk.substring(1))),
        'r': (tk) => turtle.rotate(parseFloat(tk.substring(1))),
        '>': (_) => {
            const state = {
                x: turtle.getX(),
                y: turtle.getY(),
                heading: turtle.getHeading(),
                speed: turtle.getSpeed()
            }
            console.log("pushing state: ", state);
            stateStack.push(state)
        },
        '<': (_) => {
            const state = stateStack.pop();
            console.log("popping state: ", state);
            turtle.moveTo(state.x, state.y);
            turtle.setHeading(state.heading);
            turtle.setSpeed(state.speed);
        }
    }

    function dispatch(command) {
        return command.trim()
            .split(" ")
            .filter(tk => tk.length > 0)
            .forEach(tk => tks[tk[0]](tk));
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

    function draw(order) {
        exec(order);
        turtle.done();
    }

    return {
        draw,
        tks,
        turtle
    }
}

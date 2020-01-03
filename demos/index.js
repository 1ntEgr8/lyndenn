const dragon = lyndenn({
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
        "F": "f10",
        "+": "r-90",
        "-": "r90"
    }
});

const gosper = lyndenn({
    variables: ["A", "B"],
    constants: ["-", "+"],
    axiom: "A",
    rules: {
        "A": "A-B--B+A++AA+B-",
        "B": "+A-BB--B-A++A+B"
    },
    ops: {
        "A": "f10",
        "B": "f10",
        "-": "r60",
        "+": "r-60"
    }
});

const tree = lyndenn({
    variables: ["0", "1"],
    constants: ["[", "]"],
    axiom: "0",
    rules: {
        "1": "11",
        "0": "1[0]0"
    },
    ops: {
        "0": "f0.5",
        "1": "f0.5",
        "[": "> r-45",
        "]": "< r45"
    }
});

// gosper.turtle.moveTo(400, 400);
// gosper.draw(4);

// tree.turtle.moveTo(500, 500);
// tree.turtle.setHeading(-90);
// tree.draw(10)

dragon.turtle.moveTo(300, 300);
dragon.draw(10);
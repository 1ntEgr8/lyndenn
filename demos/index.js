function tree() {
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
}

const PRESETS = [
    {
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
            "+": "r60",
            "-": "r-60"
        },
        order: 3
    },
    {
        variables: ["X", "Y"],
        constants: ["F", "+", "-"],
        axiom: "FX",
        rules: {
            "X": "X+YF+",
            "Y": "-FX-Y"
        },
        ops: {
            "F": "f10",
            "+": "r90",
            "-": "r-90"
        },
        order: 10
    },
    {
        variables: ["F"],
        constants: ["+", "-"],
        axiom: "F",
        rules: {
            "F": "F+F-F-F+F",
        },
        ops: {
            "F": "f10",
            "+": "r-90",
            "-": "r90"
        },
        order: 3
    },
];

const btnPresets = document.getElementById("btnPresets"),
    btnConfig = document.getElementById("btnConfig"),
    btnHelp = document.getElementById("btnHelp"),
    presets = document.getElementById("presets"),
    config = document.getElementById("config"),
    help = document.getElementById("help"),
    mainBody = document.getElementById("main-body"),
    variables = document.getElementById("variables"),
    constants = document.getElementById("constants"),
    axiom = document.getElementById("axiom"),
    rules = document.getElementById("rules"),
    ops = document.getElementById("ops"),
    order = document.getElementById("order"),
    animate = document.getElementById("animate"),
    speed = document.getElementById("turtle-speed"),
    size = document.getElementById("turtle-size"),
    turCol = document.getElementById("turtle-color");
    // shouldAnim = document.getElementById("anim");

let currTurtle = null;

btnPresets.addEventListener('click', () => {
    slideIn(presets);
});
btnConfig.addEventListener('click', () => {
    slideIn(config);
});
btnHelp.addEventListener('click', () => {
    slideIn(help);
});

animate.addEventListener('click', () => {
    runLyndenn(lyndenn({
        variables: variables.value.split(","),
        constants: constants.value.split(","),
        axiom: axiom.value,
        rules: parseIntoObj(rules.innerHTML),
        ops: parseIntoObj(ops.innerHTML),
    }), parseInt(order.value));
    slideOut(config);
})

Array.from(document.querySelectorAll('.x')).forEach(cross => {
    cross.addEventListener('click', (e) => {
        slideOut(e.target.parentElement);
        mainBody.style.opacity = 1;
    })
});

Array.from(document.querySelectorAll('#presets .btn')).forEach((el, i) => {
    el.addEventListener('click', () => {
        const prev = document.querySelector('.active');
        prev.classList.remove('active');
        el.classList.add('active');

        runPreset(PRESETS[i]);
        slideOut(presets);
    })
});

function parseIntoObj(s) {
    const tokens = s.split(",");
    const obj = {};
    tokens.forEach(token => {
        const [key, value] = token.split(" =&gt; ");
        if (key && value) {
            obj[key.trim()] = value.trim();
        }
    })
    return obj;
}

function fillForm(config) {
    variables.value = config.variables;
    constants.value = config.constants;
    axiom.value = config.axiom;
    rules.innerHTML = "";
    for (let i in config.rules) {
        rules.innerHTML += `${i} => ${config.rules[i]},\n`;
    }
    ops.innerHTML = "";
    for (let i in config.ops) {
        ops.innerHTML += `${i} => ${config.ops[i]},\n`;
    }
    order.value = config.order;
}

function prepTurtle(turtle) {
    const canvas = document.getElementById("canvas");
    canvas.appendChild(turtle.canvas);
    canvas.scrollLeft = "178";
    canvas.scrollTop = "250";
    centerTurtle(turtle);
    turtle.setStyles({
        "stroke-width": "4px",
        "stroke": "white"
    });

    if (speed.value) {
        turtle.setSpeed(parseFloat(speed.value));
    }
    if (size.value) {
        turtle.setStyles({
            "stroke-width": size.value
        });
    }
    if (turCol.value) {
        turtle.setStyles({
            "stroke": turCol.value
        });
    }
}

function centerTurtle(turtle) {
    turtle.moveTo(500, 500);
}

function slideIn(el) {
    mainBody.style.opacity = 0.1;
    el.classList.add("slideIn");
    el.classList.remove("slideOut");
}

function slideOut(el) {
    mainBody.style.opacity = 1;
    el.classList.add("slideOut");
    el.classList.remove("slideIn");
}

function runPreset(preset) {
    fillForm(preset);
    runLyndenn(lyndenn(preset), preset.order);
}

function runLyndenn(lyn, order) {
    if (currTurtle) currTurtle.destroy();
    currTurtle = lyn.turtle;
    prepTurtle(lyn.turtle);
    lyn.draw(order);
}

function init() {
    runPreset(PRESETS[0]);
}

init();

function prepCanvas(turtle) {
    document.getElementById("canvas").appendChild(turtle.canvas);
    centerTurtle(turtle);
    turtle.setStyles({
        "stroke-width": "4px",
        "stroke": "white"
    })
}

function centerTurtle(turtle) {
    turtle.moveTo(250, 500);
}

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
            "X": "",
            "Y": "",
            "+": "r90",
            "-": "r-90"
        },
        order: 10
    }
]

const ORDER = 3;

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
    animate = document.getElementById("animate");

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
    configLyndenn();
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
        const run = lyndenn(PRESETS[i]);
        prepCanvas(run.turtle);
        run.draw(PRESETS[i].order);
        slideOut(presets);
    })
})

function configLyndenn() {
    // read from the config form
    // set up lyndenn
    // run lyndenn
    console.log("I'm here");
    // parse variables,
    // parse constants,
    // parse axiom,
    // parse rules,
    // parse ops
}

function fillForm(config) {
    variables.value = config.variables;
    constants.value = config.constants;
    axiom.value = config.axiom;
    for (let i in config.rules) {
        rules.innerHTML += `${i} => ${config.rules[i]},\n`;
    }
    for (let i in config.ops) {
        ops.innerHTML += `${i} => ${config.ops[i]},\n`;
    }
    order.value = ORDER;
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

fillForm(PRESETS[0]);


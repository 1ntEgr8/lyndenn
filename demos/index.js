function prepCanvas(turtle) {
    document.getElementById("canvas").appendChild(turtle.canvas);
    centerTurtle(turtle);
    turtle.setStyles({
        "stroke-width": "4px",
        "stroke": "white"
    })
}

function centerTurtle(turtle) {
    turtle.moveTo(350, 250);
}

function dragon() {
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
}

function gosper() {
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
    prepCanvas(gosper.turtle);
    gosper.draw(3);
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

const btnPresets = document.getElementById("btnPresets"),
    btnConfig = document.getElementById("btnConfig"),
    btnHelp = document.getElementById("btnHelp"),
    presets = document.getElementById("presets"),
    config = document.getElementById("config"),
    help = document.getElementById("help"),
    mainBody = document.getElementById("main-body");

btnPresets.addEventListener('click', () => {
    slideIn(presets);
});
btnConfig.addEventListener('click', () => {
    slideIn(config);
})
btnHelp.addEventListener('click', () => {
    slideIn(help);
})

Array.from(document.querySelectorAll('.x')).forEach(cross => {
    cross.addEventListener('click', (e) => {
        slideOut(e.target.parentElement);
        mainBody.style.opacity = 1; 
    })
});

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

gosper();
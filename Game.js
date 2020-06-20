const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    HYRULE: Symbol("hyrule"),
    HYRULESOUTH: Symbol("hyrulesouth"),
    HYRULENORTH: Symbol("hyrulenorth"),
    GARUDO: Symbol("garudo"),
    FARON: Symbol("faron"),
    FARONPEAK: Symbol("faronpeak"),
    NECLUDA: Symbol("necluda"),
    QUICKSAND: Symbol("quicksand"),
    RIVERBANK: Symbol("riverbank"),
    LANARYUCAVE: Symbol("lanaryucave"),
    LANARYUTOWER: Symbol("lanaryutower"),
    NOISES: Symbol("noises"),
    SMOKE: Symbol("smoke"),
    SCAREMONKEYS: Symbol("scaremonkeys")
});

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput) {
        let sReply = [];
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply.push("Welcome to Kingdom of HyRule Adventures!");
                sReply.push("Your ship got wrecked. You floated to the Kingdom of Central HyRule beach.");
                sReply.push("Your goal is to reach civilization.");
                sReply.push("Do you want to go NORTH or SOUTH?");
                this.stateCur = GameState.HYRULE;
                break;

            case GameState.HYRULE:
                if (sInput.toLowerCase().match("north")) {
                    sReply.push("You are at Lanaryu Province. It is pouring heavily. You see a tower with lamps and a dark cave near by. Do you want to go towards TOWER or CAVE?");
                    this.stateCur = GameState.HYRULENORTH;
                } else if (sInput.toLowerCase().match("south")) {
                    sReply.push("You are in front of treacherous Zora river. Do you want to cross the river on a RAFT or SWIM across the river?");
                    this.stateCur = GameState.HYRULESOUTH;
                } else sReply.push("Do you want to go NORTH or SOUTH? ");
                break;

            case GameState.HYRULENORTH:
                if (sInput.toLowerCase().match("cave")) {
                    sReply.push("You bravely entered a dark cave. A hungry Lion attacked you. Your adventure ENDS here. Play again!");
                    this.stateCur = GameState.WELCOMING;
                } else if (sInput.toLowerCase().match("tower")) {
                    sReply.push("You are on top of the Lanaryu tower. You hear noises from east side and you see smoke coming from west side of tower. Which direction you want to choose, EAST or WEST?");
                    this.stateCur = GameState.LANARYUTOWER;
                } else sReply.push("Do you want to go towards TOWER or CAVE?");
                break;

            case GameState.LANARYUTOWER:
                if (sInput.toLowerCase().match("east")) {
                    sReply.push("You walked deep into forest. You are sorrounded by wild monkeys. Do you want to run back to TOWER or SCARE the monkeys?");
                    this.stateCur = GameState.NOISES;
                } else if (sInput.toLowerCase().match("west")) {
                    sReply.push("You followed the smoke in the west direction of tower. You see few houses, Congratulations! You have reached Civilization! You WIN!");
                    this.stateCur = GameState.WELCOMING;
                } else sReply.push("Which direction you want to choose, EAST or WEST?");
                break;

            case GameState.NOISES:
                if (sInput.toLowerCase().match("tower")) {
                    sReply.push("You ran back to the top of Lanaryu tower. You hear noises from east side and you see smoke coming from west side of the tower. Which way you want to go, EAST or WEST?");
                    this.stateCur = GameState.LANARYUTOWER;
                } else if (sInput.toLowerCase().match("scare")) {
                    sReply.push("Sorry, A big bear joined the monkeys group and YOU ARE ATTACKED. Your adventure ENDS here. Play again!");
                    this.stateCur = GameState.WELCOMING;
                } else sReply.push("Do you want to run back to TOWER or SCARE the monkeys?");
                break;

            case GameState.HYRULESOUTH:
                if (sInput.toLowerCase().match("swim")) {
                    sReply.push("Unfortunately you are attacked by crocodiles in the middle of the river! Your adventure ENDS here. Play again!");
                    this.stateCur = GameState.WELCOMING;
                } else if (sInput.toLowerCase().match("raft")) {
                    sReply.push("You reached other end of Zora river. On your west you see a desert. On south you see a snowland. On east you see grass fields. Do you want to go EAST or WEST or SOUTH?");
                    this.stateCur = GameState.RIVERBANK;
                } else sReply.push("Do you want to cross the river on a RAFT or SWIM across the river?");
                break;

            case GameState.RIVERBANK:
                if (sInput.toLowerCase().match("west")) {
                    sReply.push("You reached Garudo desert land. On your left you hear whistling winds of desert valleys. On your right you hear birds chirping and you see birds flying. You want to choose LEFT or RIGHT? ");
                    this.stateCur = GameState.GARUDO;
                } else if (sInput.toLowerCase().match("south")) {
                    sReply.push("You have reached Faron, the freezing snow land. On your left you see a snow hill, the Faron Peak. On your right you see a frozen lake. Do you want to go LEFT or RIGHT?");
                    this.stateCur = GameState.FARON;
                } else if (sInput.toLowerCase().match("east")) {
                    sReply.push("You reached green grass fields of Necluda. On your far right, you see rocky hill. On your left, you see muddy puddle. Do you choose LEFT or RIGHT?  ");
                    this.stateCur = GameState.NECLUDA;
                } else sReply.push("Do you want to go EAST or WEST or SOUTH?");
                break;

            case GameState.FARON:
                if (sInput.toLowerCase().match("left")) {
                    sReply.push("You climbed top of Faron Peak. Its very cold. You could barely see a fire on your east side and you see a rope way on your west side. You want to choose EAST or WEST?");
                    this.stateCur = GameState.FARONPEAK;
                } else if (sInput.toLowerCase().match("right")) {
                    sReply.push("Unfortunately you walked on a thin sheet of ice path. The ice started craking under your feet and you started drowning. Your game ENDS here. Play again.");
                    this.stateCur = GameState.WELCOMING;
                } else sReply.push("Do you choose LEFT or RIGHT?");
                break;

            case GameState.FARONPEAK:
                if (sInput.toLowerCase().match("east")) {
                    sReply.push("Congratulations! You are on your way to civilization. You WIN.");
                    this.stateCur = GameState.WELCOMING;
                } else if (sInput.toLowerCase().match("west")) {
                    sReply.push("Unfortunately the cable car stuck in the middle of the way. Wolves are circling beneath the cable car. Your game ENDS here. Play again.");
                    this.stateCur = GameState.WELCOMING;
                } else sReply.push("You want to choose EAST or WEST?");
                break;

            case GameState.NECLUDA:
                if (sInput.toLowerCase().match("left")) {
                    sReply.push("You walked right into quick sand. You start drowning. Do you want to STAND or lie FLAT to cross the quick sand?");
                    this.stateCur = GameState.QUICKSAND;
                } else if (sInput.toLowerCase().match("right")) {
                    sReply.push("While hiking the rocky hill, you slipped through a dangerous valley and you have been teleported to Lanaryu Province. You see a tower with lamps and a dark cave near by. Do you want to go towards TOWER or CAVE?");
                    this.stateCur = GameState.HYRULENORTH;
                } else sReply.push("Do you choose LEFT or RIGHT?");
                break;

            case GameState.QUICKSAND:
                if (sInput.toLowerCase().match("stand")) {
                    sReply.push("You have drowned in the quick sand. Your adventure ENDS here. Play again!.");
                    this.stateCur = GameState.WELCOMING;
                } else if (sInput.toLowerCase().match("flat")) {
                    sReply.push("Smart move! You have successfully crossed the quick sand. Oh, you have tripped on magic wire and you have been teleported to Lanaryu Province. You see a tower with lamps and a dark cave near by. Do you want to go towards TOWER or CAVE?");
                    this.stateCur = GameState.HYRULENORTH;
                } else sReply.push("Do you want to STAND or lie FLAT to cross the quick sand?");
                break;

            case GameState.GARUDO:
                if (sInput.toLowerCase().match("left")) {
                    sReply.push("You are lost in desert storm. Your adventure ENDS here. Play again!");
                    this.stateCur = GameState.WELCOMING;
                } else if (sInput.toLowerCase().match("right")) {
                    sReply.push("You reached the biggest oasis in the desert surrounded by merchants. You WIN! You are on your way to civilization! ");
                    this.stateCur = GameState.WELCOMING;
                } else sReply.push("You want to choose LEFT or RIGHT?");
                break;

        }
        return (sReply);
    }
}
var questionForm = document.querySelector("#question")

var metrics = [0,0,0,0,0] // Instigation, Combat, Rules, Story, Acting
var maxMetrics = [0,0,0,0,0]
var questions = [
    {name:"Which type of player bothers you the most?", answers:[
        // I C R S A
        {text:"The one who tries to correct the DM on minor rules infractions.", modifiers:[0,0,-1,0,0]},
        {text:"The one who spends forever trying to figure out what to do on their turn.", modifiers:[0,1,2,0,0]},
        {text:"The one who doesn't even try to roleplay their character.", modifiers:[0,0,0,0,2]},
        {text:"The one who regularly exploits and harms innocent NPCs.", modifiers:[-1,0,0,0,0]}
    ]},
    {name:"It's time to roll initiative. What immediately goes through your mind (In general)?", answers:[
        // I C R S A
        {text:"YEAH BABY LET'S GOOOO", modifiers:[0,2,0,0,-1]},
        {text:"Oh great, another combat encounter.", modifiers:[0,-2,-1,0,0]},
        {text:"This was my fault, wasn't it?", modifiers:[1,0,0,0,0]},
        {text:"Wait, hold on, we can talk about this!", modifiers:[-1,0,0,1,2]}
    ]},
    {name:"You prefer a dungeon master who will...", answers:[
        // I C R S A
        {text:"Give me cool magic items to play around with.", modifiers:[1,1,0,0,0]},
        {text:"Challenge me and give me many opportunities to level up.", modifiers:[0,1,2,0,0]},
        {text:"Give me chances to roleplay my character.", modifiers:[0,0,0,0,2]},
        {text:"Give plenty of attention to my character's backstory.", modifiers:[0,0,0,2,1]}
    ]},
    {name:"You would have the most fun playing a...", answers:[
        // I C R S A
        {text:"Chaotic neutral edgy rogue boi", modifiers:[2,0,0,0,0]},
        {text:"Chaotic stupid barbarian smashy boi", modifiers:[1,2,0,0,0]},
        {text:"Chaotic good bard with a penchant for seduction.", modifiers:[1,0,0,0,2]},
        {text:"Lawful evil knight of the realm, slayer of my foes by any means necessary.", modifiers:[0,1,0,1,1]}
    ]},
    {name:"When your dungeon master intentionally breaks the rules of the game, how do you feel?", answers:[
        // I C R S A
        {text:"Completely indifferent.", modifiers:[0,0,-1,0,0]},
        {text:"It's fine, as long as it doesn't negatively affect my character.", modifiers:[0,0,0,0,0]},
        {text:"Suspending the rules is only okay if it allows for a cool moment.", modifiers:[0,0,1,1,0]},
        {text:"Rules are rules, they exist for a reason.", modifiers:[0,0,2,0,0]}
    ]},
    {name:"How often are you in character, during a D&D session?", answers:[
        // I C R S A
        {text:"Any time I speak, assume it's in character.", modifiers:[0,0,0,1,2]},
        {text:"Most of the time, I'm in character.", modifiers:[0,0,1,0,1]},
        {text:"I get in character only during social situations with NPCs.", modifiers:[0,0,0,0,0]},
        {text:"Most of the things I say at the table are out of character.", modifiers:[0,0,0,0,-1]},
        {text:"I get uncomfortable when I try to roleplay my character.", modifiers:[0,0,0,0,-2]}
    ]},
    {name:"How many sets of dice do you own? Be honest.", answers:[
        // I C R S A
        {text:"Too many!", modifiers:[0,1,2,0,0]},
        {text:"More than one.", modifiers:[0,0,1,0,0]},
        {text:"Just one set.", modifiers:[0,0,0,0,0]},
        {text:"I steal from my friends, lol", modifiers:[0,0,-1,0,0]}
    ]},
    {name:"How do you feel about the party being railroaded (forced into a quest)?", answers:[
        // I C R S A
        {text:"I hate it. I want to feel like the story is in my hands.", modifiers:[1,0,0,2,0]},
        {text:"It's a necessary evil, sometimes, but I don't particularly like it.", modifiers:[1,0,0,1,0]},
        {text:"Don't mind it, as long as I'm still afforded plenty of freedom with my character.", modifiers:[1,0,0,1,1]},
        {text:"Don't care, as long as I get to fight things.", modifiers:[0,2,0,0,0]},
        {text:"I actually like it (I don't like making decisions)", modifiers:[0,0,0,-1,-1]}
    ]},
    {name:"Your DM tells you that you can't use a homebrew race because it's too OP (you disagree). How do you respond?", answers:[
        // I C R S A
        {text:"REEEEEEE", modifiers:[1,0,1,0,0]},
        {text:"Comply with the DM, but I'd feel a little bit upset.", modifiers:[0,1,0,0,0]},
        {text:"Try to work something out with the DM, to make it less OP.", modifiers:[0,1,1,0,0]},
        {text:"Very well, the almighty DM has spoken. I respect his judgement (gigachad response)", modifiers:[0,0,0,1,0]},
    ]},
    {name:"How much time would you reasonably spend working on a backstory for a character (in long-term campaign)?", answers:[
        // I C R S A
        {text:"A couple minutes. Backstory isn't all that important to me.", modifiers:[0,0,0,-2,0]},
        {text:"A day or two.", modifiers:[0,0,0,0,0]},
        {text:"Several days, potentially a week or two, if I'm feeling really inspired.", modifiers:[0,0,0,1,0]},
        {text:"I can't wait for the DM to read the novel I wrote!", modifiers:[0,0,0,2,0]}
    ]},
    {name:"Out of each of these skills, which ones would you prefer to be proficient in?", answers:[
        // I C R S A
        {text:"History or Religion.", modifiers:[0,0,0,2,1]},
        {text:"Athletics or Acrobatics.", modifiers:[0,2,0,0,0]},
        {text:"Deception or Persuasion.", modifiers:[0,0,0,0,2]},
        {text:"Sleight of Hand or Stealth.", modifiers:[1,0,0,0,0]}
    ]},
    {name:"People at your table would be most likely to describe you as...", answers:[
        // I C R S A
        {text:"Unpredictable.", modifiers:[1,0,0,0,0]},
        {text:"Knowledgable.", modifiers:[0,0,1,0,0]},
        {text:"Funny.", modifiers:[1,0,0,0,1]},
        {text:"Creative.", modifiers:[0,0,0,1,0]}
    ]},
    {name:"In combat, what's your state of mind?", answers:[
        // I C R S A
        {text:"Is there a way we can resolve this with words instead of weapons?", modifiers:[0,-1,0,0,2]},
        {text:"What's the most amount of damage I can possibly deal in one turn?", modifiers:[0,2,1,0,0]},
        {text:"Can't wait to loot the bodies!", modifiers:[2,0,0,0,0]},
        {text:"How will the aftermath of this battle affect my character's story?", modifiers:[0,0,-1,2,0]},
        {text:"I have no idea what's going on.", modifiers:[0,0,-2,0,0]},
    ]},
    {name:"What's your opinion on evil characters in your party?", answers:[
        // I C R S A
        {text:"Not a fan.", modifiers:[-1,0,0,0,0]},
        {text:"Personally, I don't care what kinds of characters are in my party.", modifiers:[0,0,0,0,0]},
        {text:"They're alright, but only if they're roleplayed well.", modifiers:[0,0,1,1,1]},
        {text:"I enjoy playing evil characters.", modifiers:[2,0,0,0,0]}
    ]},
    {name:"The party arrives in a new town, and you have some downtime. Where do you spend it?", answers:[
        // I C R S A
        {text:"The library.", modifiers:[0,0,1,2,0]},
        {text:"The tavern.", modifiers:[1,0,0,0,1]},
        {text:"The magic shop.", modifiers:[0,1,2,0,0]},
        {text:"The smithy.", modifiers:[0,2,0,0,0]},
    ]},
    {name:"To you, D&D is a...", answers:[
        // I C R S A
        {text:"Roleplaying game with storytelling elements", modifiers:[0,1,2,0,0]},
        {text:"Storytelling method with game-like elements.", modifiers:[0,0,0,2,1]},
        {text:"Party game where I can hang out and mess around.", modifiers:[1,0,-1,0,0]},
    ]},
];

var questionNumber = 0;
var question = questions[questionNumber]

//<input type="radio" id="radio1" name="question" value="1">
//<label for="radio1">a</label><br></br>
function buildForm() {
    questionForm.innerHTML = "";
    document.querySelector("h3").innerHTML = question.name;
    for (let i = 0; i < question.answers.length; i++) {
        let answer = question.answers[i].text
        let inp = document.createElement("input")
        inp.setAttribute("type", "radio")
        inp.setAttribute("id", "radio"+i)
        inp.setAttribute("name", "answer")
        inp.setAttribute("value", i);
    
        let label = document.createElement("label")
        label.setAttribute("for", inp.getAttribute("id"));
        label.innerHTML = answer;
    
        questionForm.appendChild(inp)
        questionForm.appendChild(label)
        questionForm.appendChild(document.createElement("br"))
    }
    let submit = document.createElement("input")
    submit.setAttribute("type", "button")
    submit.setAttribute("value", "Next")
    submit.setAttribute("onClick", "submitAnswer()")
    questionForm.appendChild(submit)
}

function submitAnswer() {
    let radioButtons = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    for (let button of radioButtons) {
        if (button.checked) {
            selectedAnswer = parseInt(button.value);
        }
    }

    let maxIndividual = [0,0,0,0,0]
    for (let i2 = 0; i2 < question.answers.length; i2++) { // all answers
        let modifiers = question.answers[i2].modifiers;
        for (let i = 0; i < modifiers.length; i++) {
            if (modifiers[i] > maxIndividual[i]) {
                maxIndividual[i] = modifiers[i]
            }
        }
    }

    for (let i = 0; i < metrics.length; i++) {
        maxMetrics[i] += maxIndividual[i];
    }
    for (let i = 0; i < metrics.length; i++) {
        metrics[i] += question.answers[selectedAnswer].modifiers[i]
    }
    console.log(metrics)

    questionNumber += 1
    question = questions[questionNumber]
    if (questionNumber >= questions.length) {
        console.log("Quiz completed.")
        console.log(maxMetrics)
        result = ""

        var highestMetric = 0
        var pos = 0;
        for (let i = 0; i < metrics.length; i++) {
            let x = metrics[i]
            metrics[i] = x / maxMetrics[i]
            if (x > highestMetric) {
                pos = i;
                highestMetric = x
            } 
        }
        matrix = [
            [
                {name:"Edgelord",desc:"The edgelord has a dark backstory that everyone's seen before. They do irrational and often inhumane things and try to justify it by saying that it's 'what their character would do.' They probably don't trust any of the party members and probably listen to my chemical romance."},
                {name:"Murder Hobo",desc:"The murder hobo needs no introduction, but he gets one anyway. He kills indiscriminately and constantly instigates chaos, often getting as close to the edge as they can just for the thrill of it. These players are a DM's worst nightmare."},],
            [
                {name:"Treasure Hunter",desc:"The treasure hunter is here to kick butt and find treasure. They're here for a good time, not a long time, and they're well aware of this-- which is why they often end up in hijinks of their own making. Give a treasure hunter a nice dungeon and a magic sword and they'll be happy."},
                {name:"Minmaxer",desc:"The minmaxer is here to show everyone else how good they are at this game. They ask themself, 'how much damage can I squeeze out of this one spell slot?' Each levelup is a refining process, an exciting opportunity to optimize their character and piss the DM off."},],
            [
                {name:"Rules Lawyer",desc:"For the rules lawyer, the player's handbook is tantamount to holy writ. They'll often correct other players and even the DM himself-- which is annoying, but they're usually also right. The ideal game for a rules lawyer is one that presents a decent challenge and is internally consistent."},
                {name:"Problem Solver",desc:"Problem solvers love a good challenge. Whether it's a riddle or a dungeon labrynth or a puzzling bit of lore, the problem solver will be the first to whip out a pencil and paper and start figuring stuff out. They like to experiment and try new things, always asking 'what if?'"},],
            [
                {name:"Dungeon Master",desc:"The Dungeon Master sometimes forgets he's not the one behind the screen, pointing out flaws and anticipating story arcs like a movie critic. If this is you, chances are you've DM'd before, and if you haven't, you should. Dungeon Masters enjoy storytelling, but also have a deep understanding of game mechanics."},
                {name:"20-Page Backstory Fiend",desc:"For a DM, the only thing more frightening than somebody who has no regard for the story whatsoever is the exact opposite: the 20 page backstory guy. There's a good chance they put more time into their characters than the DM does. They love it when the DM recognizes their backstory, and are often chagrined when the DM ignores or tampers with it. Honestly, they should just go write a novel."},],
            [
                {name:"Actor",desc:"The actor just wants to do one thing: Roleplay their wildest fantasies. They're vibrant. They're outspoken. They're invested. Well, at least until you throw them into combat, anyway. They like it when the Dungeon Master gives them chances to express their character's feelings and succeed in social interactions."},
                {name:"Seducer",desc:"We all know the stereotype. The sexy bard with 20 charisma, constantly getting laid. They don't care what orientation, race, or species. If it moves, they're doing it."},]]
        
        let front = pos + 1
        if (front >= metrics.length) front = 0
        let back = pos - 1
        if (back < 0) back = metrics.length - 1

        if (metrics[front] > metrics[back]) {
            result = matrix[pos][1]
        } else {
            result = matrix[pos][0]
        }

        document.querySelector("#youAre").innerHTML = "You are a..."
        document.querySelector("#result").innerHTML = result.name
        document.querySelector("#desc").innerHTML = result.desc

    } else {
        buildForm()
    }
}

buildForm()
   
let hexacoQuestions = {
    1: "I would be quite bored by a visit to an art gallery.",
    2: "I clean my office or home quite frequently.",
    3: "I rarely hold a grudge, even against people who have badly wronged me.",
    4: "I feel reasonably satisfied with myself overall.",
    5: "I would feel afraid if I had to travel in bad weather conditions.",
    6: "If I want something from a person I dislike, I will act very nicely toward that person in order to get it.",
    7: "I'm interested in learning about the history and politics of other countries.",
    8: "When working, I often set ambitious goals for myself.",
    9: "People sometimes tell me that I am too critical of others.",
    10: "I rarely express my opinions in group meetings.",
    11: "I sometimes can't help worrying about little things.",
    12: "If I knew that I could never get caught, I would be willing to steal a million dollars.",
    13: "I would like a job that requires following a routine rather than being creative. ",
    14: "I often check my work over repeatedly to find any mistakes.",
    15: "People sometimes tell me that I'm too stubborn.",
    16: "I avoid making \"small talk\" with people.",
    17: "When I suffer from a painful experience, I need someone to make me feel comfortable.",
    18: "Having a lot of money is not especially important to me.",
    19: "I think that paying attention to radical ideas is a waste of time.",
    20: "I make decisions based on the feeling of the moment rather than on careful thought.",
    21: "People think of me as someone who has a quick temper.",
    22: "I am energetic nearly all the time.",
    23: "I feel like crying when I see other people crying.",
    24: "I am an ordinary person who is no better than others.",
    25: "I wouldn't spend my time reading a book of poetry.",
    26: "I plan ahead and organize things, to avoid scrambling at the last minute.",
    27: "My attitude toward people who have treated me badly is \"forgive and forget\".",
    28: "I think that most people like some aspects of my personality.",
    29: "I don’t mind doing jobs that involve dangerous work.",
    30: "I wouldn't use flattery to get a raise or promotion at work, even if I thought it would succeed.",
    31: "I enjoy looking at maps of different places.",
    32: "I often push myself very hard when trying to achieve a goal.",
    33: "I generally accept people’s faults without complaining about them.",
    34: "In social situations, I'm usually the one who makes the first move.",
    35: "I worry a lot less than most people do.",
    36: "I would be tempted to buy stolen property if I were financially tight.",
    37: "I would enjoy creating a work of art, such as a novel, a song, or a painting.",
    38: "When working on something, I don't pay much attention to small details.",
    39: "I am usually quite flexible in my opinions when people disagree with me.",
    40: "I enjoy having lots of people around to talk with.",
    41: "I can handle difficult situations without needing emotional support from anyone else.",
    42: "I would like to live in a very expensive, high-class neighborhood.",
    43: "I like people who have unconventional views.",
    44: "I make a lot of mistakes because I don't think before I act.",
    45: "I rarely feel anger, even when people treat me quite badly.",
    46: "On most days, I feel cheerful and optimistic.",
    47: "When someone I know well is unhappy, I can almost feel that person's pain myself.",
    48: "I wouldn’t want people to treat me as though I were superior to them.",
    49: "If I had the opportunity, I would like to attend a classical music concert.",
    50: "People often joke with me about the messiness of my room or desk.",
    51: "If someone has cheated me once, I will always feel suspicious of that person.",
    52: "I feel that I am an unpopular person.",
    53: "When it comes to physical danger, I am very fearful.",
    54: "If I want something from someone, I will laugh at that person's worst jokes.",
    55: "I would be very bored by a book about the history of science and technology.",
    56: "Often when I set a goal, I end up quitting without having reached it.",
    57: "I tend to be lenient in judging other people.",
    58: "When I'm in a group of people, I'm often the one who speaks on behalf of the group.",
    59: "I rarely, if ever, have trouble sleeping due to stress or anxiety.",
    60: "I would never accept a bribe, even if it were very large.",
    61: "People have often told me that I have a good imagination.",
    62: "I always try to be accurate in my work, even at the expense of time.",
    63: "When people tell me that I’m wrong, my first reaction is to argue with them.",
    64: "I prefer jobs that involve active social interaction to those that involve working alone.",
    65: "Whenever I feel worried about something, I want to share my concern with another person.",
    66: "I would like to be seen driving around in a very expensive car.",
    67: "I think of myself as a somewhat eccentric person.",
    68: "I don’t allow my impulses to govern my behavior.",
    69: "Most people tend to get angry more quickly than I do.",
    70: "People often tell me that I should try to cheer up.",
    71: "I feel strong emotions when someone close to me is going away for a long time.",
    72: "I think that I am entitled to more respect than the average person is.",
    73: "Sometimes I like to just watch the wind as it blows through the trees.",
    74: "When working, I sometimes have difficulties due to being disorganized.",
    75: "I find it hard to fully forgive someone who has done something mean to me.",
    76: "I sometimes feel that I am a worthless person.",
    77: "Even in an emergency I wouldn't feel like panicking.",
    78: "I wouldn't pretend to like someone just to get that person to do favors for me.",
    79: "I’ve never really enjoyed looking through an encyclopedia.",
    80: "I do only the minimum amount of work needed to get by.",
    81: "Even when people make a lot of mistakes, I rarely say anything negative.",
    82: "I tend to feel quite self-conscious when speaking in front of a group of people.",
    83: "I get very anxious when waiting to hear about an important decision.",
    84: "I’d be tempted to use counterfeit money, if I were sure I could get away with it.",
    85: "I don't think of myself as the artistic or creative type.",
    86: "People often call me a perfectionist.",
    87: "I find it hard to compromise with people when I really think I’m right.",
    88: "The first thing that I always do in a new place is to make friends.",
    89: "I rarely discuss my problems with other people.",
    90: "I would get a lot of pleasure from owning expensive luxury goods.",
    91: "I find it boring to discuss philosophy.",
    92: "I prefer to do whatever comes to mind, rather than stick to a plan.",
    93: "I find it hard to keep my temper when people insult me.",
    94: "Most people are more upbeat and dynamic than I generally am.",
    95: "I remain unemotional even in situations where most people get very sentimental.",
    96: "I want people to know that I am an important person of high status.",
    97: "I have sympathy for people who are less fortunate than I am.",
    98: "I try to give generously to those in need.",
    99: "It wouldn’t bother me to harm someone I didn’t like.",
    100: "People see me as a hard-hearted person."
};

function getHexaco(value, json) {
    return json !== null
    ? parseInt(json["hexaco_" + value])
    : parseInt(document.getElementsByName("hexaco_" + value)[0].value);
}

function getReverseHexaco(value, json) {
    return 6 - getHexaco(value, json);
}

let personnalityTraits = [
    "sincerity", "fairness", "greed_avoidance", "modesty",
    "fearfulness", "anxiety", "dependence", "sentimentality",
    "social_self_esteem", "social_boldness", "sociability", "liveliness",
    "forgivingness", "gentleness", "flexibility", "patience",
    "organization", "diligence", "perfectionism", "prudence",
    "aesthetic_appreciation", "inquisitiveness", "creativity", "unconventionality",
    "altruism"
]

function isPersonnalityTrait(attribut) {
    return personnalityTraits.some((x) => attribut.startsWith(x));
}

// We consider a personnality is set if one of the trait don't have the default value of 3
function isPersonnalitySet(json) {
    for (const [_, value] of Object.entries(getPersonnality(json))) {
        if (value !== 3) return true;
    }
    return false;
}

function calculatePersonnnalityDifference(json1, json2) {
    let total = 0;
    let resJson1 = getPersonnality(json1);
    let resJson2 = getPersonnality(json2);
    for (const [_, trait] of Object.entries(personnalityTraits)) {
        total += Math.abs(resJson1[trait] - resJson2[trait]);
    }
    return total;
}

function getPersonnality(json) {
    let p = { };

    p["sincerity"] = (getReverseHexaco(6, json) + getHexaco(30, json) + getReverseHexaco(54, json) + getHexaco(78, json)) / 4;
    p["fairness"] = (getReverseHexaco(12, json) + getReverseHexaco(36, json) + getHexaco(60, json) + getReverseHexaco(84, json)) / 4;
    p["greed_avoidance"] = (getHexaco(18, json) + getReverseHexaco(42, json) + getReverseHexaco(66, json) + getReverseHexaco(90, json)) / 4;
    p["modesty"] = (getHexaco(24, json) + getHexaco(48, json) + getReverseHexaco(72, json) + getReverseHexaco(96, json)) / 4;

    p["fearfulness"] = (getHexaco(5, json) + getReverseHexaco(29, json) + getHexaco(53, json) + getReverseHexaco(77, json)) / 4;
    p["anxiety"] = (getHexaco(11, json) + getReverseHexaco(35, json) + getReverseHexaco(59, json) + getHexaco(83, json)) / 4;
    p["dependence"] = (getHexaco(17, json) + getReverseHexaco(41, json) + getHexaco(65, json) + getReverseHexaco(89, json)) / 4;
    p["sentimentality"] = (getHexaco(23, json) + getHexaco(47, json) + getHexaco(71, json) + getReverseHexaco(95, json)) / 4;

    p["social_self_esteem"] = (getHexaco(4, json) + getHexaco(28, json) + getReverseHexaco(52, json) + getReverseHexaco(76, json)) / 4;
    p["social_boldness"] = (getReverseHexaco(10, json) + getHexaco(34, json) + getHexaco(58, json) + getReverseHexaco(82, json)) / 4;
    p["sociability"] = (getReverseHexaco(16, json) + getHexaco(40, json) + getHexaco(64, json) + getHexaco(88, json)) / 4;
    p["liveliness"] = (getHexaco(22, json) + getHexaco(46, json) + getReverseHexaco(70, json) + getReverseHexaco(94, json)) / 4;

    p["forgivingness"] = (getHexaco(3, json) + getHexaco(27, json) + getReverseHexaco(51, json) + getReverseHexaco(75, json)) / 4;
    p["gentleness"] = (getReverseHexaco(9, json) + getHexaco(33, json) + getHexaco(57, json) + getHexaco(81, json)) / 4;
    p["flexibility"] = (getReverseHexaco(15, json) + getHexaco(39, json) + getReverseHexaco(63, json) + getReverseHexaco(87, json)) / 4;
    p["patience"] = (getReverseHexaco(21, json) + getHexaco(45, json) + getHexaco(69, json) + getReverseHexaco(93, json)) / 4;

    p["organization"] = (getHexaco(2, json) + getHexaco(26, json) + getReverseHexaco(50, json) + getReverseHexaco(74, json)) / 4;
    p["diligence"] = (getHexaco(8, json) + getHexaco(32, json) + getReverseHexaco(56, json) + getReverseHexaco(80, json)) / 4;
    p["perfectionism"] = (getHexaco(14, json) + getReverseHexaco(38, json) + getHexaco(62, json) + getHexaco(86, json)) / 4;
    p["prudence"] = (getReverseHexaco(20, json) + getReverseHexaco(44, json) + getHexaco(68, json) + getReverseHexaco(92, json)) / 4;

    p["aesthetic_appreciation"] = (getReverseHexaco(1, json) + getReverseHexaco(25, json) + getHexaco(49, json) + getHexaco(73, json)) / 4;
    p["inquisitiveness"] = (getHexaco(7, json) + getHexaco(31, json) + getReverseHexaco(55, json) + getReverseHexaco(79, json)) / 4;
    p["creativity"] = (getReverseHexaco(13, json) + getHexaco(37, json) + getHexaco(61, json) + getReverseHexaco(85, json)) / 4;
    p["unconventionality"] = (getReverseHexaco(19, json) + getHexaco(43, json) + getHexaco(67, json) + getReverseHexaco(91, json)) / 4;

    p["altruism"] = (getHexaco(97, json) + getHexaco(98, json) + getReverseHexaco(99, json) + getReverseHexaco(100, json)) / 4;

    return p;
}

function personnalityCtor() {
    let str = "";
    for (const [index, question] of Object.entries(hexacoQuestions)) {
        str += index + ". " + question + '<br/><input type="range" name="hexaco_' + index + '" min="1" max="5" value="3"/><span class="personnalityValue" id="hexacoValue_' + index + '">Neutral</span><br/>';
    }
    document.getElementById("hexacoQuizz").innerHTML = str;
    for (let i = 1; i <= 100; i++) {
        document.getElementsByName("hexaco_" + i)[0].addEventListener("change", function (e) {
            let value;
            switch (e.target.value) {
                case "1":
                    value = "Strongly Disagree";
                    break;
                    
                case "2":
                    value = "Disagree";
                    break;
                    
                case "3":
                    value = "Neutral";
                    break;
                    
                case "4":
                    value = "Agree";
                    break;
                    
                case "5":
                    value = "Strongly Agree";
                    break;
            }
            document.getElementById("hexacoValue_" + i).innerHTML = value;
            calculatePersonnality(null);
        });
    };
}
const express = require('express');
const path = require('path');
const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(allowCrossDomain);


app.get("/test", (request, response) => {
    response.sendFile(__dirname + "/public/test.html");
});

const verbs = [
    {en: 'break down', ru: 'ломаться'},
    {en: 'call back', ru: 'перезвонить'},
    {en: 'carry on', ru: 'продолжать'},
    {en: 'figure out', ru: 'понимать'},
    {en: 'find out', ru: 'выяснять'},
    {en: 'get away', ru: 'сбегать'},
    {en: 'get up', ru: 'вставать'},
    {en: 'look after', ru: 'заботиться'},
    {en: 'try on', ru: 'примерять'},
    {en: 'turn into', ru: 'превратиться'},
];

const nouns = [
    {en: 'air', ru: 'воздух'},
    {en: 'bottom', ru: 'низ'},
    {en: 'example', ru: 'пример'},
    {en: 'side', ru: 'сторона'},
    {en: 'sentence', ru: 'предложение'},
    {en: 'story', ru: 'история'},
    {en: 'top', ru: 'вершина'},
    {en: 'watch', ru: 'часы'},
    {en: 'wood', ru: 'лес'},
    {en: 'word', ru: 'слово'},
];

const prepositions = [
    {en: 'in', ru: 'в'},
    {en: 'on', ru: 'на'},
    {en: 'at', ru: 'около'},
    {en: 'since', ru: 'с тех пор как'},
    {en: 'during', ru: 'в течение'},
    {en: 'from', ru: 'от'},
    {en: 'to', ru: 'к'},
    {en: 'between', ru: 'между'},
    {en: 'behind', ru: 'за'},
    {en: 'until', ru: 'до'},
]

app.get("/verbs", (request, response) => {
    response.set({
        'Access-Control-Allow-Origin': '*'
    })
    response.json(verbs);
});

app.get("/nouns", (request, response) => {
    response.set({
        'Access-Control-Allow-Origin': '*'
    })
    response.json(nouns);
});

app.get("/prepositions", (request, response) => {
    response.set({
        'Access-Control-Allow-Origin': '*'
    })
    response.json(prepositions);
});



app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})

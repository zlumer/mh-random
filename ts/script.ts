/*
TODO:
1. Calculate on every click
2. Add 'wanted' checkbox
3. Add 'ultimate wanted' checkbox
4. Add statements: 'all heroes have equal chances', 'random is random, don't rely on the numbers', etc.
5. Save selection in local storage on every click
6. Add 'clear all' button
7. Add link anchors to save selections (and update anchor on every click) - it's not that hard, just base64 current selection
8. Add meta keywords for SEO


Not gonna happen:
3. Show & edit hero list JSON (github fork/pull request instead)

- add checkbox 'I don't mind getting duplicate of this hero (ult token)'

*/

/// <reference path="./all.d.ts" />

var HEROES:IHero[] = HeroesList.HEROES;
var calc = new Calculator(HEROES);

prepareRoster();

function prepareRoster()
{
    var tmpl = doT.template($('script#hero-pic-template').text());
    for (var i = 0; i < HEROES.length; i++)
    {
        var hero = HEROES[i];
        $('#roster').append(tmpl({ hero:hero, idx:i }));
    }
}
function populateOwned()
{
    
}

function printChances()
{
    $('#result > .duplicate > .value').text('' + (calc.chanceToGetOwned * 100).toFixed(2) + '%');
}
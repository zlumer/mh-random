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

__test__();

prepareRoster();

printChances([true, false]);

function prepareRoster()
{
    var p = '<div class="col-md-1 hero-pic" data-id="{{id}}"><label><img src="{{img}}"/><input type="checkbox"/><span class="hero-name">{{name}}</span></label></div>';
    for (var i = 0; i < HEROES.length; i++)
    {
        var hero = HEROES[i];
        $('#roster').append(p.replace('{{name}}', hero.name).replace('{{img}}', hero.img).replace('{{id}}', i.toString()));
        if (!hero.es)
        {
            $('#roster').append("<p>" + hero.name + " missing ES price</p>");
        }
    }
}
function populateOwned()
{
    
}

function printChances(ownedIdxs)
{
    var owned = Calculator.getOwnedHeroes(HEROES, ownedIdxs);
    
    var totalPrice = Calculator.sumPrice(HEROES);
    var ownedPrice = Calculator.sumPrice(owned);
    
    $('#result > .duplicate > .value').text('' + (Calculator.chanceToGetOwned(owned.length, HEROES.length) * 100).toFixed(2) + '%');
}
function __test__()
{
    console.assert(Calculator.chanceToGetOwned(1, 10) == 1/10, "chanceToGetOwned(1, 10)");
    console.assert(Calculator.chanceToGetOwned(10, 10) == 1, "chanceToGetOwned(10, 10)");
    console.assert(Calculator.chanceToGetOwned(1, 1) == 1, "chanceToGetOwned(1, 1)");
    console.assert(Calculator.chanceToGetOwned(1, 2) == 1/2, "chanceToGetOwned(1, 2)");
    console.assert(Calculator.chanceToGetOwned(0, 1) == 0, "chanceToGetOwned(0, 1)");
    console.assert(Calculator.chanceToGetOwned(0, 15) == 0, "chanceToGetOwned(0, 15)");
    
    console.assert(Calculator.chanceToGetNew(1, 10) == 9/10);
    console.assert(Calculator.chanceToGetNew(1, 1) == 0);
    console.assert(Calculator.chanceToGetNew(0, 1) == 1);
    
    console.assert(Calculator.getOwnedHeroes([1,2,3], [true, false]).length == 1);
    
    console.assert(Calculator.sumPrice(HEROES) == Calculator.sumPrice(Calculator.getNewHeroes(HEROES, [])), "sumPrice = " + Calculator.sumPrice(HEROES) + " / " + Calculator.sumPrice(Calculator.getNewHeroes(HEROES, [])));
}
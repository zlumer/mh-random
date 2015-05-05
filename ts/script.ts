/*
TODO:
1. Add hero pictures.
2. Some actual calculations.
3. Show & edit hero list JSON.
4. Insert missing ES prices.

- add checkbox 'I don't mind getting duplicate of this hero (ult token)'

*/

/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./heroes.ts" />

var HEROES:IHero[] = HeroesList.HEROES;

__test__();

prepareRoster();

printChances([true, false]);

function prepareRoster()
{
    var p = '<div class="col-md-1 hero-pic"><label><img src="{{img}}"/><input type="checkbox"/><span class="hero-name">{{name}}</span></label></div>';
    for (var i = 0; i < HEROES.length; i++)
    {
        var hero = HEROES[i];
        $('#roster').append(p.replace('{{name}}', hero.name).replace('{{img}}', hero.img));
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
    var owned = getOwnedHeroes(HEROES, ownedIdxs);
    
    var totalPrice = sumPrice(HEROES);
    var ownedPrice = sumPrice(owned);
    
    $('#result > .duplicate > .value').text('' + (chanceToGetOwned(owned.length, HEROES.length) * 100).toFixed(2) + '%');
}

function getOwnedHeroes(heroes, ownedIdxs)
{
    return heroes.filter(function(hero, idx){ return ownedIdxs[idx]; })
}
function getNewHeroes(heroes, ownedIdxs)
{
    return heroes.filter(function(hero, idx){ return !ownedIdxs[idx]; })
}
function sumPrice(heroes)
{
    return heroes.reduce(function(sum, hero){ return sum + (hero.es || 0); }, 0);
}
function chanceToGetNew(ownedCount, totalCount)
{
    return (totalCount - ownedCount) / totalCount;
}
function chanceToGetOwned(ownedCount, totalCount)
{
    return ownedCount / totalCount;
}
function __test__()
{
    console.assert(chanceToGetOwned(1, 10) == 1/10, "chanceToGetOwned(1, 10)");
    console.assert(chanceToGetOwned(10, 10) == 1, "chanceToGetOwned(10, 10)");
    console.assert(chanceToGetOwned(1, 1) == 1, "chanceToGetOwned(1, 1)");
    console.assert(chanceToGetOwned(1, 2) == 1/2, "chanceToGetOwned(1, 2)");
    console.assert(chanceToGetOwned(0, 1) == 0, "chanceToGetOwned(0, 1)");
    console.assert(chanceToGetOwned(0, 15) == 0, "chanceToGetOwned(0, 15)");
    
    console.assert(chanceToGetNew(1, 10) == 9/10);
    console.assert(chanceToGetNew(1, 1) == 0);
    console.assert(chanceToGetNew(0, 1) == 1);
    
    console.assert(getOwnedHeroes([1,2,3], [true, false]).length == 1);
    
    console.assert(sumPrice(HEROES) == sumPrice(getNewHeroes(HEROES, [])), "sumPrice = " + sumPrice(HEROES) + " / " + sumPrice(getNewHeroes(HEROES, [])));
}
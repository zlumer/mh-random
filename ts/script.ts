/*
TODO:
1. Add hero pictures.
2. Some actual calculations.
3. Show & edit hero list JSON.
4. Insert missing ES prices.

- add checkbox 'I don't mind getting duplicate of this hero (ult token)'

*/

var HEROES =
[{"name":"Black Panther","img":"https://marvelheroes.com/sites/default/files/character/image/black_panther_1.png","es":400},{"name":"Black Widow","img":"https://marvelheroes.com/sites/default/files/character/image/black_widow_4.png","es":200},{"name":"Cable","img":"https://marvelheroes.com/sites/default/files/character/image/cable_2.png","es":400},{"name":"Captain America","img":"https://marvelheroes.com/sites/default/files/character/image/captain_america_2.png","es":400},{"name":"Colossus","img":"https://marvelheroes.com/sites/default/files/character/image/colossus_2.png","es":400},{"name":"Cyclops","img":"https://marvelheroes.com/sites/default/files/character/image/cyclops_2.png","es":400},{"name":"Daredevil","img":"https://marvelheroes.com/sites/default/files/character/image/dare_devil_2.png","es":200},{"name":"Deadpool","img":"https://marvelheroes.com/sites/default/files/character/image/deadpool_2.png","es":600},{"name":"Doctor Strange","img":"https://marvelheroes.com/sites/default/files/character/image/DrStrange_2.png"},{"name":"Emma Frost","img":"https://marvelheroes.com/sites/default/files/character/image/emma_frost_2.png"},{"name":"Gambit","img":"https://marvelheroes.com/sites/default/files/character/image/Gambit_new_4.png"},{"name":"Ghost Rider","img":"https://marvelheroes.com/sites/default/files/character/image/GhostRider_2.png"},{"name":"Hawkeye","img":"https://marvelheroes.com/sites/default/files/character/image/hawkeye_2.png","es":200},{"name":"Hulk","img":"https://marvelheroes.com/sites/default/files/character/image/hulk_2.png","es":400},{"name":"Human Torch","img":"https://marvelheroes.com/sites/default/files/character/image/human_torch_1.png","es":400},{"name":"Invisible Woman","img":"https://marvelheroes.com/sites/default/files/character/image/InvisibleWoman_1.png"},{"name":"Iron Man","img":"https://marvelheroes.com/sites/default/files/character/image/iron_man_2.png","es":600},{"name":"Jean Grey","img":"https://marvelheroes.com/sites/default/files/character/image/jean_grey_2.png","es":400},{"name":"Loki","img":"https://marvelheroes.com/sites/default/files/character/image/loki_1.png"},{"name":"Luke Cage","img":"https://marvelheroes.com/sites/default/files/character/image/luke_cage_1.png"},{"name":"Moon Knight","img":"https://marvelheroes.com/sites/default/files/character/image/MoonKnight_2.png"},{"name":"Ms. Marvel","img":"https://marvelheroes.com/sites/default/files/character/image/ms_marvel_2.png"},{"name":"Nightcrawler","img":"https://marvelheroes.com/sites/default/files/character/image/Nightcrawler_2.png"},{"name":"Psylocke","img":"https://marvelheroes.com/sites/default/files/character/image/Psylocke_1.png"},{"name":"Punisher","img":"https://marvelheroes.com/sites/default/files/character/image/punisher_2.png","es":400},{"name":"Rocket Raccoon","img":"https://marvelheroes.com/sites/default/files/character/image/rocket_raccoon_2.png","es":400},{"name":"Scarlet Witch","img":"https://marvelheroes.com/sites/default/files/character/image/scarlet_witch_3.png","es":200},{"name":"Spider-Man","img":"https://marvelheroes.com/sites/default/files/character/image/spider-man_2.png","es":600},{"name":"Squirrel Girl","img":"https://marvelheroes.com/sites/default/files/character/image/squirrel_girl_2.png"},{"name":"Storm","img":"https://marvelheroes.com/sites/default/files/character/image/storm_2.png","es":200},{"name":"Taskmaster","img":"https://marvelheroes.com/sites/default/files/character/image/Taskmaster_2.png"},{"name":"Thing","img":"https://marvelheroes.com/sites/default/files/character/image/thing_2.png","es":200},{"name":"Thor","img":"https://marvelheroes.com/sites/default/files/character/image/thor_2.png","es":400},{"name":"Wolverine","img":"https://marvelheroes.com/sites/default/files/character/image/wolverine_2.png","es":400}];
/// to grab the heroes list, go to:
// https://marvelheroes.com/heroes/list
/// and run the script:
/*
var arr = Array.prototype.slice.call(document.getElementsByClassName("views-row"));arr.pop();arr.shift();
JSON.stringify(arr.map(function(a){ return {name:a.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].innerHTML, img:a.getElementsByTagName('img')[0].getAttributeNode('src').value}; }));
*/
/// you should have an array of heroes with images

/// grab hero prices:
// http://orcz.com/Marvel_Heroes:_Eternity_Splinters_Hero_Pricing
///
/*
JSON.stringify($('.wikitable').find('tr').toArray().map(function(item){ var tds = $(item).find('td'); return {name:$(tds[0]).text().replace(/^\s*\s?/,'').replace(/\s*$/, ''), es:parseInt($(tds[1]).text())}; }))
*/

__test__();

prepareRoster();

printChances([true, false]);

function prepareRoster()
{
    var p = '<div class="col-md-1 checkbox hero-pic"><label><input type="checkbox"/><span class="hero-name">{{name}}</span></label></div>';
    for (var i = 0; i < HEROES.length; i++)
    {
        var hero = HEROES[i];
        $('#roster').append(p.replace('{{name}}', hero.name));
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
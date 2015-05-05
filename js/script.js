var HeroesList = (function () {
    function HeroesList() {
    }
    /// newest heroes list:
    // http://marvelheroes.info/getitems.php?g=14
    HeroesList.parseHero = function (arr) {
        // example:
        // 	"<a href=\"\/item\/87\/\" class=\"type_14\"><img class=\"ipsIcon ibslot\" data-id=\"87\" src=\"\/img\/chars\/blackwidow.png\"><\/a>",
        // 	"<a href=\"\/item\/87\/\" class=\"ibslink\" data-id=\"87\">Black Widow<\/a>",
        // 	"200",
        var img = 'http://marvelheroes.info' + ("" + arr[0]).match(/src\=\"([^\"]*)\"/)[1];
        var name = ("" + arr[1]).match(/\>(.*)\</)[1];
        var es = parseInt("" + arr[2]);
        return {
            name: name,
            img: img,
            es: es
        };
    };
    HeroesList.HEROES = [{ "name": "Black Panther", "img": "http://marvelheroes.info/img/chars/blackpanther.png", "es": 400 }, { "name": "Black Widow", "img": "http://marvelheroes.info/img/chars/blackwidow.png", "es": 200 }, { "name": "Cable", "img": "http://marvelheroes.info/img/chars/cable.png", "es": 400 }, { "name": "Captain America", "img": "http://marvelheroes.info/img/chars/captainamerica.png", "es": 400 }, { "name": "Colossus", "img": "http://marvelheroes.info/img/chars/colossus.png", "es": 400 }, { "name": "Cyclops", "img": "http://marvelheroes.info/img/chars/cyclops.png", "es": 400 }, { "name": "Daredevil", "img": "http://marvelheroes.info/img/chars/daredevil.png", "es": 200 }, { "name": "Deadpool", "img": "http://marvelheroes.info/img/chars/deadpool.png", "es": 600 }, { "name": "Doctor Strange", "img": "http://marvelheroes.info/img/chars/drstrange.png", "es": 600 }, { "name": "Emma Frost", "img": "http://marvelheroes.info/img/chars/emmafrost.png", "es": 400 }, { "name": "Gambit", "img": "http://marvelheroes.info/img/chars/gambit.png", "es": 400 }, { "name": "Ghost Rider", "img": "http://marvelheroes.info/img/chars/ghostrider.png", "es": 600 }, { "name": "Hawkeye", "img": "http://marvelheroes.info/img/chars/hawkeye.png", "es": 200 }, { "name": "Hulk", "img": "http://marvelheroes.info/img/chars/hulk.png", "es": 400 }, { "name": "Human Torch", "img": "http://marvelheroes.info/img/chars/humantorch.png", "es": 400 }, { "name": "Invisible Woman", "img": "http://marvelheroes.info/img/chars/invisiblewoman.png", "es": 400 }, { "name": "Iron Man", "img": "http://marvelheroes.info/img/chars/ironman.png", "es": 600 }, { "name": "Jean Grey", "img": "http://marvelheroes.info/img/chars/jeangrey.png", "es": 400 }, { "name": "Loki", "img": "http://marvelheroes.info/img/chars/loki.png", "es": 400 }, { "name": "Luke Cage", "img": "http://marvelheroes.info/img/chars/lukecage.png", "es": 400 }, { "name": "Moon Knight", "img": "http://marvelheroes.info/img/chars/moonknight.png", "es": 400 }, { "name": "Ms. Marvel", "img": "http://marvelheroes.info/img/chars/msmarvel.png", "es": 400 }, { "name": "Nightcrawler", "img": "http://marvelheroes.info/img/chars/nightcrawler.png", "es": 400 }, { "name": "Psylocke", "img": "http://marvelheroes.info/img/chars/psylocke.png", "es": 400 }, { "name": "Punisher", "img": "http://marvelheroes.info/img/chars/punisher.png", "es": 400 }, { "name": "Rocket Raccoon", "img": "http://marvelheroes.info/img/chars/rocketraccoon.png", "es": 400 }, { "name": "Scarlet Witch", "img": "http://marvelheroes.info/img/chars/scarletwitch.png", "es": 200 }, { "name": "Spider-Man", "img": "http://marvelheroes.info/img/chars/spiderman.png", "es": 600 }, { "name": "Squirrel Girl", "img": "http://marvelheroes.info/img/chars/squirrel.png", "es": 400 }, { "name": "Storm", "img": "http://marvelheroes.info/img/chars/storm.png", "es": 200 }, { "name": "Taskmaster", "img": "http://marvelheroes.info/img/chars/taskmaster.png", "es": 200 }, { "name": "Thing", "img": "http://marvelheroes.info/img/chars/thing.png", "es": 200 }, { "name": "Thor", "img": "http://marvelheroes.info/img/chars/thor.png", "es": 400 }, { "name": "Wolverine", "img": "http://marvelheroes.info/img/chars/wolverine.png", "es": 400 }, { "name": "Silver Surfer", "img": "http://marvelheroes.info/img/chars/silversurfer.png", "es": 400 }, { "name": "Mr. Fantastic", "img": "http://marvelheroes.info/img/chars/mrfantastic.png", "es": 400 }, { "name": "Star-Lord", "img": "http://marvelheroes.info/img/chars/starlord.png", "es": 400 }, { "name": "Rogue", "img": "http://marvelheroes.info/img/chars/rogue.png", "es": 600 }, { "name": "Nova", "img": "http://marvelheroes.info/img/chars/nova.png", "es": 400 }, { "name": "Juggernaut", "img": "http://marvelheroes.info/img/chars/juggernaut.png", "es": 400 }, { "name": "Magneto", "img": "http://marvelheroes.info/img/chars/magneto.png", "es": 400 }, { "name": "X-23", "img": "http://marvelheroes.info/img/chars/x23.png", "es": 200 }, { "name": "Venom", "img": "http://marvelheroes.info/img/chars/venom.png", "es": 400 }, { "name": "She-Hulk", "img": "http://marvelheroes.info/img/chars/shehulk.png", "es": 400 }, { "name": "Winter Soldier", "img": "http://marvelheroes.info/img/chars/wintersoldier.png", "es": 400 }, { "name": "Iceman", "img": "http://marvelheroes.info/img/chars/iceman.png", "es": 400 }, { "name": "Vision", "img": "http://marvelheroes.info/img/chars/drop_vision.png", "es": 400 }];
    return HeroesList;
})();
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
var HEROES = HeroesList.HEROES;
__test__();
prepareRoster();
printChances([true, false]);
function prepareRoster() {
    var p = '<div class="col-md-1 hero-pic"><label><img src="{{img}}"/><input type="checkbox"/><span class="hero-name">{{name}}</span></label></div>';
    for (var i = 0; i < HEROES.length; i++) {
        var hero = HEROES[i];
        $('#roster').append(p.replace('{{name}}', hero.name).replace('{{img}}', hero.img));
        if (!hero.es) {
            $('#roster').append("<p>" + hero.name + " missing ES price</p>");
        }
    }
}
function populateOwned() {
}
function printChances(ownedIdxs) {
    var owned = getOwnedHeroes(HEROES, ownedIdxs);
    var totalPrice = sumPrice(HEROES);
    var ownedPrice = sumPrice(owned);
    $('#result > .duplicate > .value').text('' + (chanceToGetOwned(owned.length, HEROES.length) * 100).toFixed(2) + '%');
}
function getOwnedHeroes(heroes, ownedIdxs) {
    return heroes.filter(function (hero, idx) { return ownedIdxs[idx]; });
}
function getNewHeroes(heroes, ownedIdxs) {
    return heroes.filter(function (hero, idx) { return !ownedIdxs[idx]; });
}
function sumPrice(heroes) {
    return heroes.reduce(function (sum, hero) { return sum + (hero.es || 0); }, 0);
}
function chanceToGetNew(ownedCount, totalCount) {
    return (totalCount - ownedCount) / totalCount;
}
function chanceToGetOwned(ownedCount, totalCount) {
    return ownedCount / totalCount;
}
function __test__() {
    console.assert(chanceToGetOwned(1, 10) == 1 / 10, "chanceToGetOwned(1, 10)");
    console.assert(chanceToGetOwned(10, 10) == 1, "chanceToGetOwned(10, 10)");
    console.assert(chanceToGetOwned(1, 1) == 1, "chanceToGetOwned(1, 1)");
    console.assert(chanceToGetOwned(1, 2) == 1 / 2, "chanceToGetOwned(1, 2)");
    console.assert(chanceToGetOwned(0, 1) == 0, "chanceToGetOwned(0, 1)");
    console.assert(chanceToGetOwned(0, 15) == 0, "chanceToGetOwned(0, 15)");
    console.assert(chanceToGetNew(1, 10) == 9 / 10);
    console.assert(chanceToGetNew(1, 1) == 0);
    console.assert(chanceToGetNew(0, 1) == 1);
    console.assert(getOwnedHeroes([1, 2, 3], [true, false]).length == 1);
    console.assert(sumPrice(HEROES) == sumPrice(getNewHeroes(HEROES, [])), "sumPrice = " + sumPrice(HEROES) + " / " + sumPrice(getNewHeroes(HEROES, [])));
}

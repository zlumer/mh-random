var Calculator = (function () {
    function Calculator(_heroes) {
        this._heroes = _heroes;
        this.clearOwned();
    }
    Calculator.prototype.setOwned = function (idx, owned) {
        this.ownedIdxs[idx] = owned;
    };
    Calculator.prototype.isOwned = function (idx) {
        return !!this.ownedIdxs[idx];
    };
    Calculator.prototype.clearOwned = function () {
        this.ownedIdxs = this._heroes.map(function () { return false; });
    };
    Object.defineProperty(Calculator.prototype, "hasAnyOwnedHeroes", {
        get: function () {
            return !!this.ownedHeroes.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "ownedHeroes", {
        get: function () {
            var _this = this;
            return this._heroes.filter(function (hero, idx) { return _this.ownedIdxs[idx]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "newHeroes", {
        get: function () {
            var _this = this;
            return this._heroes.filter(function (hero, idx) { return !_this.ownedIdxs[idx]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "totalHeroesPrice", {
        get: function () {
            return this._heroes.reduce(function (sum, hero) { return sum + (hero.es || 0); }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "totalNewHeroesPrice", {
        get: function () {
            return this.newHeroes.reduce(function (sum, hero) { return sum + (hero.es || 0); }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "expectedReturn", {
        get: function () {
            if (!this.newHeroes.length)
                return 0;
            return this.totalNewHeroesPrice / this.newHeroes.length * this.chanceToGetNew / Calculator.BOX_COST;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "chanceToGetNew", {
        get: function () {
            return (this._heroes.length - this.ownedHeroes.length) / this._heroes.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "chanceToGetOwned", {
        get: function () {
            return this.ownedHeroes.length / this._heroes.length;
        },
        enumerable: true,
        configurable: true
    });
    Calculator.BOX_COST = 175;
    return Calculator;
})();
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
    HeroesList.HEROES = [{ "name": "Black Panther", "img": "http://marvelheroes.info/img/chars/blackpanther.png", "es": 400 }, { "name": "Black Widow", "img": "http://marvelheroes.info/img/chars/blackwidow.png", "es": 200 }, { "name": "Cable", "img": "http://marvelheroes.info/img/chars/cable.png", "es": 400 }, { "name": "Captain America", "img": "http://marvelheroes.info/img/chars/captainamerica.png", "es": 400 }, { "name": "Colossus", "img": "http://marvelheroes.info/img/chars/colossus.png", "es": 400 }, { "name": "Cyclops", "img": "http://marvelheroes.info/img/chars/cyclops.png", "es": 400 }, { "name": "Daredevil", "img": "http://marvelheroes.info/img/chars/daredevil.png", "es": 200 }, { "name": "Deadpool", "img": "http://marvelheroes.info/img/chars/deadpool.png", "es": 600 }, { "name": "Doctor Strange", "img": "http://marvelheroes.info/img/chars/drstrange.png", "es": 600 }, { "name": "Emma Frost", "img": "http://marvelheroes.info/img/chars/emmafrost.png", "es": 400 }, { "name": "Gambit", "img": "http://marvelheroes.info/img/chars/gambit.png", "es": 400 }, { "name": "Ghost Rider", "img": "http://marvelheroes.info/img/chars/ghostrider.png", "es": 600 }, { "name": "Hawkeye", "img": "http://marvelheroes.info/img/chars/hawkeye.png", "es": 200 }, { "name": "Hulk", "img": "http://marvelheroes.info/img/chars/hulk.png", "es": 400 }, { "name": "Human Torch", "img": "http://marvelheroes.info/img/chars/humantorch.png", "es": 400 }, { "name": "Invisible Woman", "img": "http://marvelheroes.info/img/chars/invisiblewoman.png", "es": 400 }, { "name": "Iron Man", "img": "http://marvelheroes.info/img/chars/ironman.png", "es": 600 }, { "name": "Jean Grey", "img": "http://marvelheroes.info/img/chars/jeangrey.png", "es": 400 }, { "name": "Loki", "img": "http://marvelheroes.info/img/chars/loki.png", "es": 400 }, { "name": "Luke Cage", "img": "http://marvelheroes.info/img/chars/lukecage.png", "es": 400 }, { "name": "Moon Knight", "img": "http://marvelheroes.info/img/chars/moonknight.png", "es": 400 }, { "name": "Ms. Marvel", "img": "http://marvelheroes.info/img/chars/msmarvel.png", "es": 400 }, { "name": "Nightcrawler", "img": "http://marvelheroes.info/img/chars/nightcrawler.png", "es": 400 }, { "name": "Psylocke", "img": "http://marvelheroes.info/img/chars/psylocke.png", "es": 400 }, { "name": "Punisher", "img": "http://marvelheroes.info/img/chars/punisher.png", "es": 400 }, { "name": "Rocket Raccoon", "img": "http://marvelheroes.info/img/chars/rocketraccoon.png", "es": 400 }, { "name": "Scarlet Witch", "img": "http://marvelheroes.info/img/chars/scarletwitch.png", "es": 200 }, { "name": "Spider-Man", "img": "http://marvelheroes.info/img/chars/spiderman.png", "es": 600 }, { "name": "Squirrel Girl", "img": "http://marvelheroes.info/img/chars/squirrel.png", "es": 400 }, { "name": "Storm", "img": "http://marvelheroes.info/img/chars/storm.png", "es": 200 }, { "name": "Taskmaster", "img": "http://marvelheroes.info/img/chars/taskmaster.png", "es": 200 }, { "name": "Thing", "img": "http://marvelheroes.info/img/chars/thing.png", "es": 200 }, { "name": "Thor", "img": "http://marvelheroes.info/img/chars/thor.png", "es": 400 }, { "name": "Wolverine", "img": "http://marvelheroes.info/img/chars/wolverine.png", "es": 400 }, { "name": "Silver Surfer", "img": "http://marvelheroes.info/img/chars/silversurfer.png", "es": 400 }, { "name": "Mr. Fantastic", "img": "http://marvelheroes.info/img/chars/mrfantastic.png", "es": 400 }, { "name": "Star-Lord", "img": "http://marvelheroes.info/img/chars/starlord.png", "es": 400 }, { "name": "Rogue", "img": "http://marvelheroes.info/img/chars/rogue.png", "es": 600 }, { "name": "Nova", "img": "http://marvelheroes.info/img/chars/nova.png", "es": 400 }, { "name": "Juggernaut", "img": "http://marvelheroes.info/img/chars/juggernaut.png", "es": 400 }, { "name": "Magneto", "img": "http://marvelheroes.info/img/chars/magneto.png", "es": 400 }, { "name": "X-23", "img": "http://marvelheroes.info/img/chars/x23.png", "es": 200 }, { "name": "Venom", "img": "http://marvelheroes.info/img/chars/venom.png", "es": 400 }, { "name": "She-Hulk", "img": "http://marvelheroes.info/img/chars/shehulk.png", "es": 400 }, { "name": "Winter Soldier", "img": "http://marvelheroes.info/img/chars/wintersoldier.png", "es": 400 }, { "name": "Iceman", "img": "http://marvelheroes.info/img/chars/iceman.png", "es": 400 }, { "name": "Vision", "img": "http://marvelheroes.info/img/chars/drop_vision.png", "es": 400 }, { "name": "Dr. Doom", "img": "http://marvelheroes.info/img/chars/drdoom_ff.png", "es": 600 }
    ];
    return HeroesList;
})();
/*
TODO:
2. Add 'wanted' checkbox
3. Add 'ultimate wanted' checkbox
7. Add link anchors to save selections (and update anchor on every click) - it's not that hard, just base64 current selection
8. Add meta keywords for SEO


Not gonna happen:
3. Show & edit hero list JSON (github fork/pull request instead)

*/
/// <reference path="./all.d.ts" />
var HEROES = HeroesList.HEROES;
var calc = new Calculator(HEROES);
loadStorage();
init();
update();
function init() {
    var tmpl = doT.template($('script#hero-pic-template').text());
    for (var i = 0; i < HEROES.length; i++) {
        var hero = HEROES[i];
        $('#roster').append(tmpl({ hero: hero, id: i }));
    }
    $('input.invisible-friend').change(function (ev) {
        var cb = ev.currentTarget;
        var idx = parseInt(cb.getAttribute('data-id'));
        calc.setOwned(idx, !calc.isOwned(idx));
        update();
    });
    $('#clear-button').click(function (event) {
        event.preventDefault();
        calc.clearOwned();
        update();
    });
}
function loadStorage() {
    if (!Modernizr.localstorage)
        return;
    var storage = localStorage.getItem('selected');
    if (!storage || (storage.charAt(0) != '['))
        storage = '[]';
    var selected = JSON.parse(storage);
    selected.forEach(function (val, idx) { return calc.setOwned(idx, val); });
}
function saveStorage() {
    if (!Modernizr.localstorage)
        return;
    localStorage.setItem('selected', JSON.stringify(calc.ownedIdxs));
}
function percent(val, decimalDigits) {
    if (decimalDigits === void 0) { decimalDigits = 2; }
    return '' + (val * 100).toFixed(decimalDigits) + '%';
}
function update() {
    saveStorage();
    // mark selected heroes
    $('.hero-pic').each(function (idx, elem) {
        var dataId = parseInt(elem.getAttribute('data-id'));
        $(elem).children('label').toggleClass('bg-primary', calc.isOwned(dataId));
    });
    // hide 'clear all' button if no heroes are selected
    $('#clear-button').toggleClass('hide', !calc.hasAnyOwnedHeroes);
    // hide result panel if no heroes are selected
    $('#result').toggleClass('collapsed', !calc.hasAnyOwnedHeroes);
    $('#result .duplicate .value').text(percent(calc.chanceToGetOwned));
    $('#result .new-hero .value').text(percent(calc.chanceToGetNew));
    $('#result .expected-return .value').text(percent(calc.expectedReturn));
    var ret = calc.expectedReturn;
    var yes = ret > 1.30;
    var no = ret < 1;
    var full = ret == 0;
    // hide if not sure about 'yes'
    $('.res-answer.res-yes').toggleClass('hide', !yes);
    // hide if not sure about 'no'
    $('.res-answer.res-no').toggleClass('hide', !no || full);
    // 
    $('.res-answer.res-full').toggleClass('hide', !full);
    // hide if either 'yes' or 'no' is true
    $('.res-answer.res-probably').toggleClass('hide', yes || no || full);
}

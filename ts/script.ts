/*
TODO:
2. Add 'wanted' checkbox
3. Add 'ultimate wanted' checkbox
7. Add link anchors to save selections (and update anchor on every click) - it's not that hard, just base64 current selection
8. Add meta keywords for SEO


Not gonna happen:
3. Show & edit hero list JSON (github fork/pull request instead)

DONE:
1. Calculate on every click
4. Add statements: 'all heroes have equal chances', 'random is random, don't rely on the numbers', etc.
5. Save selection in local storage on every click
6. Add 'clear all' button

*/

/// <reference path="./all.d.ts" />

var HEROES:IHero[] = HeroesList.HEROES;
var calc = new Calculator(HEROES);

loadStorage();
init();
update();

function init()
{
    var tmpl = doT.template($('script#hero-pic-template').text());
    for (var i = 0; i < HEROES.length; i++)
    {
        var hero = HEROES[i];
        $('#roster').append(tmpl({ hero:hero, id:i }));
    }
	$('input.invisible-friend').change((ev)=> 
	{
		var cb = <HTMLInputElement>ev.currentTarget;
		var idx = parseInt(cb.getAttribute('data-id'));

		calc.setOwned(idx, cb.checked);
		update();
	});
	$('#clear-button').click((event)=>
	{
		event.preventDefault();
		
		calc.clearOwned();
		update();
	});
}
function loadStorage()
{
	if (!Modernizr.localstorage)
		return;
	
	var storage:string = localStorage.getItem('selected');
	if (!storage || (storage.charAt(0) != '['))
		storage = '[]';
	
	var selected:boolean[] = JSON.parse(storage);
	selected.forEach((val,idx) => calc.setOwned(idx, val));
}
function saveStorage()
{
	if (!Modernizr.localstorage)
		return;
	
	localStorage.setItem('selected', JSON.stringify(calc.ownedIdxs));
}
function percent(val:number, decimalDigits:number = 2):string
{
	return '' + (val * 100).toFixed(decimalDigits) + '%';
}
function update()
{
	saveStorage();
	
	// mark selected heroes
	$('.hero-pic').each((idx, elem)=>
	{
		var dataId = parseInt(elem.getAttribute('data-id'));
		$(elem).children('label').toggleClass('bg-primary', calc.isOwned(dataId));
	})
	
	// hide 'clear all' button if no heroes are selected
	$('#clear-button').toggleClass('hide', !calc.hasAnyOwnedHeroes);
	
	// hide result panel if no heroes are selected
	$('#result').toggleClass('collapsed', !calc.hasAnyOwnedHeroes);
	
	
    $('#result .duplicate .value').text(percent(calc.chanceToGetOwned));
	$('#result .new-hero .value').text(percent(calc.chanceToGetNew));
}
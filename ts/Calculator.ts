class Calculator
{
	ownedIdxs:boolean[];
	
	constructor(public heroes:IHero[])
	{
		this.clearOwned();
	}
	
	setOwned(idx:number, owned:boolean)
	{
		this.ownedIdxs[idx] = owned;
	}
	isOwned(idx:number):boolean
	{
		return !!this.ownedIdxs[idx];
	}
	clearOwned()
	{
		this.ownedIdxs = this.heroes.map(() => false);
	}
	
	get hasAnyOwnedHeroes()
	{
		return !!this.ownedHeroes.length;
	}
	
	get ownedHeroes()
	{
	    return this.heroes.filter((hero, idx) => this.ownedIdxs[idx]);
	}
	get newHeroes()
	{
	    return this.heroes.filter((hero, idx) => !this.ownedIdxs[idx]);
	}
	get totalHeroesPrice()
	{
	    return this.heroes.reduce((sum, hero) => { return sum + (hero.es || 0); }, 0);
	}
	get chanceToGetNew()
	{
	    return (this.heroes.length - this.ownedHeroes.length) / this.heroes.length;
	}
	get chanceToGetOwned()
	{
	    return this.ownedHeroes.length / this.heroes.length;
	}
}
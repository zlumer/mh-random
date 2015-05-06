class Calculator
{
	static BOX_COST = 175;
	
	ownedIdxs:boolean[];
	
	constructor(private _heroes:IHero[])
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
		this.ownedIdxs = this._heroes.map(() => false);
	}
	
	get hasAnyOwnedHeroes()
	{
		return !!this.ownedHeroes.length;
	}
	
	get ownedHeroes()
	{
	    return this._heroes.filter((hero, idx) => this.ownedIdxs[idx]);
	}
	get newHeroes()
	{
	    return this._heroes.filter((hero, idx) => !this.ownedIdxs[idx]);
	}
	get totalHeroesPrice()
	{
	    return this._heroes.reduce((sum, hero) => { return sum + (hero.es || 0); }, 0);
	}
	get totalNewHeroesPrice()
	{
	    return this.newHeroes.reduce((sum, hero) => { return sum + (hero.es || 0); }, 0);
	}
	get expectedReturn()
	{
		if (!this.newHeroes.length)
			return 0;
		
		return this.totalNewHeroesPrice / this.newHeroes.length * this.chanceToGetNew / Calculator.BOX_COST;
	}
	get chanceToGetNew()
	{
	    return (this._heroes.length - this.ownedHeroes.length) / this._heroes.length;
	}
	get chanceToGetOwned()
	{
	    return this.ownedHeroes.length / this._heroes.length;
	}
}
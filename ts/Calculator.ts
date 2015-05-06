class Calculator
{
	static getOwnedHeroes<T>(heroes:T[], ownedIdxs:boolean[]):T[]
	{
	    return heroes.filter((hero, idx) => ownedIdxs[idx]);
	}
	static getNewHeroes<T>(heroes:T[], ownedIdxs:boolean[]):T[]
	{
	    return heroes.filter((hero, idx) => !ownedIdxs[idx]);
	}
	static sumPrice(heroes:IHero[])
	{
	    return heroes.reduce(function(sum, hero){ return sum + (hero.es || 0); }, 0);
	}
	static chanceToGetNew(ownedCount:number, totalCount:number)
	{
	    return (totalCount - ownedCount) / totalCount;
	}
	static chanceToGetOwned(ownedCount:number, totalCount:number)
	{
	    return ownedCount / totalCount;
	}
}
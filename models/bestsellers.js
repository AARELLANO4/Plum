const bestSellers = 
{
    bestSellers:[],

    init()
    {
        this.bestSellers.push({
            // lies of locke
            image: `/img/BSlocke.jpg`,
            price: `$25.88`,
            description: `Lies of Locke Lamora, Scott Lynch`
        });

        this.bestSellers.push({
            // surface pro
            image: `/img/BSsurface.jpg`,
            price: `$829.00`,
            description: `Microsoft Surface Laptop Intel Cor i5 8GB 256GB Platinum Windows 10`
        });

        this.bestSellers.push({
            // animal crossing new horizons
            image: `/img/BSanimalcrossing.jpg`,
            price: `$79.99`,
            description: `Animal Crossing: New Horizons`
        });

        this.bestSellers.push({
            //aerogarden sprout
            image: `/img/BSaerosprout.jpg`,
            price: `$84.99`,
            description: `AeroGarden Sprout LED with Gourmet Herb Seed Pod Kit`
        });
    },

    getBestSell()
    {
        return this.bestSellers;
    }
}

bestSellers.init();
module.exports = bestSellers;
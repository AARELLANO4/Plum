const products = 
{
    products:[],

    init()
    {
        this.products.push({
            image: `/img/PPG01.png `,
            title: `Paper Girls Vol. 1`,
            price: `$12.99`,
            category: `Books`,
            bestSeller: true
        });

        this.products.push({
            image: `/img/PPG02.png `,
            title: `Moleskine Classic Notebook`,
            price: `$24.35`,
            category: `Stationery`,
            bestSeller: false
        });

        this.products.push({
            image: `/img/PPG03.png `,
            title: `Spider-man: Far From Home`,
            price: `$18.00`,
            category: `Movies`,
            bestSeller: false
        });

        this.products.push({
            image: `/img/PPG04.png `,
            title: `PlayStation 4 1TB - Gold`,
            price: `$367.89`,
            category: `Video Games`,
            bestSeller: false
        });

        this.products.push({
            image: `/img/PPG05.png `,
            title: `Fossil Men's Gen 4 Smartwatch`,
            price: `$279.00`,
            category: `Electronics`,
            bestSeller: false
        });

        this.products.push({
            image: `/img/PPG06.png `,
            title: `Shovel Knight Treasure Trove - PS4`,
            price: `$49.96`,
            category: `Video Games`,
            bestSeller: true
        });

    },

    getAllProducts()
    {
        return this.products;
    }
}

products.init();

module.exports = products;
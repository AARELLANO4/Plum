const category = 
{
    category:[],

    init()
    {
        this.category.push({
            title: `Books & Comics`,
            image: `/img/PCbooks.png`,
            link: `Browse best selling titles`
        });

        this.category.push({
            title: `Video Games`,
            image: `/img/PCvideogames.png`,
            link: `Browse new releases`
        });

        this.category.push({
            title: `Smart Watches`,
            image: `/img/PCtimepiece.png`,
            link: `Browse the latest smart watches`
        });

        this.category.push({
            title: `Paper & Stationery`,
            image: `/img/PCstationery.png`,
            link: `Browse new arrivals`
        });
    },

    getAllCategories()
    {
        return this.category;
    }
}

category.init();
module.exports = category;
const category = 
{
    category:[],

    init()
    {
        this.category.push({
            title: `Books & Comics`,
            image: `/img/PCbooks.jpg`,
            link: `Browse best selling titles`
        });

        this.category.push({
            title: `Video Games`,
            image: `/img/PCvideogames.jpg`,
            link: `Browse new releases`
        });

        this.category.push({
            title: `Time Pieces & Smart Watches`,
            image: `/img/PCtimepiece.jpg`,
            link: `Browse the latest smart watches`
        });

        this.category.push({
            title: `Paper & Stationery`,
            image: `/img/PCstationery.jpg`,
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
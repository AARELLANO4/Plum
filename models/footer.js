const footer = 
{
    footer:[],

    init()
    {
        this.footer.push({
            image: `/img/smfooter1.png`,   
        });

        this.footer.push({
            image: `/img/smfooter2.png`,   
        });

        this.footer.push({
            image: `/img/smfooter3.png`,   
        });
    },

    getFooter()
    {
        return this.footer;
    }
}

footer.init();
module.exports = footer;
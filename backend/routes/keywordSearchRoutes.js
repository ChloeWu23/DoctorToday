const cheerio = require("cheerio")
const axios = require("axios")
const router = require("express").Router();


router.get('/', (req, res) => {
    console.log("get request triggered");
    urls = [
        { id: 0, url: "https://doctor-today-app.herokuapp.com/serviceSummary", title: "Appointments" },
        { id: 1, url: "https://doctor-today-app.herokuapp.com/findUs", title: "Find Us" },
        { id: 2, url: "https://doctor-today-app.herokuapp.com/people", title: "People" },
        { id: 3, url: "https://doctor-today-app.herokuapp.com/travelGuides", title: "Travel Guides" },
        { id: 4, url: "https://doctor-today-app.herokuapp.com/services", title: "Services" },
        { id: 5, url: "https://doctor-today-app.herokuapp.com/services/gp-consultations", title: "GP Consultations" },
        { id: 6, url: "https://doctor-today-app.herokuapp.com/services/occupational-health", title: "Occupational Health" },
        { id: 7, url: "https://doctor-today-app.herokuapp.com/sexual-health", title: "Sexual Health" },
        { id: 8, url: "https://doctor-today-app.herokuapp.com/specific-health-tests", title: "Specific Health Tests" },
        { id: 9, url: "https://doctor-today-app.herokuapp.com/general-health-screens", title: "General Health Screens" },
        { id: 10, url: "https://doctor-today-app.herokuapp.com/vaccinations", title: "Vaccinations" },
        { id: 11, url: "https://doctor-today-app.herokuapp.com/travel-medication", title: "Travel Medication" },
        { id: 12, url: "https://doctor-today-app.herokuapp.com/aesthetics-&-skincare", title: "Aesthetics & Skincare" },
        { id: 13, url: "https://doctor-today-app.herokuapp.com/wound-care", title: "Wound Care" },
    ]
    search(urls).then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    })
})

async function search(urls) {
    console.log(urls[0].url)
    axios.get(urls[0].url).then(res => {
        const $ = cheerio.load(res.data)
        // console.log($)
        const $html = $('body').text()
        console.log($html)
    })

    
    // console.log("Entering search function...")
    // try {
    //     const htmls = (await Promise.allSettled(
    //         //loop through all urls
    //         [...Array(urls.length)].map(async (_, i) => {
    //             console.log(urls[i].url)
    //             console.log(cheerio.fromURL(urls[i].url))
    //             console.log("fetch failed")
    //             await cheerio.fromURL(urls[i].url).then(
    //                 res => {
    //                     const body = res.data;
    //                     console.log(res)
    //                     const pageHtml = cheerio.load(body);
    //                     return { id: i, url: urls[i].url, title: urls[i].title, content: pageHtml };
    //                 }
    //             )
    //         }
    //         )))
    //     //close browser
    //     return htmls;
    // }
    // catch (err) {
    //     console.error(err.message);
    // }
};

module.exports = router;
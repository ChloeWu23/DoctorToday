const cheerio = require("cheerio")
const axios = require("axios")
const router = require("express").Router();


router.get('/:keyword', (req, res) => {
    const keywords = req.params.keyword.toLowerCase().split('-')
    console.log("Fetching contents with keywords" + keywords);
    urls = [
        { id: 0, url: "https://doctor-today-app.herokuapp.com/bookingAppointment", title: "Appointments" },
        { id: 1, url: "https://doctor-today-app.herokuapp.com/about/FindUs", title: "Find Us" },
        { id: 2, url: "https://doctor-today-app.herokuapp.com/about/People", title: "People" },
        { id: 3, url: "https://doctor-today-app.herokuapp.com/about/FAQs", title: "FAQs" },
        { id: 4, url: "https://doctor-today-app.herokuapp.com/travelGuides", title: "Travel Guides" },
        { id: 5, url: "https://doctor-today-app.herokuapp.com/services", title: "Service & Prices" },
        { id: 6, url: "https://doctor-today-app.herokuapp.com/services/gp-consultations", title: "GP Consultations" },
        { id: 7, url: "https://doctor-today-app.herokuapp.com/services/occupational-health", title: "Occupational Health" },
        { id: 8, url: "https://doctor-today-app.herokuapp.com/services/sexual-health", title: "Sexual Health" },
        { id: 9, url: "https://doctor-today-app.herokuapp.com/services/specific-health-tests", title: "Specific Health Tests" },
        { id: 10, url: "https://doctor-today-app.herokuapp.com/services/general-health-screens", title: "General Health Screens" },
        { id: 11, url: "https://doctor-today-app.herokuapp.com/services/vaccinations", title: "Vaccinations" },
        { id: 12, url: "https://doctor-today-app.herokuapp.com/services/travel-medication", title: "Travel Medication" },
        { id: 13, url: "https://doctor-today-app.herokuapp.com/services/aesthetics-&-skincare", title: "Aesthetics & Skincare" },
        { id: 14, url: "https://doctor-today-app.herokuapp.com/services/wound-care", title: "Wound Care" },
    ]
    search(urls)
        .then(unFiltered => {
            return unFiltered.filter(
                item => { 
                    return keywords.some(keyword => item.content.toLowerCase().includes(keyword)); })
        })
        .then(filtered => {
            console.log(filtered.length)
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json(filtered);
        })
})

async function search(urls) {
    const htmls = Promise.allSettled(urls.map((urlItem) => axios.get(urlItem.url)))
        .then((results) => {
            let htmls = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].status === "fulfilled") {
                    const $ = cheerio.load(results[i].value.data);
                    const $html = $("#pageContent").text();
                    htmls.push({
                        id: urls[i].id,
                        title: urls[i].title,
                        url: urls[i].url,
                        content: $html
                    });
                } else {
                    console.log("issue with url: " + urls[i].url);
                    htmls.push({
                        id: urls[i].id,
                        title: urls[i].title,
                        url: urls[i].url,
                        content: ""
                    })
                }
            }
            return htmls;
        });
    return htmls;
}

module.exports = router;

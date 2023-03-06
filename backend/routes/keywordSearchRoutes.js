const cheerio = require("cheerio")
const axios = require("axios")
const router = require("express").Router();


router.get('/:keyword', (req, res) => {
    const keywords = req.params.keyword.toLowerCase().split('-')
    console.log("Fetching contents with keywords" + keywords);
    urls = [
        { id: 0, url: "http://localhost:3000/bookingAppointment", title: "Appointments" },
        { id: 1, url: "http://localhost:3000/about/FindUs", title: "Find Us" },
        { id: 2, url: "http://localhost:3000/about/People", title: "People" },
        { id: 3, url: "http://localhost:3000/about/FAQs", title: "FAQs" },
        { id: 4, url: "http://localhost:3000/travelGuides", title: "Travel Guides" },
        { id: 5, url: "http://localhost:3000/services", title: "Service & Prices" },
        { id: 6, url: "http://localhost:3000/services/gp-consultations", title: "GP Consultations" },
        { id: 7, url: "http://localhost:3000/services/occupational-health", title: "Occupational Health" },
        { id: 8, url: "http://localhost:3000/services/sexual-health", title: "Sexual Health" },
        { id: 9, url: "http://localhost:3000/services/specific-health-tests", title: "Specific Health Tests" },
        { id: 10, url: "http://localhost:3000/services/general-health-screens", title: "General Health Screens" },
        { id: 11, url: "http://localhost:3000/services/vaccinations", title: "Vaccinations" },
        { id: 12, url: "http://localhost:3000/services/travel-medication", title: "Travel Medication" },
        { id: 13, url: "http://localhost:3000/services/aesthetics-&-skincare", title: "Aesthetics & Skincare" },
        { id: 14, url: "http://localhost:3000/services/wound-care", title: "Wound Care" },
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

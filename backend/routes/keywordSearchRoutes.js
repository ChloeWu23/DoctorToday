const cheerio = require("cheerio")
const axios = require("axios")
const router = require("express").Router();


router.get('/', (req, res) => {
    console.log("get request triggered");
    urls = [
        { id: 0, url: "http://localhost:3000/bookingAppointment", title: "Appointments" },
        { id: 1, url: "http://localhost:3000/about/FindUs", title: "Find Us" },
        // { id: 2, url: "http://localhost:3000/about/People", title: "People" },
        { id: 3, url: "http://localhost:3000/about/FAQs", title: "FAQs" },
        { id: 4, url: "http://localhost:3000/travelGuides", title: "Travel Guides" },
        { id: 5, url: "http://localhost:3000/services", title: "Service & Prices" }
        // { id: 0, url: "https://doctor-today-app.herokuapp.com/bookingAppointment", title: "Appointments" },
        // { id: 1, url: "https://doctor-today-app.herokuapp.com/about/FindUs", title: "Find Us" },
        // { id: 2, url: "https://doctor-today-app.herokuapp.com/about/People", title: "People" },
        // { id: 3, url: "https://doctor-today-app.herokuapp.com/about/FAQs", title: "FAQs" },
        // { id: 4, url: "https://doctor-today-app.herokuapp.com/travelGuides", title: "Travel Guides" },
        // { id: 5, url: "https://doctor-today-app.herokuapp.com/serviceSummary", title: "Service & Prices" },
        // { id: 6, url: "https://doctor-today-app.herokuapp.com/services/gp-consultations", title: "GP Consultations" },
        // { id: 7, url: "https://doctor-today-app.herokuapp.com/services/occupational-health", title: "Occupational Health" },
        // { id: 8, url: "https://doctor-today-app.herokuapp.com/services/sexual-health", title: "Sexual Health" },
        // { id: 9, url: "https://doctor-today-app.herokuapp.com/services/specific-health-tests", title: "Specific Health Tests" },
        // { id: 10, url: "https://doctor-today-app.herokuapp.com/services/general-health-screens", title: "General Health Screens" },
        // { id: 11, url: "https://doctor-today-app.herokuapp.com/services/vaccinations", title: "Vaccinations" },
        // { id: 12, url: "https://doctor-today-app.herokuapp.com/services/travel-medication", title: "Travel Medication" },
        // { id: 13, url: "https://doctor-today-app.herokuapp.com/services/aesthetics-&-skincare", title: "Aesthetics & Skincare" },
        // { id: 14, url: "https://doctor-today-app.herokuapp.com/services/wound-care", title: "Wound Care" },
    ]
    search(urls).then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    })
})

async function search(urls) {
    const requests = urls.map((urlItem) => axios.get(urlItem.url));

    const htmls = Promise.all(requests).then((responses) => {
        let htmls = []
        for (let i = 0; i < responses.length; i++) {
            try {
                const $ = cheerio.load(responses[i].data)
                const $html = $('body').text()
                htmls.push({ id: i, title: urls[i].title, url: urls[i].url, content: $html })
            }
            catch (err) {
                console.log(urls[i].url)
            }
        }
        return htmls;
    });
    return htmls;
};

module.exports = router;
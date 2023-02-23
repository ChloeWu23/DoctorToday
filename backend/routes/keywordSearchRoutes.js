const router = require("express").Router();
const puppeteer = require("puppeteer");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

router.get('/', (req, res) => {
    console.log("get request triggered");
    urls = [
        { id: 0, url: "https://doctor-today-front.herokuapp.com/#/bookingAppointment", title: "Appointments" },
        { id: 1, url: "https://doctor-today-front.herokuapp.com/#/findUs", title: "Find Us" },
        { id: 2, url: "https://doctor-today-front.herokuapp.com/#/people", title: "People" },
        { id: 3, url: "https://doctor-today-front.herokuapp.com/#/travelGuides", title: "Travel Guides" },
        { id: 4, url: "https://doctor-today-front.herokuapp.com/#/services", title: "Services" },
        { id: 5, url: "https://doctor-today-front.herokuapp.com/#/services/gp-consultations", title: "GP Consultations" },
        { id: 6, url: "https://doctor-today-front.herokuapp.com/#/services/occupational-health", title: "Occupational Health" },
        { id: 7, url: "https://doctor-today-front.herokuapp.com/#/sexual-health", title: "Sexual Health" },
        { id: 8, url: "https://doctor-today-front.herokuapp.com/#/specific-health-tests", title: "Specific Health Tests" },
        { id: 9, url: "https://doctor-today-front.herokuapp.com/#/general-health-screens", title: "General Health Screens" },
        { id: 10, url: "https://doctor-today-front.herokuapp.com/#/vaccinations", title: "Vaccinations" },
        { id: 11, url: "https://doctor-today-front.herokuapp.com/#/travel-medication", title: "Travel Medication" },
        { id: 12, url: "https://doctor-today-front.herokuapp.com/#/aesthetics-&-skincare", title: "Aesthetics & Skincare" },
        { id: 13, url: "https://doctor-today-front.herokuapp.com/#/wound-care", title: "Wound Care" },
    ]
    search(urls).then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    })
})

// async function search(urls) {
//     console.log(urls[0]);
//     const page = await JSDOM.fromURL(urls[0].url, {
//         resources: "usable",
//         runScripts: "dangerously"
//     })
//     console.log(page.window);
//     try {
//         const htmls = (await Promise.allSettled(
//             //loop through all urls
//             [...Array(urls.length)].map(async (_, i) => {
//                 //open a new page with url
//                 const page = await new JSDOM("", {
//                     url: urls[i].url,
//                     contentType: "text/html",
//                     runScripts: "dangerously"
//                 })
//                 console.log(url[i]);

//                 //obtain the app content in outerHTML format
//                 const pageHtml = await page.window.document.getElementById('app').outerHTML;
//                 console.log(pageHtml);
//                 //then close the page
//                 //await page.close();
//                 //save index, url and page content into an object
//                 return { id: i, url: urls[i].url, content: pageHtml };
//             })))
//         //close browser
//     } catch (err) {
//         console.error(err.message);
//         return err.message;
//     }
// };

async function search(urls) {
    try {
        const browser = await puppeteer.launch({
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const htmls = (await Promise.allSettled(
            //loop through all urls
            [...Array(urls.length)].map(async (_, i) => {
                //open a new page with url
                const page = await browser.newPage();
                await page.goto(`${urls[i].url}`, {
                    waitUntil: "domcontentloaded"
                });
                //obtain the app content in outerHTML format
                const pageHtml = await page.evaluate(() => document.getElementById('app').outerHTML);
                //then close the page
                await page.close();
                //save index, url and page content into an object
                return { id: i, url: urls[i].url, title: urls[i].title, content: pageHtml };
            })))
        //close browser
        await browser.close();
        return htmls;
    }
    catch (err) {
        console.error(err.message);
    }
};

module.exports = router;
const router = require("express").Router();
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.get('/', (req, res) => {
    console.log("get request triggered");
    urls = [
        { id: 0, url: "https://doctor-today-front.herokuapp.com/#/bookingAppointment" },
        { id: 1, url: "https://doctor-today-front.herokuapp.com/#/findUs" },
        { id: 2, url: "https://doctor-today-front.herokuapp.com/#/people" },
        { id: 3, url: "https://doctor-today-front.herokuapp.com/#/travelGuides" },
        { id: 4, url: "https://doctor-today-front.herokuapp.com/#/services" },
        { id: 5, url: "https://doctor-today-front.herokuapp.com/#/services/gp-consultations" },
        { id: 6, url: "https://doctor-today-front.herokuapp.com/#/services/occupational-health" },
        { id: 7, url: "https://doctor-today-front.herokuapp.com/#/sexual-health" },
        { id: 8, url: "https://doctor-today-front.herokuapp.com/#/specific-health-tests" }
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
                return { id: i, url: urls[i].url, content: pageHtml };
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
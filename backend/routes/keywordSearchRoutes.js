const cheerio = require("cheerio")
const axios = require("axios")
const router = require("express").Router();


router.get('/:keyword', (req, res) => {
    const keywords = req.params.keyword.toLowerCase().split('-')
    console.log("Fetching contents with keywords" + keywords);
    //get all available urls for search
    axios.get("https://doctor-today-back.herokuapp.com/page-index")
        .then(
            urls => {
                // console.log(urls.data)
                //fetch contents from each url
                search(urls.data)
                    //filter for keywords
                    .then(unFiltered => {
                        return unFiltered.filter(
                            item => {
                                return keywords.some(keyword => item.content.toLowerCase().includes(keyword));
                            })
                    })
                    //return result
                    .then(filtered => {
                        console.log(filtered.length)
                        res.status(200).json(filtered);
                    })
            }
        )
        .catch(err => {
            console.log(err)
            res.status(200).json();
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
                        title: urls[i].page_title,
                        url: urls[i].url,
                        content: $html
                    });
                } else {
                    console.log("issue with url: " + urls[i].url);
                    htmls.push({
                        id: urls[i].id,
                        title: urls[i].page_title,
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

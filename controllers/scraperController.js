const Product = require('../models/Product')
const axios = require('axios')
const cheerio = require('cheerio')

const getProducts = async search => {
    if (await Product.countDocuments({query: search}) > 0) {
        return Product.find({query: search})
    }
    const query = fixCharacters(search)
    const extractContent = $ => [
        ...new Set(
            $('.box-row')
                .map((_, product) => {
                    const $product = $(product)
                    return new Product({
                        query: search,
                        product_id: $product.attr('data-id'),
                        name: $product.attr('data-name'),
                        price: $product.attr('data-price'),
                        img: $product.find('img').attr('src'),
                        link: $product.find('a').attr('href')
                    })
                })
                .toArray()
        ),
    ]
    axios.get(`https://www.skapiec.pl/szukaj/w_calym_serwisie/${query}`).then(({data}) => {
        const $ = cheerio.load(data)
        const html = extractContent($)
        console.log(html)
        html.forEach(a => {
            Product.findOne({product_id: a.product_id}).then(product => {
                if (!product) {
                    a.save()
                }
            })
        })
        return html
    })
}

module.exports = {
    getProducts,
}

let fixCharacters = search => {
    let s = search
    s = s.replace(' ', '+')
    s = s.replace('ą', '%C4%85')
    s = s.replace('ć', '%C4%87')
    s = s.replace('ę', '%C4%99')
    s = s.replace('ł', '%C5%82')
    s = s.replace('ń', '%C5%84')
    s = s.replace('ó', '%C3%B3')
    s = s.replace('ś', '%C5%9B')
    s = s.replace('ź', '%C5%BA')
    s = s.replace('ż', '%C5%BC')
    s = s.replace('Ą', '%C4%84')
    s = s.replace('Ć', '%C4%86')
    s = s.replace('Ę', '%C4%98')
    s = s.replace('Ł', '%C5%81')
    s = s.replace('Ń', '%C5%83')
    s = s.replace('Ó', '%C3%B2')
    s = s.replace('Ś', '%C5%9A')
    s = s.replace('Ź', '%C5%B9')
    s = s.replace('Ż', '%C5%BB')
    return s
}
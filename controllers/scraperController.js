const Product = require('../models/Product')
const axios = require('axios')
const cheerio = require('cheerio')

const getProducts = async search => {
    if (await Product.countDocuments({query: search}) > 0) {
        return Product.find({query: search}).exec()
    }
    const query = fixCharacters(search)
    const extractContent = $ => [
        ...new Set(
            $('.col.product-item')
                .map((_, product) => {
                    const $product = $(product)
                    return new Product({
                        query: search,
                        product_id: $product.find('a').attr('href').split('/')[4],
                        name: $product.find('#root > main > div.container-wrapper.search-page > div:nth-child(3) > div > div > div > a > h2'),
                        price: $product.find('.price.price--secondary.price--fw-500.price--fs-16'),
                        img: $product.find('img').attr('src'),
                        link: $product.find('a').attr('href')
                    })
                })
                .toArray()
        ),
    ]
    return await axios.get(`https://www.skapiec.pl/szukaj?query=/${query}`).then(({data}) => {
        const $ = cheerio.load(data)
        const collection = extractContent($)
        collection.forEach(a => {
            Product.findOne({product_id: a.product_id}).then(product => {
                if (!product) {
                    a.save()
                }
            })
        })
        return collection
    })
}

let getProductDetails = async id => {
    let product = await Product.findOne({product_id: id}).exec()
    const extractContent = $ => [
        ...new Set(
            $('.offer-wrapper')
                .map((_, product) => {
                    const $product = $(product)
                    return ({
                        shop: $product.find('.product-offer__logo img').attr('src'),
                        price: $product.find('a:last-child span').text()
                            .replace('zł', '')
                            .replace(',', '.')
                            .replace(' ', ''),
                        link: $product.find('a:first-child').attr('href'),
                    })
                })
                .toArray()
        ),
    ]
    return await axios.get(`https://www.skapiec.pl${product.link}`).then(async ({data}) => {
        const $ = cheerio.load(data)
        let shops = extractContent($)
        let price = 0
        shops.forEach(x => {
            if (price === 0 || price > x.price) {
                price = x.price
            }
        })
        product.price = price
        product.shops = shops
        await Product.updateOne({_id: product.id},product)
        return product
    })
}

module.exports = {
    getProducts,
    getProductDetails,
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
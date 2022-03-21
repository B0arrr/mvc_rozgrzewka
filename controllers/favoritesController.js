const User = require("../models/User")
const Product = require("../models/Product")

let favouriteView = async (req, res) => {
    let favourites = []
    await Promise.all(req.user.Favorites.map(async x => {
        favourites.push(await Product.findOne({product_id: x}))
    }))
    res.render('favorite', {user: req.user, favourites: favourites})
}

let addToFavorites = async (req, res) => {
    const {id} = req.body
    const user = req.user
    if (!id || !user) return
    if (!user.Favorites.includes(id)) {
        user.Favorites.push(id)
        await User.updateOne({_id: user._id}, {Favorites: user.Favorites})
    }
    res.end()
}

let deleteFromFavorites = async (req, res) => {
    const {id} = req.body
    const user = req.user
    if (!id || !user) return
    if (user.Favorites.includes(id)) {
        user.Favorites = user.Favorites.filter(x => x !== id)
        await User.updateOne({_id: user._id}, {Favorites: user.Favorites})
    }
    res.end()
}

let getFavorites = async (req, res) => {
    const list = req.user.Favorites
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(list))
}

module.exports = {
    favouriteView,
    addToFavorites,
    deleteFromFavorites,
    getFavorites,
}
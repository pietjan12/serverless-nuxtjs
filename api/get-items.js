const items = require('./_items.js')

export default async (req, res) => {
    let allItems = await items;
    res.json(allItems);
}
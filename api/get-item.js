const items = require('./_items.js')

export default async (req, res) => {
    let allItems = await items;
    var item = allItems.find(x => x.id == req.query.id);
    res.json(item);
}
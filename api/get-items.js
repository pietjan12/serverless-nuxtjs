const items = require('./_items.js')

export default async (req, res) => {
    let allItems = await items;
    if(req.query.name) {
        //name parameter is given, look for any matches within array
        allItems = allItems.filter(x => x.name.includes(req.query.name));
    }

    res.json(allItems);
}
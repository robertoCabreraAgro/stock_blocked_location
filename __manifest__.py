{
    "name": "Block Location",
    "version": "saas~18.2.0.0.1",
    "summary": "Block outgoing operations from specific stock locations",
    "category": "Warehouse",
    "author": "Robert",
    "website": "https://www.agromarin.mx",
    "license": "AGPL-3",
    "depends": [
        "base",
        "stock",
        "mail",
        "point_of_sale",
    ],
    "data": [
        "security/security.xml",
        "security/ir.model.access.csv",
        "views/stock_location_view.xml",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "stock_blocked_location/static/src/js/pos.js",
            "stock_blocked_location/static/src/xml/pos.xml",
            "stock_blocked_location/static/src/css/pos.css",
        ],
    },
    "installable": True,
    "application": False,
}

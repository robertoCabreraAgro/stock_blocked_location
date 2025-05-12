/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { useState, onWillStart } from "@odoo/owl";
import { ProductList } from "@point_of_sale/app/screens/product_screen/product_list/product_list";

import { loadFields } from "@web/model/model_field_loader";

loadFields("product.product", ["qty_available"]);

patch(ProductList.prototype, {
    setup() {
        super.setup();
        this.rpc = useService("rpc");
        this.state = useState({ display_stock_pos: [false, false] });

        onWillStart(async () => {
            const config = await this.rpc("/web/dataset/call_kw/pos.config/get_display_stock_pos", {
                model: "pos.config",
                method: "get_display_stock_pos",
                args: [[]],
            });
            this.state.display_stock_pos = config;
        });
    },

    get filteredProducts() {
        const products = super.filteredProducts;
        const [show, restrict] = this.state.display_stock_pos;

        if (restrict) {
            return products.filter((p) => p.qty_available > 0);
        }
        return products;
    },
});

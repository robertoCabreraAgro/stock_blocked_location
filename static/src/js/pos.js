/** @odoo-module **/

import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { ProductsWidget } from "@point_of_sale/app/screens/product_screen/products_widget/products_widget";
import { ProductItem } from "@point_of_sale/app/screens/product_screen/product_item/product_item";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { useState, onWillStart } from "@odoo/owl";

// Ensure product.product loads qty_available field
patch(ProductScreen.prototype, {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.state = useState({
            display_stock_pos: [],
        });

        onWillStart(async () => {
            this.state.display_stock_pos = await this.orm.call(
                'pos.config',
                'get_display_stock_pos',
                [[]]
            );
        });
    },
});

// Patch ProductsWidget to filter out-of-stock products if configured
patch(ProductsWidget.prototype, {
    /**
     * @override
     */
    get productsToDisplay() {
        const products = super.productsToDisplay;
        
        // If screen state is available and hide_out_of_stock is enabled (index 1)
        const screen = this.env.screen;
        if (screen && 
            screen.state && 
            screen.state.display_stock_pos && 
            screen.state.display_stock_pos[1] === 'true') {
            return products.filter(product => product.qty_available > 0);
        }
        
        return products;
    }
});

// Patch ProductItem to display stock quantity
patch(ProductItem.prototype, {
    setup() {
        super.setup();
        this.screen = this.env.screen;
    },
    
    get showStock() {
        return this.screen && 
               this.screen.state && 
               this.screen.state.display_stock_pos && 
               this.screen.state.display_stock_pos[0] === 'true';
    },
});
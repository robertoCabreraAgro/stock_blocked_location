from odoo import models

class PosConfig(models.Model):
    _inherit = 'pos.config'

    def get_display_stock_pos(self):
        get_param = self.env['ir.config_parameter'].sudo().get_param
        return [
            get_param('pos_stock_display.display_stock_pos', 'False'),
            get_param('pos_stock_display.hide_out_of_stock_product', 'False'),
        ]
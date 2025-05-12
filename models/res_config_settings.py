from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    display_stock_pos = fields.Boolean('Display stock in POS')
    hide_out_of_stock_product = fields.Boolean('Hide out of stock products')

    def set_values(self):
        super().set_values()
        self.env['ir.config_parameter'].sudo().set_param('pos_stock_display.display_stock_pos', self.display_stock_pos)
        self.env['ir.config_parameter'].sudo().set_param('pos_stock_display.hide_out_of_stock_product', self.hide_out_of_stock_product)

    def get_values(self):
        res = super().get_values()
        get_param = self.env['ir.config_parameter'].sudo().get_param
        res.update(
            display_stock_pos=get_param('pos_stock_display.display_stock_pos') == 'True',
            hide_out_of_stock_product=get_param('pos_stock_display.hide_out_of_stock_product') == 'True',
        )
        return res

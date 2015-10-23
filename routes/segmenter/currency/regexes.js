var rules={
	"currency":/((₡|(R\$)|(kr)|(Rp)|₩|R|₨|฿|(руб)|(RM)|₹|¥|€|£|\$)(\s*\d+(,\d+)*(\.\d+)?))|((\d+(,\d+)*(\.\d+)?\s*)(\$|rupees|rupee|£|€|¥|₹|(RM)|(руб)|฿|₨|R|₩|(Rp)|(kr)|(R\$)|₡|dollars|dollar|pounds|pound))/gi
};
exports.store=rules;
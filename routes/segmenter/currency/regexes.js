	var rules={
	"currency":/((₡|(R\$)|(kr)|(Rp)|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)(\s*\d+(,\d+)*(\.\d+)?))|((\d+(,\d+)*(\.\d+)?\s*)(\$|rupees|rupee|£|€|¥|₹|(RM)|(руб)|฿|₨|₩|(Rp)|(kr)|(R\$)|R|₡|dollars|dollar|pounds|pound|baht))/gi,
	"stform":/(₡|(R\$)|(kr)|(Rp)|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)/gi,
	"no":/(\s*\d+(,\d+)*(\.\d+)?)/gi,
	"comma":/,+/g,
};
exports.store=rules;
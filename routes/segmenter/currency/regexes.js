	var rules={
	"currency":/(?=\s?)((₡|(R\$)|(kr)|(Rp)|Rs|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)(\.?)(\s*\d+(,\d+)*(\.\d+)?\s?(lakhs|lakh|million|billion|thousand)?))(?=\s)|((\d+(,\d+)*(\.\d+)?\s*(lakhs|lakh|million|billion|thousand)?)\s?(\$|rupees|rupee|£|€|¥|₹|(RM)|Rs|(руб)|฿|₨|₩|(Rp)|(kr)|(R\$)|R|₡|dollars|dollar|pounds|pound|baht))/gi,
	"stform":/(₡|(R\$)|(Rs)|(kr)|(Rp)|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)/gi,
	"no":/(\s*\d+(,\d+)*(\.\d+)?)/gi,
	"comma":/,+/g,
};
exports.store=rules;
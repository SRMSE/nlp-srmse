var rules={
	"num_date_format":/(?:(?:31(\/|-|,|\s|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|,|\s|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|,|\s|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|,|\s|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g,
	"reverse_date_format":/((\d\d)?\d\d(\/|-|,|\s|\.)((0?(1|3|5|7|8)|10|12)(\/|-|,|\s|\.)(31|30|[21]\d|0?[1-9])|(0?(4|6|9)|11)-(31|30|[21]\d|0?[1-9])|0?2(\/|-|,|\s|\.)((2[0-8]|1\d)|0?[1-9]))|(\d\d)?((0|2|4|6|8)(0|4|8)|(1|3|5|7|9)(2|6))(\/|-|,|\s|\.)0?2-29)/g,
	"mmdd_date_format":/(\d[^0]{1,2}(\/|-|,|\s|\.)\d{1,2})/g,
};
exports.store=rules;
var rules={
	"num_date_format":/(?:(?:31(\/|-|,|\s|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|,|\s|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|,|\s|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|,|\s|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g,
	"reverse_date_format":/((\d\d)?\d\d(\/|-|,|\s|\.)((0?(1|3|5|7|8)|10|12)(\/|-|,|\s|\.)(31|30|[21]\d|0?[1-9])|(0?(4|6|9)|11)-(31|30|[21]\d|0?[1-9])|0?2(\/|-|,|\s|\.)((2[0-8]|1\d)|0?[1-9]))|(\d\d)?((0|2|4|6|8)(0|4|8)|(1|3|5|7|9)(2|6))(\/|-|,|\s|\.)0?2-29)/g,
	"mmdd_date_format":/((([0-2][1-9]|3[0-1])(\/|-|,|\s|\.)(0[1-9]|1[0-2]))|((0[1-9]|1[0-2])(\/|-|,|\s|\.)([0-2][1-9]|3[0-1])))/g,
	"constant_num_date_format":/((([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])(\d{4}))|((\d{4})(0[1-9]|1[0-2])([0-2][1-9]|3[0-1]))|((\d{4})([1-9])([0-2][1-9]|3[0-1]))|((\d{4})(0[1-9]|1[0-2])([0-9]))|((0[1-9]|1[0-2])(\d{4}))|((0[1-9]|1[0-2])(\d{4}))|((\d{2})(0[1-9]|1[0-2]))|(([0-9])(0[1-9]|1[0-2])(\d{4}))|(([0-2][1-9]|3[0-1])([1-9])(\d{4}))|(([0-9])(0[1-9]|1[0-2])(\d{2}))|(([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])(\d{2}))|(([0-9])([0-9])(\d{2}))|((\d{4})([0-9])([0-9]))|(\d{4}))/g,
	"word_month_date_format":/((\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((19[7-9]\d|20\d{2})|\d{2}))/gi,
};
exports.store=rules;
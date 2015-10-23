var rules={
	"num_date_format":/(?:(?:31(\/|-|,|\s|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|,|\s|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|,|\s|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|,|\s|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g,
	"reverse_date_format":/((\d\d)?\d\d(\/|-|,|\s|\.)((0?(1|3|5|7|8)|10|12)(\/|-|,|\s|\.)(31|30|[21]\d|0?[1-9])|(0?(4|6|9)|11)-(31|30|[21]\d|0?[1-9])|0?2(\/|-|,|\s|\.)((2[0-8]|1\d)|0?[1-9]))|(\d\d)?((0|2|4|6|8)(0|4|8)|(1|3|5|7|9)(2|6))(\/|-|,|\s|\.)0?2-29)/g,
	"mmdd_date_format":/((([0-2][1-9]|3[0-1])(\/|-|,|\s|\.)(0[1-9]|1[0-2]))|((0[1-9]|1[0-2])(\/|-|,|\s|\.)([0-2][1-9]|3[0-1])))/g,
	"constant_num_date_format":/((([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])(\d{4}))|((\d{4})(0[1-9]|1[0-2])([0-2][1-9]|3[0-1]))|((\d{4})([1-9])([0-2][1-9]|3[0-1]))|((\d{4})(0[1-9]|1[0-2])([0-9]))|((0[1-9]|1[0-2])(\d{4}))|((0[1-9]|1[0-2])(\d{4}))|((\d{2})(0[1-9]|1[0-2]))|(([0-9])(0[1-9]|1[0-2])(\d{4}))|(([0-2][1-9]|3[0-1])([1-9])(\d{4}))|(([0-9])(0[1-9]|1[0-2])(\d{2}))|(([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])(\d{2}))|(([0-9])([0-9])(\d{2}))|((\d{4})([0-9])([0-9]))|(\d{4}))/g,
	"word_month_date_format":/(\b\d{1,2}\D{0,3})?\b((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))\D?(\d{1,2}\D?)?\D?((19[7-9]\d|20\d{2})|\d{2})/gi,
	"word_month_without_year":/(((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)(\/|-|,|\s|\.)(([0-2][0-9]|3[0-1])|(\d{1})(nd|st|rd|th|\.)))|((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)(\/|-|,|\s|\.)(([0-2][0-9]|3[0-1])|(\d{1})))|(\b(([0-2][0-9]|3[0-1])|(\d{1}))(\/|-|,|\s|\.)(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))|(\b(([0-2][0-9]|3[0-1])|(\d{1}))(nd|st|rd|th|\.)(\/|-|,|\s|\.)(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)))/gi,
};
var months={
	"january":"01",
	"jan":"01",
	"febuary":"02",
	"feb":"02",
	"march":"03",
	"mar":"03",
	"april":"04",
	"apr":"04",
	"may":"05",
	"june":"06",
	"jun":"06",
	"july":"07",
	"jul":"07",
	"aug":"08",
	"august":"08",
	"sep":"09",
	"sept":"09",
	"september":"09",
	"oct":"10",
	"october":"10",
	"nov":"11",
	"november":"11",
	"dec":"12",
	"december":"12"
}
rules["months"]=months;
exports.store=rules;
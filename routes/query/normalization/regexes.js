var store={
	"acc_period":/([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.))/g,
	"periods":/[\.|\?|\!]+((?!\))|(?!\])|(?!\}))/g,
	"acc_no_period":/([A-Z]{2,}?)(\.(?=\s)|$|(?=\s))/g,
	"acc_two_to_five_letter_bw":/(\s[a-zA-Z]{2,3}\.(?=\s)|^[a-zA-Z]{2,3}\.(?=\s))/g,
	"acc_two_to_five_letter_bw_dot_first":/\.[a-z]{2,5}\s/g,
	"acc_single_dot":/\s[a-zA-Z]\.\s/g,
	"acc_jr's":/[a-zA-Z]{2}\.'s/g,
	"acc":/(([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.)))|(([A-Z]{2,}?)(\.(?=\s)|$|(?=\s)))|((\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s))|(\.[a-z]{2,5}\s)|(\s[a-zA-Z]\.\s)|([a-zA-Z]{2}\.'s)|([a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+)|((https|http|ftp)(:\/\/)((.*?):(.*?)(\/|$)|(.*?)(\/|$))((.*?)\/)*(\s|(.*?)(\s|$)|($)))/g,
	"email":/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+/g,
	"url":/((?:(?:https?|ftps?|sftp|ssh|smtp|file|scp|):\/\/)|())(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9]+-?)*[a-z0-9]+)(?:\.(?:[a-z0-9]+-?)*[a-z0-9]+)*(?:\.(?:[a-z]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gi,
	"quoted":/(('((?!s\s)(?!t\s))).*?'(\)|((?!s\s)(?!t\s))))|(".*?")/g,
	"paranthesis":/(\(.*?\))|(\[.*?\])|(\{.*?\})/g,
	"digits":/([+]|[-]|)(\d+(\.\d+|(,\d+)+((\.\d+)|)|))(\b|$)(%|)/g,
	"word_joined_by_period":/(^|\s)[a-zA-Z]{1}[a-z]{2,}?\.[A-Z][a-z]{0,4}/g,
	"bullets":/(\b([a-zA-Z]{1}|[0-9]{1,2}|[mdclxviMDCLXVI]{1,3})\.\)\s)|(\b([a-zA-Z]{1}\.|[0-9]{1,2}(\.[^0-9])|[mdclxviMDCLXVI]{1,3}\.))|(\b\(([a-zA-Z]{1}|[0-9]{1,2}|[mdclxviMDCLXVI]{1,3})\))|(\(\b([a-zA-Z]{1}|[0-9]{1,2}|[mdclxviMDCLXVI]{1,3})\.\))|(\b([a-zA-Z]{1}|([0-9]{1,2})|[mdclxviMDCLXVI]{1,3})\))/g,
	"newline_list":/(\s|^)(.*?\\n){2,}(?=(\s|$|\.))/g,
	"num_date_format":/(?:(?:31(\/|-|,|\s|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|,|\s|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|,|\s|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|,|\s|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g,
	"reverse_date_format":/([12][0-9]{3})(\/|-|,|\s|\.)(0[1-9]|1[0-2])(\/|-|,|\s|\.)([0-2][1-9]|3[0-1])|([12][0-9]{3})(\/|-|,|\s|\.)(0[1-9]|1[0-2])(\/|-|,|\s|\.)([1-9])|([12][0-9]{3})(\/|-|,|\s|\.)([1-9])(\/|-|,|\s|\.)([0-2][1-9]|3[0-1])|([12][0-9]{3})(\/|-|,|\s|\.)([1-9])(\/|-|,|\s|\.)([1-9])/g,
	"mmdd_date_format":/([0-2][0-9]|3[0-1])(\/|-|,|\s|\.)(0[1-9]|1[0-2])|(0[1-9]|1[0-2])(\/|-|,|\s|\.)([0-2][0-9]|3[0-1])/g,
	"constant_num_date_format":/([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])([12][0-9]{3})|([1-9])(0[1-9]|1[0-2])([12][0-9]{3})|([12][0-9]{3})(0[1-9]|1[0-2])([0-2][1-9]|3[0-1])|([12][0-9]{3})(0[1-9]|1[0-2])([1-9])|(0[1-9]|1[0-2])([12][0-9]{3})|([0-2][1-9]|3[0-1])(0[1-9]|1[0-2])(\d{2})|([1-9])(0[1-9]|1[0-2])(\d{2})|([12][0-9]{3})|(0[1-9]|1[0-2])(\d{2})/g,
	"word_month_date_format":/(\b\d{1,2}\D{0,3})?\b((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))\D?(\d{1,2}\D?)?\D?((19[7-9]\d|20\d{2})|\d{2})/gi,
	"word_month_without_year":/([0-2][1-9]|3[0-1])(\/|-|,|\s|\.)((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))|([0-2][1-9]|3[0-1])(th|rd|st|nd)(\/|-|,|\s|\.)((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))|([1-9])(\/|-|,|\s|\.)((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))|([1-9])(th|rd|st|nd)(\/|-|,|\s|\.)((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))/gi,
	"currency":/(\s|^)(?=\s?)((₡|(R\$)|(kr)|(Rp)|Rs|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)(\.?)(\s*\d+(,\d+)*(\.\d+)?\s?(lakhs|lakh|million|billion|thousand)?))(?=(\s|$|\.))|((\d+(,\d+)*(\.\d+)?\s*(lakhs|lakh|million|billion|thousand)?)\s?(\$|rupees|rupee|£|€|¥|₹|(RM)|Rs|(руб)|฿|₨|₩|(Rp)|(kr)|(R\$)|R|₡|dollars|dollar|pounds|pound|baht))(?=(\s|$|\.))/g,
	"stform":/(\s|^)(₡|(R\$)|(Rs)|(kr)|(Rp)|₩|₨|฿|(руб)|(RM)|R|₹|¥|€|£|\$)(?=(\s|$|\.))/gi,
	"no":/(?!\s)(\s*\d+(,\d+)*(\.\d+)?)/gi,
	"comma":/,+/g,
	"blood_groups":/(AB\+)|(AB-)|(A|O|B)(\+|-)/g,
	"punc":/(\s|^)((\+[\w]+)|([\w]+\+)|(@[\w]+)|(#[\w]+)|(\".*\"))/g,
	"search_operator":/site:.*?\s|link:.*?\s|related:.*?\s|info:.*?\s|cache:.*?\s/gi,
	"distance":/(\d+).?(\d*)\s*(m|metres?|cm|centi[- ]?metres?|kms?|kilo[- ]?metres?|dm|deci[- ]?metres?|nm|nano[- ]?metres?|angstrom|micro[- ]?metres?|microns?|miles?|mi|yards?|yd|foot|feet|ft|inch[es]?|in)/gim,
	"time":/(\s|^)((\d{13})|((([0]{0,1}[0-9])|([1][0-2]))(:|-|\.)(([0-5]{0,1})([0-9]))(\s|)(am|a.m|pm|p.m))|((\+|-|)([0]{0,1}[0-9]|([1][0-2]))(\s|)(am|a.m|pm|p.m))|((\+|-|)([0]{0,1}[0-9]|([1][0-2]))(\s|)(o'clock))|((\+|-|)(([0]{0,1}[0-9])|([1][0-9])|([2][0-4]))(:|-|\.)(([0-5]{0,1})([0-9]))((?=(\s|$))|(?=(:|-|\.))(:|-|\.)[0-5]{0,1}[0-9])(((?=\s)\sGMT(\+|-)(([0-1]{0,1}[0-9])|([2][0-4]))(:|-|\.|)([0-5]{0,1}[0-9]))|((\s|)(\+|-)(([0-1]{0,1}[0-9])|([2][0-4]))(:|-|\.)([0-5]{0,1}[0-9]))|)))(?=(\s|$|\.))/gi,
	"apostrophe":/(^|\s)([a-zA-Z]*?')(t|s|re|ll|ve|d|m)(?=(\s|$))/gi
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
store["months"]=months;
exports.store=store;
//the regex for domains also matches /hello.txt as js does not support negative look behinds
//we will get more than we want and filter later



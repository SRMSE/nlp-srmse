var store={
	"acc_period":/([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.))/g,
	"periods":/\.|\?|\!/g,
	"acc_no_period":/([A-Z]{2,}?)(\.|$|\s)/g,
	"acc_two_to_five_letter_bw":/(\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s)/g,
	"acc_two_to_five_letter_bw_dot_first":/\.[a-z]{2,5}\s/g,
	"acc_single_dot":/\s[a-zA-Z]\.\s/g,
	"acc_jr's":/[a-zA-Z]{2}\.'s/g,
	"double_punc":/[\.\?\!]{2,}/g,
	"acc":/(([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.)))|(([A-Z]{2,}?)(\.|$|\s))|((\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s))|(\.[a-z]{2,5}\s)|(\s[a-zA-Z]\.\s)|([a-zA-Z]{2}\.'s)|([a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+)|((https|http|ftp)(:\/\/)((.*?):(.*?)(\/|$)|(.*?)(\/|$))((.*?)\/)*(\s|(.*?)(\s|$)|($)))/g,
	"email":/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+/g,
	"url":/(https|http|ftp)(:\/\/)((.*?):(.*?)(\/|$)|(.*?)(\/|$))((.*?)\/)*(\s|(.*?)(\s|$)|($))/g,
	"domains":/((\/|)([^\s\/]+?)\.)+?([^\/\s]+?)(\s|$)/g
};
exports.store=store;
//the regex for domains also matches /hello.txt as js does not support negative look behinds
//we will get more than we want and filter later
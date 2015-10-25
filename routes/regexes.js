var store={
	"acc_period":/([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.))/g,
	"periods":/[\.|\?|\!]+/g,
	"acc_no_period":/([A-Z]{2,}?)(\.|$|\s)/g,
	"acc_two_to_five_letter_bw":/(\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s)/g,
	"acc_two_to_five_letter_bw_dot_first":/\.[a-z]{2,5}\s/g,
	"acc_single_dot":/\s[a-zA-Z]\.\s/g,
	"acc_jr's":/[a-zA-Z]{2}\.'s/g,
	"acc":/(([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.)))|(([A-Z]{2,}?)(\.|$|\s))|((\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s))|(\.[a-z]{2,5}\s)|(\s[a-zA-Z]\.\s)|([a-zA-Z]{2}\.'s)|([a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+)|((https|http|ftp)(:\/\/)((.*?):(.*?)(\/|$)|(.*?)(\/|$))((.*?)\/)*(\s|(.*?)(\s|$)|($)))/g,
	"email":/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+?(\.[a-zA-Z]+)+/g,
	"url":/(https|http|ftp)(:\/\/)((.*?):(.*?)(\/|$)|(.*?)(\/|$))((.*?)\/)*(\s|(.*?)(\s|$)|($))/g,
	"domains":/((\/|)([^\s\/\.]{2,}?)\.)+?([^\/\s\.]{2,}?)(\s|$)/g,
	"quoted":/('|").*?('|")/g,
	"digits":/([+]|[-]|)(\d+(\.\d+|(,\d+)+((\.\d+)|)|))(\b|$)/g,
	"word_joined_by_period":/(^|\s)[a-zA-Z]{1}[a-z]{2,}?\.[A-Z][a-z]{0,4}/g,
	"bullets":/(\b([a-zA-Z]{1,2}|[0-9]{1,2}|[mdclxviMDCLXVI]+)\.\)\s)|(\b([a-zA-Z]{1,2}\.|[0-9]{1,2}(\.[^0-9])|[mdclxviMDCLXVI]+\.))|(\b\(([a-zA-Z]{1,2}|[0-9]{1,2}|[mdclxviMDCLXVI]+)\))|(\(\b([a-zA-Z]{1,2}|[0-9]{1,2}|[mdclxviMDCLXVI]+)\.\))|(\b([a-zA-Z]{1,2}|([0-9]{1,2})|[mdclxviMDCLXVI]+)\))/g
};
exports.store=store;
//the regex for domains also matches /hello.txt as js does not support negative look behinds
//we will get more than we want and filter later



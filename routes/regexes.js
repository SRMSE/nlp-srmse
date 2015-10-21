var store={
	"acc_period":/([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.))/g,
	"acc_no_period":/([A-Z]{2,}?)\s/g,
	"acc_two_to_five_letter_bw":/(\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s)/g,
	"acc_two_to_five_letter_bw_dot_first":/\.[a-z]{2,5}\s/g,
	"acc_single_dot":/\s[a-zA-Z]\.\s/g,
	"acc_jr's":/[a-zA-Z]{2}\.'s/g,
	"double_punc":/[\.\?\!]{2,}/g,
	"acc":/(([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.)))|(([A-Z]{2,}?)\s)|((\s[a-zA-Z]{2,3}\.\s|^[a-zA-Z]{2,3}\.\s))|(\.[a-z]{2,5}\s)|(\s[a-zA-Z]\.\s)|([a-zA-Z]{2}\.'s)/g
};
exports.store=store;
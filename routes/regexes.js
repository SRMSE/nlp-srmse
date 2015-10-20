var store={
	"acc_period":/([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.))/g,
	"acc_no_period":/([A-Z]+?)\s/g,
	"acc_two_words_bw":/(a-zA-Z){2,5}\.\s/g
	"acc":/(([a-zA-Z]\.)+(([a-zA-Z]\s)|([a-zA-Z]\.)))|(([A-Z]+?)\s)/g
};
exports.store=store;
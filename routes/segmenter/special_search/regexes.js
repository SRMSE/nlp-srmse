var rules={
	"blood_groups":/(AB\+)|(AB-)|(A|O|B)(\+|-)/g,
	"punc":/(\+[\w]+)|([\w]+\+)|(@[\w]+)|(#[\w]+)|(\".*\")/g,
	"search_operator":/site:.*?\s|link:.*?\s|related:.*?\s|info:.*?\s|cache:.*?\s/gi,
};
exports.store=rules;
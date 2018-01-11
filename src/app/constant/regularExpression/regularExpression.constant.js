'use strict';
/**
 * 正则表达式Constant
 */
var regularExpressionConstant = {
	// 只能输入数字
	REG_CONS_NUM:/\D/g,
	// 禁止输入特殊字符
	REG_CONS_CHINESE:/[^\u4e00-\u9fa5\w]/g,
	// 只能输入数字和字母
	REG_CONS_NUMENGLISH:/[^\w\/]/ig
}

module.exports = regularExpressionConstant;

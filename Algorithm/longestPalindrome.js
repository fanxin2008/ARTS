/*
 * @Description: 
 * @version: 
 * @Author: fanxin
 * @Date: 2022-10-31 10:09:05
 * @LastEditors: fanxin
 * @LastEditTime: 2022-11-01 11:35:07
 */
/**
 * 5. 最长回文子串
 * 给你一个字符串 s，找到 s 中最长的回文子串。
  
 * 示例 1：
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。

 * 示例 2：
 * 输入：s = "cbbd"
 * 输出："bb"
 */

/**
 * @param {*} s
 * @return {*}
 */
var longestPalindrome = function (s) {
    const str = s.split("");
    var res = { start: -1, end: -1, len: -1 };
    if(str.length <= 1){
        return s;
    }
    for (let i = 1; i < str.length; i++) {
        var temp1 = getMaxlength(i - 1, i - 1, str);
        var temp2 = getMaxlength(i - 1, i, str);
        if (temp1.len > res.len) {
            res = JSON.parse(JSON.stringify(temp1))
        }
        if (temp2.len > res.len) {
            res = JSON.parse(JSON.stringify(temp2))
        }
    }
    if ((res.len > 0) || (res.start > -1 && res.end > -1 && res.len > -1)) {
        return s.substring(res.start, res.end);
    }
    return "";
};
var getMaxlength = function (id1, id2, s) {
    var res = { start: 0, end: 0, len: 0 };
    let start = id1, end = id2;
    while (start >= 0 && end <= s.length - 1 && s[start] == s[end]) {
        res.start = start;
        res.end = end;
        res.len = end - start;
        start--;
        end++;
    }
    return res;
}
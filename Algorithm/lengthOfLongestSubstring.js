/* 不含重复字符的最长子字符串
*
* 给定一个字符串 str ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。
*
*/

function lengthOfLongestSubstring(str){
  let obj = {
    start:0,
    end:0,
    content:''
  },
  lastStr = '';
  for(let i = 0; i < str.length;i++){
    let _substr = str.substr(i, 1);
    let _l = obj.content.indexOf(_substr)
    obj.end = i + 1;
    if( _l > -1){
      obj.start += _l + 1;
      if(lastStr.length < obj.content.length){
        lastStr = obj.content;
      }
      obj.content = str.slice(obj.start,obj.end)
    } else {
      obj.content += _substr;
    }
  }
  var res = obj.content.length > lastStr.length?obj.content:lastStr
  return res.length;
}
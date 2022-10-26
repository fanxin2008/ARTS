/* Given an array of integers,return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * Example:
 *   Given nums = [2, 7, 11, 15], target = 9,
 *   Because nums[0] + nums[1] = 2 + 7 = 9,
 *   return [0, 1].
 */


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
 	let i = 0, j = 0, number = [];
 	for(i = 0; i < nums.length - 1; ++i) {
 		for(j = i+1; j < nums.length; ++j) {
 			if(nums[i] + nums[j] == target) {
 				number.push(i);
 				number.push(j);
 				return number;
 			}
 		}
 	}
 	return number;
 }


 //more faster

 var twoSumMap = function(nums, target) {
 	let map = {};
 	for(let i = 0; i < nums.length -1; ++i) {
 		map[target - nums[i]] = i;
 		if(nums[i+1] in map) {
 			return [map[nums[i+1]],i+1];
 		}
 	}
 	return [];

 }
/**
 *  寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 * 算法的时间复杂度应该为 O(log (m+n)) 。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    nums1 = nums1 || [];
    nums2 = nums2 || [];
    const nums1length = nums1.length;
    const nums2length = nums2.length;
    let point1 = 0,point2 = 0,middle = parseInt((nums1length + nums2length) / 2),res = 0;
    while(point1 + point2 < middle) {
      if(point1 <= nums1length - 1 && point2 <= nums2length -1) {
        if(nums1[point1] <= nums2[point2]) {
          res = nums1[point1];
          point1++;
        } else {
          res = nums2[point2];
          point2++;
        }
      } else if(point1 <= nums1length - 1) {
        res = nums1[point1];
        point1++;
      } else if(point2 <= nums2length - 1){
        res = nums2[point2];
        point2++;
      }
    }
    if(parseInt((nums1length + nums2length) % 2) != 0){
      if(point1 <= nums1length - 1 && point2 <= nums2length -1) {
        if(nums1[point1] <= nums2[point2]) {
         res = nums1[point1];
        } else {
         res = nums2[point2];
        }
      } else if(point1 <= nums1length - 1) {
        res = nums1[point1];
      } else if(point2 <= nums2length - 1){
        res = nums2[point2];
      }
    } else {
      if(point1 <= nums1length - 1 && point2 <= nums2length -1) {
        if(nums1[point1] <= nums2[point2]) {
         res = (res + nums1[point1]) / 2;
        } else {
         res = (res + nums2[point2]) / 2;
        }
      } else if(point1 <= nums1length - 1) {
        res = (res + nums1[point1])/2;
      } else if(point2 <= nums2length - 1){
        res = (res + nums2[point2])/2;
      }
    }
    return res;

};
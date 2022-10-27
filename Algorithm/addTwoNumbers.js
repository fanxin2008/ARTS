/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let temps = 0;
  let res = current = new ListNode();
  let z = new ListNode(0);
  while(l1 || l2 || temps > 0){ 
    l1 = l1 || z;
    l2 = l2 || z;
    let itemy = parseInt((temps + l1.val + l2.val) % 10);
    temps = parseInt((temps + l1.val + l2.val) / 10);
    current.next = new ListNode(itemy);
    current = current.next;
    l1 = l1.next 
    l2 = l2.next
  }
  return res.next;
};
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

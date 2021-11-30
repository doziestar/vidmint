/**
 * Given a linked list, swap every two adjacent nodes and return its head.
 * You must solve the problem without modifying
 *
 *the values in the list's nodes (i.e., only nodes themselves may be changed.)
 */
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  var next = head.next;
  head.next = swapPairs(next.next);
  next.next = head;
  return next;
};

/**
 *Given an array nums of distinct integers, 
 return all the possible permutations. You can return the answer in any order.
 */
var permute = function (nums) {
  var result = [];
  var permuteHelper = function (nums, result, current) {
    if (current.length === nums.length) {
      result.push(current.slice());
    }
    for (var i = 0; i < nums.length; i++) {
      if (current.indexOf(nums[i]) !== -1) {
        continue;
      }
      current.push(nums[i]);
      permuteHelper(nums, result, current);
      current.pop();
    }
  };
  permuteHelper(nums, result, []);
  return result;
};

/**
 * Given an array of distinct integers candidates and a target integer target, 
 * You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. 
Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations 
that sum up to target is less than 150 combinations for the given input.
 */
var combinationSum = function (candidates, target) {
  var result = [];
  var combinationSumHelper = function (candidates, target, result, current) {
    if (target === 0) {
      result.push(current.slice());
      return;
    }
    for (var i = 0; i < candidates.length; i++) {
      if (target - candidates[i] < 0) {
        continue;
      }
      current.push(candidates[i]);
      combinationSumHelper(candidates, target - candidates[i], result, current);
      current.pop();
    }
  };
  combinationSumHelper(candidates, target, result, []);
  return result;
};

/**
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
 */
var removeDuplicates = function (nums) {
  var i = 0;
  for (var j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};

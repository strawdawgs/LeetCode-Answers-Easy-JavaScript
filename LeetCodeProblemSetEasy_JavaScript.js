// ARRAYS --------------------------------------------------------------------------------------------------

// Remove Duplicates from Sorted Array
var removeDuplicates = function(nums) {
    var aPtr = 0;
    var bPtr = 1;
    var curIdx = 1;
    
    while(bPtr < nums.length){
        if(nums[aPtr] === nums[bPtr])
            bPtr++;
        else{
            nums[curIdx] = nums[bPtr];
            curIdx++;
            aPtr = bPtr;
            bPtr++;
        }
    }
    
    return curIdx;
};

/* Faster Solution

var removeDuplicates = function(nums) {
let slow = 0
for( let fast = 1; fast < nums.length; fast++){
    if(nums[slow] !== nums[fast]){
        slow++
        nums[slow] = nums[fast]
    }
}
    return slow+1
}*/

// Best Time to Buy and Sell Stock II
var maxProfit = function(prices) {
    let profit = 0;
    
    for(let i=1; i<prices.length; i++){
        if(prices[i] > prices[i-1])
            profit += prices[i] - prices[i-1];
    }
    
    return profit;
};

// Rotate Array
var rotate = function(nums, k) {
    k = k%nums.length;
    nums.reverse();
    rev(nums, 0, k-1);
    rev(nums, k, nums.length-1);
};

function rev(nums, start, end){
    while(start < end){
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

// Contains Duplicate
var containsDuplicate = function(nums) {
    var set = new Set();
    
    for(let i=0; i<nums.length; i++){
        set.add(nums[i]);
    }
    
    return set.size !== nums.length;
};

// Single Number
var singleNumber = function(nums) {
    let map = new Map();
    for(let i=0; i<nums.length; i++){
        if(map.has(nums[i]))
            map.set(nums[i], map.get(nums[i])+1);
        else
            map.set(nums[i], 1);
    }
    for(const [key, value] of map.entries()){
        if(value === 1)
            return key;
    }
    return 0;
};

// Intersection of Two Arrays II
var intersect = function(nums1, nums2) {
    let intList = [];
    let jIndex = [];
    
    for(let i=0; i<nums1.length; i++){
        for(let j=0; j<nums2.length; j++){
            if(jIndex.includes(j))
                continue;
            if(nums1[i] === nums2[j]){
                intList.push(nums1[i]);
                jIndex.push(j);
                break;
            }
        }
    }
    
    return intList;
};

// Plus One
var plusOne = function(digits) {
    
    for(let i=digits.length-1; i>=0; i--){
        if(digits[i] !== 9){
            digits[i] += 1;
            return digits;
        }else
            digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};

// Move Zeroes
var moveZeroes = function(nums) {
    var ptrZ = 0;
    var ptrNZ = 1;
    while(ptrNZ<nums.length){
        if(nums[ptrNZ] > 0 && nums[ptrZ] === 0){
            swap(nums, ptrZ, ptrNZ);
            ptrZ++;
            ptrNZ++;
        }
        if(nums[ptrZ] === 0 && nums[ptrNZ] === 0){
            ptrNZ++;
        }
        
    }
};

function swap(nums, a, b){
    let temp  = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
    return nums;
}

// Two Sum
var twoSum = function(nums, target) {
    var map = new Map();
    var result = [];
    for(let i=0; i<nums.length; i++){
        if(map.has(target-nums[i])){
            result[0] = map.get(target-nums[i]);
            result[1] = i;
            break;
        }
        else
            map.set(nums[i],i);
    }
    return result;
};

// Valid Sudoku
var isValidSudoku = function(board) {
    let dupFound = false;
    
    //check rows for duplicates
    for(let i=0; i<9; i++){
        let arr = board[i];
        if(containsDuplicate(arr))
            return false;
    }
    
    //check columns for duplicates
    for(let i=0; i<9; i++){
        let arr = getCol(board, i);
        if(containsDuplicate(arr))
            return false;
    }
    
    // had to Math.floor the division and the modulo
    for(let block=0; block<9; block++){
        let m = [];
        for(let i=Math.floor(block / 3) * 3; i<Math.floor(block / 3) * 3 + 3; i++){
            for(let j=Math.floor(block % 3) * 3; j<Math.floor(block % 3) * 3 + 3; j++){
                if(board[i][j] != '.'){
                    if(m[(board[i][j] - '1')])
                        return false;
                    m[(board[i][j] - '1')] = true;
                }
            }
        }
    }
    
    return true;
};

function containsDuplicate(arr){
    let map = new Map();
    for(let i=0; i<arr.length; i++){
        if(map.has(arr[i]) && arr[i] != '.')
            return true;
        else
            map.set(arr[i], 1);
    }
    return false;
}

function getCol(matrix, col){
    var column = [];
    for(let i=0; i<matrix.length; i++){
        column.push(matrix[i][col]);
    }
    return column;
}

// Rotate Image
var rotate = function(matrix) {
    let rowCount = matrix.length;
    let indexAdder = [];
    
    let temp = rowCount-1;
    for(let i=0; i<rowCount; i++)
        indexAdder[i] = temp--;
    
    let listMap = [];
    var indexCounter = 0;
    for(let i=0; i<rowCount; i++){
        for(let j=0; j<rowCount; j++){
            let newIndex = (((indexCounter++)%rowCount)*rowCount)+indexAdder[i];
            listMap.push([matrix[i][j], newIndex]);
        }
    }
    
    indexCounter = 0;
    for(let i=0; i<rowCount; i++){
        for(let j=0; j<rowCount; j++){
            matrix[i][j] = getKey(listMap, indexCounter++);
        }
    }
};

function getKey(list, value){
    for(let i=0; i<list.length; i++){
        if(list[i][1] === value)
            return list[i][0];
    }
}

// STRINGS --------------------------------------------------------------------------------------------------

// Reverse String
var reverseString = function(s) {
    for(let i=0; i<s.length/2; i++){
        s = swap(s, i, s.length-1-i)
    }
};

function swap(s, a, b){
    let temp=s[a];
    s[a]=s[b];
    s[b]=temp;
    return s;
}

// Reverse Integer
var reverse = function(x) {
    let sum = 0;
    let sign = 1;
    if(x<0)
        sign = -1;
    x = Math.abs(x);
    while(x > 0){
        let rem = Math.floor(x%10);
        x = Math.floor(x/10);
        sum = sum * 10 + rem;
        if (sum < Math.pow(-2, 31) || sum > 2**31 - 1) return 0;
    }
    return sum*sign;
};

// First Unique Character in a String
var firstUniqChar = function(s) {
    var map = new Map();
    var index = -1;
    for(let i=0; i<s.length; i++){
        if(map.has(s.charAt(i)))
            map.set(s.charAt(i), map.get(s.charAt(i))+1);
        else
            map.set(s.charAt(i), 1);
    }
    for(const [key, value] of map.entries()){
        if(value === 1)
            return s.indexOf(key);
    }
    return -1;
};

// Valid Anagram
var isAnagram = function(s, t) {
    // s.split returns an array
    // .sort() sorts the array (sort() doesn't work for Strings)
    // .join("") returns the array back to a string 
    return s.split("").sort().join("") === t.split("").sort().join("");
};

// Valid Palindrome
var isPalindrome = function(s) {
    if(s === " ")
        return true;
    s = s.toLowerCase();
    s = s.replace(/\W|_/g, "");
    let words = [...s];
    let start = 0;
    let end = words.length-1;
    while(start < end){
        if(words[start] !== words[end])
            return false;
        start++;
        end--;
    }
    return true;
};

// Implement strStr()
var strStr = function(haystack, needle) {
    
    if(haystack === null || needle === null || needle.length === 0)
        return 0;
    if(needle.length > haystack.length)
        return -1;
    
    for(let i=0; i<=haystack.length-needle.length; i++){
        let temp = haystack.substring(i, i+needle.length);
        if(temp === needle)
            return i;
    }
    
    return -1;
};

// Longest Common Prefix
var longestCommonPrefix = function(strs) {
    var result = "";
    var prefix = "";
    
    for(let i=0; i<strs[0].length; i++){
        prefix = strs[0].charAt(i);
        for(let j=1; j<strs.length; j++){
            if(i===strs[j].length)
                return result;
            if(strs[j].charAt(i) !== prefix){
                if(result.length>0)
                    return result;
                else
                    return "";
            }
        }
        result+=prefix;
    }
    
    return result;
};

// LINKED LIST --------------------------------------------------------------------------------------------------

// Delete Node in a Linked List
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

// Remove Nth Node From the end of a List
var removeNthFromEnd = function(head, n) {
    let prev = null;
    let curr = head;
    let length = 1;
    
    if(head===null || head.next===null)
        return null;
    
    while(curr.next!==null){
        prev = curr;
        curr = curr.next;
        length++;
    }
    
    curr = head;
    
    for(let i=0; i<length-n; i++){
        curr = curr.next;
    }
    
    if(curr.next === null){
        prev.next = null;
        return head;
    }
    
    curr.val = curr.next.val;
    curr.next = curr.next.next;
    
    return head;
};

// Reverse Linked List
var reverseList = function(head) {
    let curr = head;
    let prev = null;
    
    if(head === null)
        return null;
    
    if(head.next === null)
        return head;
    
    let deque = [];
    while(curr.next !== null){
        prev = curr;
        deque.push(curr);
        curr = curr.next;
        prev.next = null;
    }
    deque.push(curr);
    
    let newHead = deque.pop();
    console.log(newHead.val);
    curr = newHead;
    while(deque !== undefined && deque.length>0){
        curr.next = deque.pop();
        curr = curr.next;
    }
    return newHead;
};

// Merge Two Sorted Lists
var mergeTwoLists = function(list1, list2) {
    
    // *** NEEDS UPDATING - CHECK PHP FOR REFERENCE
    
    let head = null;
    let curr = null;
    let nextl1 = list1;
    let nextl2 = list2;
    
    if(list1 === null)
        return list2;
    if(list2 === null)
        return list1;
    if(list1 === null || list2 === null)
        return null;
    
    if(list1.val <= list2.val){
        head = new ListNode(list1.val);
        curr = head;
        if(nextl1.next !== null)
            nextl1 = nextl1.next;
        else{
            head.next = list2;
            return head;
        }
    }else{
        head = new ListNode(list2.val);
        curr = head;
        if(nextl2.next !== null)
            nextl2 = nextl2.next;
        else{
            head.next = list1;
            return head;
        }
    }
    
    while(nextl1 !== null && nextl2 !== null){
        if(nextl1.val <= nextl2.val){
            curr.next = new ListNode(nextl1.val);
            curr = curr.next;
            if(nextl1.next !== null)
                nextl1 = nextl1.next;
            else{
                while(nextl2 !== null){
                    curr.next = new ListNode(nextl2.val);
                    curr = curr.next;
                    nextl2 = nextl2.next;
                }
            }
        }else{
            curr.next = new ListNode(nextl2.val);
            curr = curr.next;
            if(nextl2.next !== null)
                nextl2 = nextl2.next;
            else{
                while(nextl1 !== null){
                    curr.next = new ListNode(nextl1.val);
                    curr = curr.next;
                    nextl1 = nextl1.next;
                }
            } 
        }
    }
    return head;
};

// Palindrome Linked List
var isPalindrome = function(head) {
    
    let s = "";
    
    while(head!==null){
        s += head.val.toString();
        head = head.next;
    }
    
    return ispalindrome(s);
};

var ispalindrome = function(s) {
    if(s === " ")
        return true;
    s = s.toLowerCase();
    s = s.replace(/\W|_/g, "");
    let words = [...s];
    let start = 0;
    let end = words.length-1;
    while(start < end){
        if(words[start] !== words[end])
            return false;
        start++;
        end--;
    }
    return true;
};

// Linked List Cycle
var hasCycle = function(head) {
    
    var map = new Map();
    
    if(head === null || head.next === null)
        return false;
    
    while(head!==null){
        if(head.next === null)
            return false;
        if(map.has(head.next))
            return true;
        map.set(head, head.next);
        head = head.next;
    }
    
    return false;
};

// TREES --------------------------------------------------------------------------------------------------

// Maximum Depth of Binary Tree
var maxDepth = function(root) {
    
    if(root === null)
        return 0;
    
    var leftDepth = maxDepth(root.left);
    var rightDepth = maxDepth(root.right);
    
    if(leftDepth > rightDepth)
        return leftDepth+1;
    else
        return rightDepth+1;
};

// Validate Binary Search Tree
var isValidBST = function(root) {
    if(root !== null){
        if(valid(root.left, root.val, true) && valid(root.right, root.val, false)){
            return isValidBST(root.left) && isValidBST(root.right);
        }else
            return false;
    }
    return true;
};

function valid(root, nodeVal, lessThan){
    if(root !== null){
        if(lessThan){
            if(root.val >= nodeVal)
                return false;
            return valid(root.left, nodeVal, lessThan) && valid(root.right, nodeVal, lessThan);
        }else{
            if(root.val <= nodeVal)
                return false;
            return valid(root.left, nodeVal, lessThan) && valid(root.right, nodeVal, lessThan);
        }
    }
    return true;
}

// Symmetric Tree
var isSymmetric = function(root) {
    return isMirror(root.left, root.right);
};

function isMirror(left, right){
    if(left === null && right === null)
        return true;
    else if(left === null || right === null)
        return false;
    else
        return left.val === right.val &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
}

// Binary Tree Level Order Traversal
var levelOrder = function(root) {
    let nodeList = [];
    let nodeValues = [];
    let currentQ = [];
    let nextQ = [];
    
    if(root === null)
        return nodeList;
    
    currentQ.push(root);
    
    while(currentQ.length > 0){
        // at first I used .pop(), which was grabbing the right node before the left node
        let node = currentQ.shift();
        
        if(node.left !== null)
            nextQ.push(node.left);
        if(node.right !== null)
            nextQ.push(node.right);
        
        nodeValues.push(node.val);
        
        if(currentQ.length === 0){
            currentQ = [...nextQ];
            console.log(currentQ);
            nextQ = [];
            nodeList.push(nodeValues);
            nodeValues = [];
        }
    }
    
    return nodeList;
};

// Convert Sorted Array to Binary Search Tree
var sortedArrayToBST = function(nums) {
    return insert(nums, 0, nums.length-1);
};

function insert(nums, low, high){
    if(low > high)
        return null;
    
    // had to floor the midpoint, since some values were returning decimals;
    // but we're indexing, so decimals aren't allowed
    let mid = Math.floor(low + (high-low)/2);
    
    let root = new TreeNode(nums[mid]);
    
    // this builds the entire left sub-tree
    root.left = insert(nums, low, mid-1);
    
    // this builds the entire right sub-tree
    root.right = insert(nums, mid+1, high);
    
    return root;
}

// SORTING AND SEARCHING --------------------------------------------------------------------------------------------------

// Merge Sorted Array
var merge = function(nums1, m, nums2, n) {
    
    while(m>0 && n>0){
        if(nums1[m-1] > nums2[n-1]){
            nums1[m+n-1] = nums1[m-1];
            m--;
        }else{
            nums1[m+n-1] = nums2[n-1];
            n--;
        }
    }
    
    while(n > 0){
        nums1[m+n-1] = nums2[n-1];
        n--;
    }
    
};

// First Bad Version
var solution = function(isBadVersion) {
    return function(n) {
        let x = -1;
        for(let i=n; i>=1; i/=2){ // don't floor i/=2
            i = Math.floor(i); // floor here instead
            while(!isBadVersion(x+i))
                x+=i;
        }
        return x+1;
    };
};

// DYNAMINC PROGRAMMING --------------------------------------------------------------------------------------------------

// Climbing Stairs
var map = new Map();

var climbStairs = function(n) {
    
    if(n === 0 || n === 1)
        return 1;
    
    if(map.has(n))
        return map.get(n);
    
    var result = climbStairs(n-1) + climbStairs(n-2);
    
    map.set(n, result);
    
    return result;
    
};

// Best Time to Buy and Sell Stock
var maxProfit = function(prices) {
    var profit = 0;
    var buyPrice = 10001; // 10^4 + 1
    for(let i=0; i<prices.length; i++){
        if(prices[i] < buyPrice)
            buyPrice = prices[i];
        else if(prices[i] - buyPrice > profit)
            profit = prices[i]-buyPrice;
    }
    return profit;
};

// Maximum Subarray
var maxSubArray = function(nums) {
    let curSum = nums[0];
    let maxSum = nums[0];
    for(let i=1; i<nums.length; i++){
        curSum = Math.max(nums[i], curSum+nums[i]);
        maxSum = Math.max(curSum, maxSum);
    }
    return maxSum;
};

// House Robber
var rob = function(nums) {
    
    if(nums === null || nums.length === 0)
        return 0;
    if(nums.length === 1)
        return nums[0];
    if(nums.length === 2)
        return Math.max(nums[0], nums[1]);
    
    let dp = [];
    dp[0] = 0;
    dp[1] = nums[0];
    
    for(let i=1; i<nums.length; i++){
        dp[i+1] = Math.max(dp[i], dp[i-1] + nums[i]);
        // currMax, dp[i], OR the last currMax, dp[i-1], plus the current house, nums[i]
    }
    
    return dp[nums.length];
};

// DESIGN --------------------------------------------------------------------------------------------------

// Shuffle an Array
let numArr = [];

var Solution = function(nums) {
    numArr = [...nums];
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return numArr;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let copyNums = [...numArr];
    let m = copyNums.length;
    let temp, i = 0;
    while(m > 0){
        i = Math.floor(Math.random() * m--);
        temp = copyNums[m];
        copyNums[m] = copyNums[i];
        copyNums[i] = temp;
    }
    return copyNums;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

 // Min Stack
 var MinStack = function() {
    this.elements = [];
    this.size = 0;
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.elements.push(val);
    this.size++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.elements.pop();
    this.size--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.elements[this.size-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return Math.min(...this.elements);
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

 // MATH --------------------------------------------------------------------------------------------------

 // Fizz Buzz
 var fizzBuzz = function(n) {
    let result = [];
    for(let i=1; i<=n; i++){
        if(i % 15 === 0)
            result.push("FizzBuzz");
        else if(i % 5 === 0)
            result.push("Buzz");
        else if(i % 3 === 0)
            result.push("Fizz");
        else
            result.push(i.toString());
    }
    return result;
};

// Count Primes
var countPrimes = function(n) {
    
    let isPrime = new Array(n);
    
    isPrime.fill(true);
    
    for(let i=2; i*i<n; i++){
        if(!isPrime[i])
            continue;
        for(let j=i*i; j<n; j+=i)
            isPrime[j] = false;
    }
    
    let count = 0;
    for(let i=2; i<n; i++)
        if(isPrime[i]) count++;
    
    return count;
};

// Power of Three
var isPowerOfThree = function(n) {
    let result = Math.floor(Math.log(n) / Math.log(3) + 1e-10);    
    return n===0 ? false : Math.pow(3, result) === n;
};

// Roman to Integer
var romanToInt = function(s) {
    let result = 0;
    
    for(let i=s.length-1; i>=0; i--){
        switch(s.charAt(i)){
            case 'M':
                if(i!=0 && s.charAt(i-1) === 'C'){
                    result+=900;
                    i--;
                }else
                    result+=1000;
                break;
            case 'D':
                if(i!=0 && s.charAt(i-1) == 'C'){
                    result+=400;
                    i--;
                }else
                    result+=500;
                break;
            case 'C':
                if(i!=0 && s.charAt(i-1) == 'X'){
                    result+=90;
                    i--;
                }else
                    result+=100;
                break;
            case 'L':
                if(i!=0 && s.charAt(i-1) == 'X'){
                    result+=40;
                    i--;
                }else 
                    result+=50;
                break;
            case 'X':
                if(i!=0 && s.charAt(i-1) == 'I'){
                    result+=9;
                    i--;
                }else
                    result+=10;
                break;
            case 'V':
                if(i!=0 && s.charAt(i-1) == 'I'){
                    result+=4;
                    i--;
                }else
                    result+=5;
                break;
            case 'I':
                result+=1;
                break;
        }
    }
    
    return result;
};

// OTHER --------------------------------------------------------------------------------------------------

// Number of 1 Bits
var hammingWeight = function(n) {
    /* got this from: https://stackoverflow.com/questions/24506555/how-to-find-the-number-of-1s-in-a-binary-            representation-of-a-number
    return n.toString(2).split('1').length-1;*/
    
    // Brian Kernighan
    let result = 0;
    while(n!==0){
        n = n & (n-1);
        result++;
    }
    return result;
};

// Hamming Distance
var hammingDistance = function(x, y) {
    
    // got this solution from: https://leetcode.com/problems/hamming-distance/discuss/138661/javascript-solution-        with-explanation
    
    let mask  = x ^ y; // XOR - 0^0=0 | 0^1=1 | 1^0=1 | 1^1=0
    let count = 0;
    
    while(mask>0){
        count += mask & 1; // return 1 or 0 depending on if the right-most bit in mask is 1
        mask >>= 1; // right bitshift 
    }
    
    return count;
};

// Reverse Bits
var reverseBits = function(n) {
    var bin = decimalToBinary(n);
    var resultStr = "";
    var leadingZeros = "";
    
    for(let i=0; i<32-bin.length; i++)
        leadingZeros+="0";
    
    for(let i=bin.length-1; i>=0; i--){
        if(bin.charAt(i) === "1")
            resultStr += "1";
        else
            resultStr += "0";
    }
    
    resultStr+=leadingZeros;
    
    let result = parseInt( resultStr, 2 );
    
    return result;
};

function decimalToBinary(dec) {
  return (dec >>> 0).toString(2);
}

// Pascal's Triangle
var generate = function(numRows) {
    var returnList = [];
    
    for(let i=0; i<numRows; i++){
        returnList.push([]);
        for(let j=0; j<=i; j++){
            if(j===0 || i===j)
                returnList[i][j] = 1;
            else
                returnList[i][j] = returnList[i-1][j-1] + returnList[i-1][j];
        }
    }
    
    return returnList;
};

// Valid Paranthesis
var isValid = function(s) {
    var stack  = [];
    var length = s.length;
    stack.push(s.charAt(0));
    
    for(let i=1; i<s.length; i++){
        let temp = stack[stack.length-1];
        
        if(temp === "(" && s.charAt(i) === ")" ||
           temp === "{" && s.charAt(i) === "}" ||
           temp === "[" && s.charAt(i) === "]"){
            stack.pop();
            if(stack.length === 0 && i !== length-1){
                stack.push(s.charAt(i+1));
                i++;
            }
        }else
            stack.push(s.charAt(i));
    }
    
    return stack.length === 0;
};

// Missing Number
var missingNumber = function(nums) {
    nums.sort(function(a, b) {
        return a - b;
    });
    for(let i=0; i<nums.length; i++){
        if(i===nums[i])
            continue;
        else
            return i;
    }
    return nums.length;
};
// This file contains sample module content data based on open source educational resources
// Sources include:
// - Open Data Structures (opendatastructures.org)
// - Introduction to Algorithms, 3rd Edition (CLRS)
// - Algorithms by Jeff Erickson
// - MDN Web Docs (developer.mozilla.org)
// - React Documentation (reactjs.org)
// - Node.js Documentation (nodejs.org)
// - Python.org and Real Python
// - JavaScript.info and MDN Web Docs

import { getJavaScriptModuleContent } from './jsModuleContentData';
import { getPythonModuleContent } from './pythonModuleContentData';
import { getHTMLModuleContent } from './htmlModuleContentData';
import { getCSSModuleContent } from './cssModuleContentData';

export const getModuleContent = (moduleId) => {
  // Handle undefined or null moduleId
  if (!moduleId) {
    console.warn('getModuleContent called with undefined or null moduleId');
    return null;
  }

  // Check if this is an HTML module
  if (moduleId.startsWith('html-mod-')) {
    return getHTMLModuleContent(moduleId);
  }

  // Check if this is a CSS module
  if (moduleId.startsWith('css-mod-')) {
    return getCSSModuleContent(moduleId);
  }

  // Check if this is a JavaScript module
  if (moduleId.startsWith('js-mod-')) {
    return getJavaScriptModuleContent(moduleId);
  }

  // Check if this is a Python module
  if (moduleId.startsWith('py-mod-')) {
    return getPythonModuleContent(moduleId);
  }

  // Otherwise, use the original module content
  const moduleContent = {
    // Arrays and Strings module content
    "m1": {
      id: "m1",
      title: "Arrays and Strings",
      content: [
        {
          type: "text",
          title: "Introduction to Arrays",
          body: `
            <p>Arrays are one of the most fundamental data structures in computer science. An array is a collection of elements, each identified by an index or a key.</p>

            <p>The simplest type of array is a <strong>linear array</strong> or <strong>one-dimensional array</strong>, which is a collection of data elements with the same data type, arranged using a single index.</p>

            <p>Key characteristics of arrays:</p>
            <ul>
              <li><strong>Random Access</strong>: Elements can be accessed directly using their index</li>
              <li><strong>Fixed Size</strong>: In many languages, arrays have a fixed size that is defined when the array is created</li>
              <li><strong>Homogeneous Elements</strong>: All elements in the array have the same data type</li>
              <li><strong>Contiguous Memory</strong>: Array elements are stored in adjacent memory locations</li>
            </ul>

            <p>The time complexity of common array operations:</p>
            <ul>
              <li>Access: O(1)</li>
              <li>Search: O(n)</li>
              <li>Insertion: O(n)</li>
              <li>Deletion: O(n)</li>
            </ul>

            <p>Arrays are implemented differently in various programming languages. In low-level languages like C, arrays are fixed-size blocks of contiguous memory. In higher-level languages like JavaScript or Python, arrays are more flexible and can grow or shrink dynamically.</p>
          `
        },
        {
          type: "text",
          title: "Array Memory Layout",
          body: `
            <p>Understanding how arrays are stored in memory is crucial for optimizing performance and understanding the limitations of arrays.</p>

            <p>In most programming languages, arrays are stored in contiguous blocks of memory. This means that all elements of the array are stored next to each other in memory.</p>

            <p>For example, if we have an array of integers where each integer takes 4 bytes of memory, and the array starts at memory address 1000, then:</p>
            <ul>
              <li>The first element (index 0) will be at address 1000</li>
              <li>The second element (index 1) will be at address 1004</li>
              <li>The third element (index 2) will be at address 1008</li>
              <li>And so on...</li>
            </ul>

            <p>This contiguous memory layout is what allows arrays to provide O(1) access time. The memory address of any element can be calculated using the formula:</p>

            <p><code>address = base_address + (index * element_size)</code></p>

            <p>Where <code>base_address</code> is the memory address of the first element, <code>index</code> is the position of the element we want to access, and <code>element_size</code> is the size of each element in bytes.</p>

            <p>This formula works because the elements are stored contiguously in memory, so we can simply calculate the offset from the base address.</p>
          `
        },
        {
          type: "video",
          title: "Array Data Structure Visualization",
          description: "This video provides a visual explanation of how arrays work in memory and demonstrates common array operations.",
          source: "CS Dojo",
          notes: "Pay special attention to the visualization of array insertion and deletion operations, as they require shifting elements which leads to O(n) time complexity."
        },
        {
          type: "text",
          title: "Dynamic Arrays",
          body: `
            <p>While traditional arrays have a fixed size, many modern programming languages provide dynamic arrays that can grow or shrink as needed. Examples include ArrayList in Java, vector in C++, and the built-in arrays in JavaScript and Python.</p>

            <p>Dynamic arrays overcome the limitation of fixed-size arrays by automatically resizing when they run out of space. When a dynamic array needs to grow, it typically:</p>

            <ol>
              <li>Allocates a new, larger array (usually twice the size of the original)</li>
              <li>Copies all elements from the original array to the new array</li>
              <li>Deallocates the original array</li>
            </ol>

            <p>This resizing operation is expensive (O(n) time complexity), but it happens infrequently enough that the amortized cost of adding an element to a dynamic array is still O(1).</p>

            <p>The concept of <strong>amortized analysis</strong> is important here. While a single resize operation is expensive, it happens rarely enough that when we average the cost over many operations, the cost per operation is still constant.</p>

            <p>Dynamic arrays provide a good balance between the flexibility of linked lists and the performance of fixed-size arrays.</p>
          `
        },
        {
          type: "quiz",
          title: "Array Concepts Quiz",
          description: "Test your understanding of array concepts with this quiz.",
          questions: [
            {
              id: "q1",
              text: "What is the time complexity of accessing an element in an array by its index?",
              options: [
                { id: "a", text: "O(1)" },
                { id: "b", text: "O(log n)" },
                { id: "c", text: "O(n)" },
                { id: "d", text: "O(n²)" }
              ],
              correctAnswer: "a"
            },
            {
              id: "q2",
              text: "What happens when a dynamic array needs to grow beyond its current capacity?",
              options: [
                { id: "a", text: "It returns an error" },
                { id: "b", text: "It creates a new, larger array and copies the elements" },
                { id: "c", text: "It automatically extends the existing memory block" },
                { id: "d", text: "It converts to a linked list" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "What is the time complexity of inserting an element at the beginning of an array?",
              options: [
                { id: "a", text: "O(1)" },
                { id: "b", text: "O(log n)" },
                { id: "c", text: "O(n)" },
                { id: "d", text: "O(n²)" }
              ],
              correctAnswer: "c"
            }
          ]
        },
        {
          type: "exercise",
          title: "Array Manipulation Exercise",
          description: "Implement a function to reverse an array in-place without using any built-in reverse functions.",
          instructions: [
            "Create a function called 'reverseArray' that takes an array as input",
            "The function should reverse the array in-place (without creating a new array)",
            "Do not use any built-in reverse functions",
            "Return the reversed array"
          ],
          starterCode: `function reverseArray(arr) {
  // Your code here

  return arr;
}

// Example usage:
// const arr = [1, 2, 3, 4, 5];
// console.log(reverseArray(arr)); // Should output: [5, 4, 3, 2, 1]`,
          solution: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements at left and right indices
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    // Move indices towards the center
    left++;
    right--;
  }

  return arr;
}

// Example usage:
// const arr = [1, 2, 3, 4, 5];
// console.log(reverseArray(arr)); // Should output: [5, 4, 3, 2, 1]`
        }
      ]
    },

    // Linked Lists module content
    "m2": {
      id: "m2",
      title: "Linked Lists",
      content: [
        {
          type: "text",
          title: "Introduction to Linked Lists",
          body: `
            <p>A linked list is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (node) contains a reference (link) to the next node in the sequence.</p>

            <p>Unlike arrays, linked lists do not provide random access to elements. To access a specific element, you must traverse the list from the beginning (head) until you reach the desired element.</p>

            <p>The basic structure of a linked list node typically includes:</p>
            <ul>
              <li>Data: The value stored in the node</li>
              <li>Next: A reference to the next node in the sequence</li>
            </ul>

            <p>Linked lists offer several advantages over arrays:</p>
            <ul>
              <li>Dynamic size: Linked lists can grow or shrink during execution</li>
              <li>Efficient insertions and deletions: Adding or removing elements doesn't require shifting other elements</li>
              <li>Flexible memory allocation: Nodes can be stored anywhere in memory</li>
            </ul>

            <p>However, linked lists also have some disadvantages:</p>
            <ul>
              <li>No random access: To access an element, you must traverse from the beginning</li>
              <li>Extra memory: Each node requires additional memory for the reference</li>
              <li>Cache performance: Nodes may be scattered in memory, reducing cache efficiency</li>
            </ul>
          `
        },
        {
          type: "text",
          title: "Types of Linked Lists",
          body: `
            <p>There are several types of linked lists, each with its own characteristics and use cases:</p>

            <h4>Singly Linked List</h4>
            <p>In a singly linked list, each node contains a reference to the next node in the sequence. Traversal can only be done in one direction, from the head to the tail.</p>

            <pre>
Head → [Data|Next] → [Data|Next] → [Data|Next] → null
            </pre>

            <h4>Doubly Linked List</h4>
            <p>In a doubly linked list, each node contains references to both the next and previous nodes. This allows traversal in both directions but requires more memory per node.</p>

            <pre>
null ← [Prev|Data|Next] ↔ [Prev|Data|Next] ↔ [Prev|Data|Next] → null
       ↑
      Head
            </pre>

            <h4>Circular Linked List</h4>
            <p>In a circular linked list, the last node points back to the first node, creating a circle. This can be implemented with either singly or doubly linked lists.</p>

            <pre>
       ┌────────────────────────┐
       ↓                        |
Head → [Data|Next] → [Data|Next] → [Data|Next]
            </pre>

            <p>Each type of linked list has its own advantages and is suitable for different scenarios.</p>
          `
        },
        {
          type: "video",
          title: "Linked List Implementation",
          description: "This video demonstrates how to implement a singly linked list from scratch, including common operations like insertion, deletion, and traversal.",
          source: "freeCodeCamp.org",
          notes: "Focus on understanding the pointer manipulation required for operations like insertion and deletion, as these are the key advantages of linked lists."
        },
        {
          type: "quiz",
          title: "Linked List Concepts Quiz",
          description: "Test your understanding of linked list concepts with this quiz.",
          questions: [
            {
              id: "q1",
              text: "What is the time complexity of accessing the nth element in a singly linked list?",
              options: [
                { id: "a", text: "O(1)" },
                { id: "b", text: "O(log n)" },
                { id: "c", text: "O(n)" },
                { id: "d", text: "O(n²)" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q2",
              text: "Which type of linked list allows traversal in both directions?",
              options: [
                { id: "a", text: "Singly linked list" },
                { id: "b", text: "Doubly linked list" },
                { id: "c", text: "Circular linked list" },
                { id: "d", text: "Skip list" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
              options: [
                { id: "a", text: "O(1)" },
                { id: "b", text: "O(log n)" },
                { id: "c", text: "O(n)" },
                { id: "d", text: "O(n²)" }
              ],
              correctAnswer: "a"
            }
          ]
        },
        {
          type: "exercise",
          title: "Linked List Implementation Exercise",
          description: "Implement a singly linked list with basic operations.",
          instructions: [
            "Create a Node class with properties for the data and next pointer",
            "Create a LinkedList class with a head property",
            "Implement methods for append, prepend, delete, and print",
            "Test your implementation with the provided example"
          ],
          starterCode: `class Node {
  // Your code here
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a node to the end of the list
  append(data) {
    // Your code here
  }

  // Add a node to the beginning of the list
  prepend(data) {
    // Your code here
  }

  // Delete a node with the given data
  delete(data) {
    // Your code here
  }

  // Print the linked list
  print() {
    // Your code here
  }
}

// Example usage:
// const list = new LinkedList();
// list.append(1);
// list.append(2);
// list.prepend(0);
// list.print(); // Should output: 0 -> 1 -> 2
// list.delete(1);
// list.print(); // Should output: 0 -> 2`,
          solution: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a node to the end of the list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  // Add a node to the beginning of the list
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Delete a node with the given data
  delete(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Print the linked list
  print() {
    let result = '';
    let current = this.head;

    while (current) {
      result += current.data + (current.next ? ' -> ' : '');
      current = current.next;
    }

    console.log(result);
  }
}

// Example usage:
// const list = new LinkedList();
// list.append(1);
// list.append(2);
// list.prepend(0);
// list.print(); // Should output: 0 -> 1 -> 2
// list.delete(1);
// list.print(); // Should output: 0 -> 2`
        }
      ]
    }
  };

  return moduleContent[moduleId] || null;
};

export default getModuleContent;

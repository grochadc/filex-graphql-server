import { resolve } from "path";

class QueueNode {
  value: Promise<Number>;
  next: QueueNode;
  resolve: (value: number) => void;

  constructor() {
    this.value = new Promise((resolve) => {
        this.resolve = resolve;
    });
  }
}

export default class Queue {
  head: QueueNode | null;
  tail: QueueNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue() {
    const n = new QueueNode();

    if (this.head === null && this.tail === null) {
      //empty queue
      this.head = n;
      this.tail = n;
    } else if (this.head === this.tail) {
      //one item queued
      this.head.next = n;
      this.tail = n;
    } else if (this.head !== this.tail) {
      //more than one item queued
      this.tail.next = n;
      this.tail = n;
    }

    this.dequeue();

    return n.value;
  }

  dequeue() {
    if (this.head) {
      const n = this.head;
      this.head = n.next;
      n.resolve(Math.floor(Math.random() * 1000));
    }
  }

  peek() {
    return this.head;
  }
}

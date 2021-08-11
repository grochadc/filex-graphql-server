class QueueNode {
  data: number;
  next: QueueNode | null = null;

  constructor(index: number) {
    this.data = index;
  }
}

class Carousel {
  head: QueueNode | null = null;
  tail: QueueNode | null = null;
  count: number = 0;
  limit: number = 3;

  peek(): QueueNode | null {
    if (this.head) return this.head;
    return null;
  }

  enqueue(): void {
    const node = new QueueNode(this.count);
    this.countUp();
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.head = this.tail;
      this.tail = node;
    }
  }
  dequeue(): number {
    if (this.head) {
      const temp = this.head;
      this.head = this.head.next;
      if (temp.data > this.limit) return 0;
      return temp.data;
    } else {
      console.log("No item on head");
      return this.count;
    }
  }
  countUp(): void {
    if (this.count < this.limit) {
      this.count++;
    } else {
      this.count = 0;
    }
  }
  setNewLimit(newLimit: number) {
    this.limit = newLimit;
  }

  getNextIndex(): number {
    this.enqueue();
    return this.dequeue();
  }
}

export default Carousel;

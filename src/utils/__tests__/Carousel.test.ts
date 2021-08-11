import Carousel from "../Carousel";

describe("Carousel", () => {
  test("gets next index", () => {
    const carousel = new Carousel();

    expect(carousel.getNextIndex()).toBe(0);
    expect(carousel.getNextIndex()).toBe(1);
    expect(carousel.getNextIndex()).toBe(2);
    expect(carousel.getNextIndex()).toBe(3);
    expect(carousel.getNextIndex()).toBe(0);
  });

  test("changes new limit", () => {
    const carousel = new Carousel();
    carousel.setNewLimit(4);
    expect(carousel.getNextIndex()).toBe(0);
    expect(carousel.getNextIndex()).toBe(1);
    expect(carousel.getNextIndex()).toBe(2);
    expect(carousel.getNextIndex()).toBe(3);
    expect(carousel.getNextIndex()).toBe(4);
    expect(carousel.getNextIndex()).toBe(0);
  });

  test("changes new limit when queue is not empty", () => {
    const carousel = new Carousel();

    expect(carousel.getNextIndex()).toBe(0);
    expect(carousel.getNextIndex()).toBe(1);
    expect(carousel.getNextIndex()).toBe(2);
    expect(carousel.getNextIndex()).toBe(3);
    expect(carousel.getNextIndex()).toBe(0);

    carousel.setNewLimit(2);
    expect(carousel.getNextIndex()).toBe(1);
    expect(carousel.getNextIndex()).toBe(2);
    expect(carousel.getNextIndex()).toBe(0);
  });

  test("returns default index if current is out of bounds", () => {
    const arr = [0, 1, 2];
    const carousel = new Carousel();

    carousel.enqueue(); //limit = 3; count = 0; head = { data: 0, next: null }; count++; count = 1
    carousel.enqueue(); //limit = 3; count = 1; head = { data: 0, next: { data: 1, next: null } }; count++; count = 2;
    carousel.enqueue(); //limit = 3; head = { data: 0, next: { data: 1, next: { data: 2, next: null } } } }
    carousel.enqueue(); //limit = 3; head = { data: 0, next: { data: 1, next: { data: 2, next: { data: 3, next: null } } } } }
    carousel.dequeue(); //limit = 3; head = { data: 1, next: { data: 2, next: { data: 3, next: null } } } }; return 0;

    carousel.setNewLimit(2); //limit = 2; head = { data: 1, next: { data: 2, next: { data: 3, next: null } } } };
    carousel.enqueue(); //limit = 2; head = { data: 1, next: { data: 2, next: { data: 3, next: null } } } };

    expect(arr[3]).toBeUndefined();
  });
});

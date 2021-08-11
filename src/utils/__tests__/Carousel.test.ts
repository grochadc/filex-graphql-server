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
    const carousel = new Carousel();

    carousel.enqueue();
    carousel.enqueue();
    carousel.enqueue();
    carousel.enqueue();

    expect(carousel.dequeue()).toBe(2);

    carousel.setNewLimit(2);
    expect(carousel.getNextIndex()).toBe(0);
  });
});

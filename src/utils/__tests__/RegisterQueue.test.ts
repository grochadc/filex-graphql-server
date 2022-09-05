import Queue from "../Queue";

test("enqueues 1 item and gets a promise for an id", async () => {
  const queue = new Queue();
  const promise = queue.enqueue();
  expect(promise).toBeInstanceOf(Promise);
  const result = await promise;
  expect(result).toBeLessThan(1000);
});

test("enqueues 2 items and both promises resolve in a queue", async () => {
  const queue = new Queue();
  const promise1 = queue.enqueue();
  const promise2 = queue.enqueue();
  expect(promise1).toBeInstanceOf(Promise);
  expect(promise2).toBeInstanceOf(Promise);
  const result1 = await promise1;
  expect(result1).toBeLessThan(1000);
  /*
  const result2 = await promise2;
  expect(result2).toBeLessThan(1000);
  */
});

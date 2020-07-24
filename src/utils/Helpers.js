export function deepCopyObject(object) {
  return object.map((obj) => {
    return obj.map((val) => {
      return val;
    });
  });
}

export function getRandomNumberInRange(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

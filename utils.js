function times(iterations = 1, callback) {
  for (let i = 0; i < iterations; i++) {
    callback(i);
  }
}

module.exports = {
  times
}
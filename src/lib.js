module.exports.absolute = function (x) {
  return x >= 0 ? x : -x;
};

module.exports.greet = function (name) {
  return "hello! " + name + " how are you?";
};

module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required");
  return {
    id: Math.random().toString(),
    username: username,
  };
};

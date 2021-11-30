const lib = require("../lib");

describe("absolute", () => {
  it("return positive, if input is positive", () => {
    const result = lib.absolute(3);
    expect(result).toBe(3);
  });

  it("return 0, if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });

  it("return negative, if input is negative", () => {
    const result = lib.absolute(-3);
    expect(result).toBe(3);
  });
});

describe("greet", () => {
  it("return hello! + name", () => {
    const result = lib.greet("dozie");
    expect(result).toMatch(/hello! dozie/);
  });

  it("check if it contains name", () => {
    const result = lib.greet("dozie");
    expect(result).toContain("dozie");
  });
});

describe("getCurrencies", () => {
  it("return array of currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(["USD", "AUD", "EUR"]);
  });
  it("check if it contains USD", () => {
    const result = lib.getCurrencies();
    expect(result).toContain("USD");
  });
});

describe("getProduct", () => {
  it("return product with id", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
  it("return product with id", () => {
    const result = lib.getProduct(1);
    expect(result.id).toBe(1);
  });
});

describe("registerUser", () => {
  it("return user with id", () => {
    const result = lib.registerUser("dozie");
    expect(result).toMatchObject({ id: expect.any(String), username: "dozie" });
  });
  //test exception
  it("throw error if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
});

import { randomItem, randomItems } from "@/utils/random";

describe("randomItem", () => {
  it("returns an item from the provided array", () => {
    const items = ["apple", "banana", "orange"];

    expect(items).toContain(randomItem(items));
  });

  it("throws an error when the array is empty", () => {
    expect(() => randomItem([])).toThrow();
  });
});

describe("randomItems", () => {
  it("returns the requested number of items", () => {
    const items = ["A", "B", "C", "D"];

    expect(randomItems(items, 2)).toHaveLength(2);
  });

  it("does not select the same array position twice", () => {
    const items = ["A", "B", "C", "D"];
    const selected = randomItems(items, 3);

    expect(new Set(selected).size).toBe(3);
  });

  it("does not modify the original array", () => {
    const items = ["A", "B", "C"];
    const original = [...items];

    randomItems(items, 2);

    expect(items).toEqual(original);
  });

  it("rejects a count greater than the array length", () => {
    expect(() => randomItems(["A", "B"], 3)).toThrow();
  });

  it("rejects negative and fractional counts", () => {
    expect(() => randomItems(["A", "B"], -1)).toThrow();
    expect(() => randomItems(["A", "B"], 1.5)).toThrow();
  });
});

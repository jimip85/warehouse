import { formatReadableDate } from "@/util/formatDate";

describe("formatReadableDate", () => {

  it("should format a valid date string correctly", () => {
    const result = formatReadableDate("2025-04-24");
    expect(result).toBe("April 24, 2025");
  });

  it("should handle a single-digit month correctly", () => {
    const result = formatReadableDate("2025-01-01");
    expect(result).toBe("January 1, 2025");
  });

  it("should handle the last day of the year correctly", () => {
    const result = formatReadableDate("2025-12-31");
    expect(result).toBe("December 31, 2025");
  });

  it("should handle a leap year date correctly", () => {
    const result = formatReadableDate("2024-02-29");
    expect(result).toBe("February 29, 2024");
  });

  it("should return 'Invalid Date' for incorrectly formatted date string", () => {
    const result = formatReadableDate("2025/04/24");
    expect(result).toBe("Invalid Date");
  });

  it("should return 'Invalid Date' for empty string input", () => {
    const result = formatReadableDate("");
    expect(result).toBe("Invalid Date");
  });

  it("should return 'Invalid Date' for a non-date string", () => {
    const result = formatReadableDate("not-a-date");
    expect(result).toBe("Invalid Date");
  });

});

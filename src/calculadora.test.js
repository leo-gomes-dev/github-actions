import { describe, it, expect } from "vitest";
import { somar } from "./calculadora.js";

describe("Teste da Calculadora", () => {
  it("deve somar dois números corretamente", () => {
    expect(somar(2, 3)).toBe(5);
  });
});

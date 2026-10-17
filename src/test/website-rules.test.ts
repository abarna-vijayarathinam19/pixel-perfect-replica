import { describe, expect, it } from "vitest";
import { BOOKING_URL } from "@/lib/booking";
import { filterDoctors } from "@/lib/doctor-filter";

describe("Website booking and filters", () => {
  it("uses the requested Avenset login destination", () => {
    expect(BOOKING_URL).toBe("https://login.avenset.com");
  });
  it("combines the doctor, specialization, and hospital filters", () => {
    expect(filterDoctors({ doctor: " arun ", spec: "Cardiology", hospital: "Jaffna Teaching Hospital", date: "" }).map((d) => d.name)).toEqual(["Dr. Arun Kumar"]);
  });
  it("does not fall back to unrelated doctors for incompatible filters", () => {
    expect(filterDoctors({ doctor: "Arun", spec: "Dermatology", hospital: "", date: "" })).toEqual([]);
  });
});
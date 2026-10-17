import { DOCTORS } from "./doctors";

export type DoctorFilters = { doctor: string; spec: string; hospital: string; date: string };

export function filterDoctors(filters: DoctorFilters) {
  const query = filters.doctor.trim().toLowerCase();
  return DOCTORS.filter((doctor) =>
    (!query || doctor.name.toLowerCase().includes(query)) &&
    (!filters.spec || doctor.spec === filters.spec) &&
    (!filters.hospital || doctor.hospital === filters.hospital),
  );
}
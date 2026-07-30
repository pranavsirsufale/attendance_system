import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TimetableDisplay() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

  const TIME_SLOTS = [
    { value: "08:30", label: "08:30–09:30" },
    { value: "09:30", label: "09:30–10:30" },
    { value: "10:30", label: "10:30–11:30" },
    { value: "12:00", label: "12:00–01:00" },
    { value: "01:00", label: "01:00–02:00" },
  ];

  const ROMAN = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
  };

  useEffect(() => {
    loadTimetable();
  }, []);

  async function loadTimetable() {
    try {
      const token = localStorage.getItem("access_token");

      const { data } = await axios.get("/api/admin/timetable-display/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimetable(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load timetable.");
    } finally {
      setLoading(false);
    }
  }

  const sections = useMemo(() => {
    return [
      ...new Map(
        timetable.filter((t) => isCurrentSemester(t)).map((t) => [t.section.id, t.section])
      ).values(),
    ];
  }, [timetable]);

  const uniqueYears = useMemo(() => {
    return [...new Set(sections.map((s) => s.year))].sort((a, b) => a - b);
  }, [sections]);

  const uniqueSemesters = useMemo(() => {
    return [...new Set(timetable.map((t) => t.semester).filter(Boolean))].sort((a, b) => a - b);
  }, [timetable]);

  const filteredSections = useMemo(() => {
    let list = sections;

    if (filterYear) list = list.filter((s) => String(s.year) === String(filterYear));

    if (query) {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => `${s.program} ${ROMAN[s.year]} ${s.name}`.toLowerCase().includes(q));
    }

    if (filterSemester) {
      list = list.filter((s) => timetable.find((t) => t.section.id === s.id && String(t.semester) === String(filterSemester)));
    }

    return list;
  }, [sections, query, filterYear, filterSemester, timetable]);

  function isCurrentSemester(item) {
    if (!item.semester_start_date || !item.semester_end_date) return true;

    const today = new Date();
    const start = new Date(item.semester_start_date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(item.semester_end_date);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  }

  function getSemester(section) {
    const record = timetable.find((t) => t.section.id === section.id && t.section.year === section.year && isCurrentSemester(t));
    return record?.semester ?? "";
  }

  function getLecture(section, time) {
    const semester = getSemester(section);
    return timetable.find(
      (t) => t.section.id === section.id && t.section.year === section.year && t.semester === semester && t.start_time.substring(0, 5) === time && isCurrentSemester(t)
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-100 p-4 print:bg-white">
      <style>{`
        @media print{
          @page{ size:A4 landscape; margin:10mm; }
          .no-print{ display:none !important; }
          body{ background:#fff; }
          table{ border-collapse:collapse; width:100%; }
          th,td{ border:1px solid #000; }
        }
      `}</style>

      <div className="bg-white border-2 border-black p-4 mb-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">MANIKCHAND PAHADE LAW COLLEGE</h1>
          <p className="text-sm text-gray-700">Marathwada Legal & General Education Society</p>
          <h2 className="text-base font-semibold mt-2">SEMESTER TIME TABLE</h2>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Year:</label>
            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="text-sm border rounded px-2 py-1">
              <option value="">All</option>
              {uniqueYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <label className="text-xs text-gray-600">Semester:</label>
            <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="text-sm border rounded px-2 py-1">
              <option value="">All</option>
              {uniqueSemesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search programme or section" className="px-3 py-1 border rounded text-sm w-64" />
            <button onClick={() => { setQuery(""); setFilterYear(""); setFilterSemester(""); }} className="text-sm px-3 py-1 border rounded bg-gray-100">Clear</button>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-500 p-3 mb-4">{error}</div>}

      <div className="overflow-x-auto bg-white shadow-sm rounded">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-700 uppercase">
              <th className="p-2 text-left sticky top-0 bg-gray-50">Programme / Section</th>
              {TIME_SLOTS.map((slot) => (
                <th key={slot.value} className="p-2 text-left sticky top-0 bg-gray-50">{slot.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={TIME_SLOTS.length + 1} className="p-8 text-center font-semibold">Loading Timetable...</td>
              </tr>
            ) : filteredSections.length === 0 ? (
              <tr>
                <td colSpan={TIME_SLOTS.length + 1} className="p-8 text-center text-red-500">{query ? "No matching sections found" : "No Active Timetable Found"}</td>
              </tr>
            ) : (
              filteredSections.map((section) => {
                const rec = timetable.find((t) => t.section.id === section.id && t.section.year === section.year && isCurrentSemester(t)) || timetable.find((t) => t.section.id === section.id && t.section.year === section.year);
                const start = rec?.semester_start_date ? new Date(rec.semester_start_date).toLocaleDateString() : "";
                const end = rec?.semester_end_date ? new Date(rec.semester_end_date).toLocaleDateString() : "";

                return (
                  <tr key={section.id} className="hover:bg-gray-50">
                    <td className="p-2 align-top border-t">
                      <div className="font-medium text-xs">{section.program} - {ROMAN[section.year]}</div>
                      <div className="text-[11px] text-gray-600">{section.name.replace("Section ", "")}</div>
                      <div className="text-[11px] text-gray-500">{getSemester(section)}-Sem {start && end ? `· ${start} — ${end}` : ""}</div>
                    </td>

                    {TIME_SLOTS.map((slot) => {
                      const lecture = getLecture(section, slot.value);
                      return (
                        <td key={slot.value} className="p-2 align-top border-t h-24">
                          {lecture ? (
                            <div>
                              <div className="font-semibold text-xs uppercase text-gray-800">{lecture.subject?.name}</div>
                              <div className="mt-1 text-[11px] text-gray-700">{lecture.teacher ? `${lecture.teacher.first_name} ${lecture.teacher.last_name}` : "Teacher Not Assigned"}</div>
                              {lecture.subject?.code && <div className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">{lecture.subject.code}</div>}
                            </div>
                          ) : (
                            <div className="text-center text-gray-300 italic">—</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 mt-5 no-print">
        <button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition">Print</button>
        <button onClick={() => navigate(-1)} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded transition">Back</button>
      </div>
    </motion.div>
  );
}
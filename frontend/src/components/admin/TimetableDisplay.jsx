import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TimetableDisplay() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState("");

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

      const { data } = await axios.get(
        "/api/admin/timetable-display/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimetable(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load timetable.");
    } finally {
      setLoading(false);
    }
  }  const sections = useMemo(() => {
    return [
      ...new Map(
        timetable
          .filter((t) => isCurrentSemester(t))
          .map((t) => [t.section.id, t.section])
      ).values(),
    ];
  }, [timetable]);

  function isCurrentSemester(item) {
    if (!item.semester_start_date || !item.semester_end_date) {
      return true;
    }

    const today = new Date();

    const start = new Date(item.semester_start_date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(item.semester_end_date);
    end.setHours(23, 59, 59, 999);

    return today >= start && today <= end;
  }

  function getSemester(section) {
    const record = timetable.find(
      (t) =>
        t.section.id === section.id &&
        t.section.year === section.year &&
        isCurrentSemester(t)
    );

    return record?.semester ?? "";
  }

  function getLecture(section, time) {
    const semester = getSemester(section);

    return timetable.find(
      (t) =>
        t.section.id === section.id &&
        t.section.year === section.year &&
        t.semester === semester &&
        t.start_time.substring(0, 5) === time &&
        isCurrentSemester(t)
    );
  }  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 p-4 print:bg-white"
    >
      <style>{`
        @media print{
          @page{
            size:A4 landscape;
            margin:10mm;
          }

          .no-print{
            display:none !important;
          }

          body{
            background:#fff;
          }

          table{
            border-collapse:collapse;
            width:100%;
          }

          th,td{
            border:1px solid #000;
          }
        }
      `}</style>

      <div className="bg-white border-2 border-black p-4 mb-4">
        <h1 className="text-3xl font-bold text-center">
          MANIKCHAND PAHADE LAW COLLEGE
        </h1>

        <p className="text-center text-sm">
          Marathwada Legal & General Education Society
        </p>

        <h2 className="text-xl font-bold text-center mt-3">
          SEMESTER TIME TABLE
        </h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-500 p-3 mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-xs">

          <thead>
            <tr className="bg-gray-200">

              <th className="p-2">
                Programme / Section
              </th>

              {TIME_SLOTS.map((slot) => (
                <th
                  key={slot.value}
                  className="p-2"
                >
                  {slot.label}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>{loading ? (
  <tr>
    <td
      colSpan={TIME_SLOTS.length + 1}
      className="p-10 text-center font-semibold"
    >
      Loading Timetable...
    </td>
  </tr>
) : sections.length === 0 ? (
  <tr>
    <td
      colSpan={TIME_SLOTS.length + 1}
      className="p-10 text-center text-red-500"
    >
      No Active Timetable Found
    </td>
  </tr>
) : (
  sections.map((section) => (
    <tr key={section.id}>

      <td className="p-2 align-top">

        <div className="font-bold text-sm">
          {section.program} - {ROMAN[section.year]}
        </div>

        <div>
          ({section.name.replace("Section ", "")})
        </div>

        <div className="text-gray-500">
          ({getSemester(section)}-Sem)
        </div>

      </td>

      {TIME_SLOTS.map((slot) => {

        const lecture = getLecture(section, slot.value);

        return (

          <td
            key={slot.value}
            className="p-2 h-24 align-top"
          >

            {lecture ? (

              <>

                <div className="font-bold uppercase">
                  {lecture.subject?.name}
                </div>

                <div className="mt-2 text-[11px] text-gray-700">
                  {lecture.teacher
                    ? `${lecture.teacher.first_name} ${lecture.teacher.last_name}`
                    : "Teacher Not Assigned"}
                </div>

              </>

            ) : (

              <div className="text-center text-gray-300">
                —
              </div>

            )}

          </td>

        );

      })}

    </tr>
  ))
)}          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 mt-5 no-print">

        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
        >
          Print
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded transition"
        >
          Back
        </button>

      </div>

    </motion.div>
  );
}
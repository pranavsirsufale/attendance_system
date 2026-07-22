import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function TimetableDisplay() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState("");

  const getHeaders = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/");
      return null;
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const loadTimetable = async () => {
    try {
      const headers = getHeaders();
      if (!headers) return;

      setLoading(true);

      const res = await axios.get(
        "/api/admin/timetable-display/",
        {
          headers,
        }
      );

      setTimetable(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load timetable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimetable();
  }, []);

  const timeSlots = useMemo(() => {
    return [
      ...new Set(
        timetable.map((item) => item.start_time.substring(0, 5))
      ),
    ].sort();
  }, [timetable]);

  const sectionRows = useMemo(() => {
    return [
      ...new Map(
        timetable.map((item) => [item.section.id, item.section])
      ).values(),
    ];
  }, [timetable]);

  const getLecture = (sectionId, time) => {
    return timetable.find(
      (lecture) =>
        lecture.section.id === sectionId &&
        lecture.start_time.substring(0, 5) === time
    );
  };

  return (

    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="min-h-screen bg-slate-100 p-6"
>
  {/* Header */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <h1 className="text-4xl font-bold text-center text-indigo-700">
      MANIKCHAND PAHADE LAW COLLEGE
    </h1>

    <p className="text-center text-gray-500 mt-2">
      Marathwada Legal & General Education Society
    </p>

    <h2 className="text-3xl font-semibold text-center mt-4">
      Semester Timetable
    </h2>
  </div>

  {/* Error */}
  {error && (
    <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 p-4">
      {error}
    </div>
  )}

  {/* Timetable */}
  <div className="bg-white rounded-xl shadow-xl overflow-x-auto">

    <table className="min-w-full border-collapse">

      <thead>

        <tr className="bg-indigo-700 text-white">

          <th className="border p-4 sticky left-0 bg-indigo-700 z-20 min-w-[240px]">
            Class / Section
          </th>

          {timeSlots.map((time) => (

            <th
              key={time}
              className="border p-4 text-center min-w-[180px]"
            >
              {time}
            </th>

          ))}

        </tr>

      </thead>

      <tbody>

        {loading ? (

          <tr>

            <td
              colSpan={timeSlots.length + 1}
              className="text-center p-16 text-xl"
            >
              Loading Timetable...
            </td>

          </tr>

        ) : sectionRows.length === 0 ? (

          <tr>

            <td
              colSpan={timeSlots.length + 1}
              className="text-center p-16 text-gray-500"
            >
              No Timetable Found
            </td>

          </tr>

        ) : (

          sectionRows.map((section) => (

            <tr key={section.id}>

              <td className="border p-4 bg-gray-50 sticky left-0 z-10">

                <div className="font-bold text-lg text-indigo-700">
                  {section.program}
                </div>

                <div className="font-semibold">
                  {section.name}
                </div>

                <div className="text-sm text-gray-500">
                  Year {section.year}
                </div>

              </td>

              {timeSlots.map((time) => {

                const lecture = getLecture(section.id, time);

                return (

                  <td
                    key={time}
                    className="border align-top p-3 h-32"
                  >

                    {lecture ? (

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 h-full"
                      >

                        <div className="font-bold text-indigo-700">
                          {lecture.subject.name}
                        </div>

                        <div className="mt-3 text-gray-700">
                          👨‍🏫 {lecture.teacher.first_name}{" "}
                          {lecture.teacher.last_name}
                        </div>

                        <div className="mt-2 text-sm text-gray-500">
                          {lecture.day_of_week}
                        </div>

                      </motion.div>

                    ) : (

                      <div className="flex h-full items-center justify-center text-gray-300 text-3xl">
                        —
                      </div>

                    )}

                  </td>

                );

              })}

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

  {/* Footer */}

  <div className="mt-8 flex flex-wrap justify-end gap-4">

    <button
      onClick={() => window.print()}
      className="rounded-lg bg-green-600 px-6 py-3 text-white shadow hover:bg-green-700"
    >
      🖨 Print Timetable
    </button>

    <button
      onClick={() => navigate(-1)}
      className="rounded-lg bg-gray-600 px-6 py-3 text-white shadow hover:bg-gray-700"
    >
      ← Back
    </button>

  </div>
  </motion.div>
  );
}

export default TimetableDisplay;
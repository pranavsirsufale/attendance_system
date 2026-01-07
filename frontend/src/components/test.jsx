  <div className="bg-white rounded-b-lg shadow-lg p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'create' ? (
              <motion.div
                key="create"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Archival Snapshot</h2>
                <p className="text-gray-600 mb-6">
                  First select a program, then choose the semester to archive. Optionally filter by date range.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="">
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      Program <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={archiveFilters.program_id}
                      onChange={(e) => {
                        const programId = e.target.value;
                        setArchiveFilters({ ...archiveFilters, program_id: programId, semester: '' });
                        
                        if (programId) {
                          const selectedProgram = programs.find(p => p.id === parseInt(programId));
                          if (selectedProgram) {
                            const maxSemesters = selectedProgram.duration_years * 2;
                            const semesterList = Array.from({ length: maxSemesters }, (_, i) => i + 1);
                            setAvailableCreateSemesters(semesterList);
                          }
                        } else {
                          setAvailableCreateSemesters([]);
                        }
                      }}
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                    >
                      <option value="">-- Select Program (Required) --</option>
                      {programs.map(prog => (
                        <option key={prog.id} value={prog.id}>{prog.name}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Select the program first</p>
                  </div>

                  <div className="">
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={archiveFilters.semester}
                      onChange={(e) => setArchiveFilters({ ...archiveFilters, semester: e.target.value })}
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={!archiveFilters.program_id}
                    >
                      <option value="">
                        {!archiveFilters.program_id 
                          ? '-- Select Program First --' 
                          : availableCreateSemesters.length === 0
                            ? 'No Semesters Available'
                            : '-- Select Semester (Required) --'}
                      </option>
                      {availableCreateSemesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      {archiveFilters.program_id 
                        ? 'Select the semester you want to archive' 
                        : 'Program selection required'}
                    </p>
                  </div>
                </div>

                {/* <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Archive Note (Optional)</label>
                  <textarea
                    value={archiveNote}
                    onChange={(e) => setArchiveNote(e.target.value)}
                    placeholder="Add a note about this archive (e.g., 'Semester 5 Final Backup - December 2025')"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div> */
                {archiveFilters.program_id && archiveFilters.semester && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Archive Summary:</h3>
                    <p className="text-gray-700">
                      📚 Archiving all attendance for <strong>{programs.find(p => p.id === parseInt(archiveFilters.program_id))?.name}</strong> - <strong>Semester {archiveFilters.semester}</strong>
                      {(archiveFilters.start_date || archiveFilters.end_date) && ' within date range'}
                    </p>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateArchive}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Creating Archive...' : 'Create Archival Snapshot'}
                </motion.button>
              </motion.div>
            ) : activeTab === 'semester-view' ? (
              <motion.div
                key="semester-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Semester-Wise Archival View</h2>
                <p className="text-gray-600 mb-6">
                  Filter and view archived attendance by semester. Download complete data in XLSX or CSV format.
                </p>

                {/* Filter Section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Program <span className="text-red-500">*</span>
                {studentDetailOpen && studentDetail && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{studentDetail.student_roll_number} — {studentDetail.student_name}</h3>
                        <button onClick={() => setStudentDetailOpen(false)} className="px-3 py-1 bg-gray-200 rounded">Close</button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                       
                        <div>
                          <p className="text-sm text-gray-600">Present</p>
                          <p className="font-bold text-lg text-green-600">{studentDetail.present}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Absent</p>
                          <p className="font-bold text-lg text-red-600">{studentDetail.absent}</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-2 text-left">Session Date</th>
                              <th className="p-2 text-left">Status</th>
                              <th className="p-2 text-left">Recorded By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentDetail.records.map((r, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="p-2">{new Date(r.session_date).toLocaleDateString()}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded ${r.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {r.status}
                                  </span>
                                </td>
                                <td className="p-2">{r.original_recorded_by}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                      </label>
                      <select
                        value={semesterViewFilters.program_id}
                        onChange={(e) => {
                          const programId = e.target.value;
                          setSemesterViewFilters({ ...semesterViewFilters, program_id: programId });
                          
                          // Update available semesters based on program duration
                          if (programId) {
                            const selectedProgram = programs.find(p => p.id === parseInt(programId));
                            if (selectedProgram) {
                              const maxSemesters = selectedProgram.duration_years * 2;
                              const semesterList = Array.from({ length: maxSemesters }, (_, i) => i + 1);
                              setAvailableSemesters(semesterList);
                            }
                          } else {
                            // Show all semesters when no program selected
                            setAvailableSemesters([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                          }
                        }}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Programs</option>
                        {programs.map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Semester <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={semesterViewFilters.semester}
                        onChange={(e) => setSemesterViewFilters({ ...semesterViewFilters, semester: e.target.value })}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Select Semester --</option>
                        {availableSemesters.map(sem => (
                          <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                      </select>
                      {semesterViewFilters.program_id && (
                        <p className="text-sm text-blue-600 mt-1">
                          Showing semesters for selected program
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Start Date <span className="text-sm text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="date"
                        value={semesterViewFilters.start_date}
                        onChange={(e) => setSemesterViewFilters({ ...semesterViewFilters, start_date: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        End Date <span className="text-sm text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="date"
                        value={semesterViewFilters.end_date}
                        onChange={(e) => setSemesterViewFilters({ ...semesterViewFilters, end_date: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSemesterViewSearch}
                      disabled={loading || !semesterViewFilters.semester}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'View Archives'}
                    </motion.button>
                  </div>
                </div>

                {/* Download & Delete Buttons */}
                {Object.keys(semesterWiseData).length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-blue-200 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Actions</h3>
                        <p className="text-sm text-gray-600">Export or delete filtered attendance records</p>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadArchive('xlsx')}
                          className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          📊 XLSX
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadArchive('csv')}
                          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          📄 CSV
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleDeleteArchive}
                          className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-red-700 flex items-center gap-2 border-2 border-red-700"
                        >
                          🗑️ Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : semesterViewFilters.semester && Object.keys(semesterWiseData).length > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        Semester {semesterViewFilters.semester} - Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm">Total Subjects</p>
                          <p className="text-2xl font-bold text-blue-600">{Object.keys(semesterWiseData).length}</p>
                        </div>
                        <div>
                         
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Attendance Rate</p>
                          <p className="text-2xl font-bold text-green-600">
                            {(
                              (Object.values(semesterWiseData).reduce((sum, subj) => sum + subj.totalPresent, 0) /
                                Object.values(semesterWiseData).reduce((sum, subj) => sum + subj.totalRecords, 0)) *
                              100
                            ).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                  
                    {Object.entries(semesterWiseData).map(([subjectName, data]) => (
                      <motion.div
                        key={subjectName}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{subjectName}</h3>
                            <p className="text-gray-500 text-sm">Semester {selectedSemesterView}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">Present</p>
                            <p className="text-lg font-bold text-green-600">{data.totalPresent}</p>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">Absent</p>
                            <p className="text-lg font-bold text-red-600">{data.totalAbsent}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">Attendance %</p>
                            <p className="text-lg font-bold text-blue-600">
                              {((data.totalPresent / data.totalRecords) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>

                      <div className="mt-4 flex gap-3 items-center">
                          <button
                            onClick={() => {
                              if (openSubject === subjectName) {
                                setOpenSubject(null);
                              } else {
                                fetchSubjectStudents(subjectName);
                              }
                            }}
                            disabled={loading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                          >
                            {openSubject === subjectName ? 'Hide Students' : `View Students `}
                          </button>
                        </div>
                       
                        {openSubject === subjectName && subjectStudents[subjectName] && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                            <h4 className="font-semibold mb-2">Students for {subjectName}</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-white">
                                    <th className="p-2 text-left">Roll</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Present</th>
                                    <th className="p-2 text-left">Absent</th>
                                    <th className="p-2 text-left">Total</th>
                                    <th className="p-2 text-left">%</th>
                                    <th className="p-2 text-left">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subjectStudents[subjectName].map((stu) => (
                                    <tr key={stu.student_roll_number} className="hover:bg-gray-100">
                                      <td className="p-2">{stu.student_roll_number}</td>
                                      <td className="p-2">{stu.student_name}</td>
                                      <td className="p-2">{stu.present}</td>
                                      <td className="p-2">{stu.absent}</td>
                                      <td className="p-2">{stu.total_records}</td>
                                      <td className="p-2">{stu.present_percent}%</td>
                                      <td className="p-2">
                                        <button
                                          onClick={() => fetchStudentDetail(subjectName, stu.student_roll_number)}
                                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                                        >
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : semesterViewFilters.semester ? (
                  <div className="text-center py-12 text-gray-500">
                    No archived records found for Semester {semesterViewFilters.semester}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Please select filters and click "View Archives"
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">View All Archived Records</h2>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Student Roll Number"
                    value={viewFilters.student_roll_number}
                    onChange={(e) => setViewFilters({ ...viewFilters, student_roll_number: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={viewFilters.subject_name}
                    onChange={(e) => setViewFilters({ ...viewFilters, subject_name: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Section Name"
                    value={viewFilters.section_name}
                    onChange={(e) => setViewFilters({ ...viewFilters, section_name: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Semester"
                    value={viewFilters.semester}
                    onChange={(e) => setViewFilters({ ...viewFilters, semester: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={viewFilters.start_date}
                    onChange={(e) => setViewFilters({ ...viewFilters, start_date: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={viewFilters.end_date}
                    onChange={(e) => setViewFilters({ ...viewFilters, end_date: e.target.value })}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => fetchArchives(1)}
                  className="mb-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Apply Filters
                </button>

                {/* Archives Table */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : archives.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No archived records found
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left border">Roll Number</th>
                            <th className="p-3 text-left border">Student Name</th>
                            <th className="p-3 text-left border">Section</th>
                            <th className="p-3 text-left border">Subject</th>
                            <th className="p-3 text-left border">Session Date</th>
                            <th className="p-3 text-left border">Semester</th>
                            <th className="p-3 text-left border">Status</th>
                            <th className="p-3 text-left border">Archived By</th>
                            <th className="p-3 text-left border">Archived At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {archives.map((archive) => (
                            <tr key={archive.id} className="hover:bg-gray-50">
                              <td className="p-3 border">{archive.student_roll_number}</td>
                              <td className="p-3 border">{archive.student_name}</td>
                              <td className="p-3 border">{archive.section_name}</td>
                              <td className="p-3 border">{archive.subject_name}</td>
                              <td className="p-3 border">{new Date(archive.session_date).toLocaleDateString()}</td>
                              <td className="p-3 border">{archive.semester}</td>
                              <td className="p-3 border">
                                <span className={`px-2 py-1 rounded ${archive.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {archive.status_display}
                                </span>
                              </td>
                              <td className="p-3 border">{archive.archived_by_name}</td>
                              <td className="p-3 border">{new Date(archive.archived_at).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => fetchArchives(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => fetchArchives(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentList from './pages/admin/StudentList';
import TeacherList from './pages/admin/TeacherList';
import ParentList from './pages/admin/ParentList';
import ClassList from './pages/admin/ClassList';
import SubjectList from './pages/admin/SubjectList';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import ExamManagement from './pages/admin/ExamManagement';
import FeesManagement from './pages/admin/FeesManagement';
import Announcements from './pages/admin/Announcements';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherGrades from './pages/teacher/TeacherGrades';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherTimetable from './pages/teacher/TeacherTimetable';
import TeacherMessages from './pages/teacher/TeacherMessages';
import TeacherAnnouncements from './pages/teacher/TeacherAnnouncements';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentGrades from './pages/student/StudentGrades';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentMaterials from './pages/student/StudentMaterials';
import StudentAnnouncements from './pages/student/StudentAnnouncements';
import StudentReports from './pages/student/StudentReports';
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentFees from './pages/parent/ParentFees';
import ParentMessages from './pages/parent/ParentMessages';
import ParentAnnouncements from './pages/parent/ParentAnnouncements';
import ParentCalendar from './pages/parent/ParentCalendar';
import Placeholder from './components/Placeholder';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="parents" element={<ParentList />} />
          <Route path="classes" element={<ClassList />} />
          <Route path="subjects" element={<SubjectList />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="exams" element={<ExamManagement />} />
          <Route path="fees" element={<FeesManagement />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Placeholder />} />
        </Route>

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="grades" element={<TeacherGrades />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="timetable" element={<TeacherTimetable />} />
          <Route path="messages" element={<TeacherMessages />} />
          <Route path="announcements" element={<TeacherAnnouncements />} />
          <Route path="*" element={<Placeholder />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="materials" element={<StudentMaterials />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
          <Route path="reports" element={<StudentReports />} />
          <Route path="*" element={<Placeholder />} />
        </Route>

        {/* Parent Routes */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParentDashboard />} />
          <Route path="fees" element={<ParentFees />} />
          <Route path="messages" element={<ParentMessages />} />
          <Route path="announcements" element={<ParentAnnouncements />} />
          <Route path="calendar" element={<ParentCalendar />} />
          <Route path="*" element={<Placeholder />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;


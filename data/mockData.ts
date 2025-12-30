
import { Teacher, Assignment, AcademicYear, DepartmentName, Role } from '../types';

export const mockTeachers: Teacher[] = [
  { id: 't001', name: 'Pu Liana', contact: { phone: '111-222-3333', email: 'liana.p@example.com' }, startYear: 2018, isActive: true, photoUrl: 'https://picsum.photos/id/1005/200/200' },
  { id: 't002', name: 'Jane Smith', contact: { phone: '222-333-4444', email: 'jane.s@example.com' }, startYear: 2015, isActive: true, photoUrl: 'https://picsum.photos/id/1027/200/200' },
  { id: 't003', name: 'Peter Jones', contact: { phone: '333-444-5555', email: 'peter.j@example.com' }, startYear: 2018, isActive: true },
  { id: 't004', name: 'Mary Williams', contact: { phone: '444-555-6666', email: 'mary.w@example.com' }, startYear: 2012, isActive: false, photoUrl: 'https://picsum.photos/id/1012/200/200' },
  { id: 't005', name: 'Pu Thanga', contact: { phone: '555-666-7777', email: 'thanga.p@example.com' }, startYear: 2019, isActive: true },
  { id: 't006', name: 'Sarah Miller', contact: { phone: '666-777-8888', email: 'sarah.m@example.com' }, startYear: 2008, isActive: true, photoUrl: 'https://picsum.photos/id/1013/200/200' },
  { id: 't007', name: 'Michael Davis', contact: { phone: '777-888-9999', email: 'michael.d@example.com' }, startYear: 2022, isActive: true },
  { id: 't008', name: 'Emily Wilson', contact: { phone: '888-999-0000', email: 'emily.w@example.com' }, startYear: 2016, isActive: true, photoUrl: 'https://picsum.photos/id/1011/200/200' },
];

export const mockAssignments: Assignment[] = [
  // Data based on user image
  { id: 'a020', teacherId: 't001', departmentId: DepartmentName.SENIOR, role: Role.TEACHER, academicYear: 2021 },
  { id: 'a021', teacherId: 't001', departmentId: DepartmentName.INTERMEDIATE, role: Role.TEACHER, academicYear: 2020 },
  { id: 'a022', teacherId: 't001', departmentId: DepartmentName.BEGINNER, role: Role.TEACHER, academicYear: 2019 },
  { id: 'a023', teacherId: 't001', departmentId: DepartmentName.BEGINNER, role: Role.TEACHER, academicYear: 2018 },
  { id: 'a024', teacherId: 't005', departmentId: DepartmentName.ADULT, role: Role.TEACHER, academicYear: 2019, remarks: 'Khawbung atanga rawn pem' },
  
  // Current Year Data
  { id: 'a002', teacherId: 't002', departmentId: DepartmentName.SACRAMENT, role: Role.LEADER, academicYear: 2024 },
  { id: 'a003', teacherId: 't003', departmentId: DepartmentName.JUNIOR, role: Role.ASSISTANT_LEADER, academicYear: 2024 },
  { id: 'a005', teacherId: 't006', departmentId: DepartmentName.ADULT, role: Role.LEADER, academicYear: 2024 },
  { id: 'a006', teacherId: 't007', departmentId: DepartmentName.BEGINNER, role: Role.ASSISTANT_LEADER, academicYear: 2024 },
  { id: 'a007', teacherId: 't008', departmentId: DepartmentName.INTERMEDIATE, role: Role.LEADER, academicYear: 2024 },
  { id: 'a008', teacherId: 't008', departmentId: DepartmentName.JUNIOR, role: Role.SECRETARY, academicYear: 2024 },
  { id: 'a012', teacherId: 't005', departmentId: DepartmentName.PRIMARY, role: Role.TEACHER, academicYear: 2024 },
  { id: 'a013', teacherId: 't005', departmentId: DepartmentName.PRIMARY, role: Role.TEACHER, academicYear: 2023 },

  // Previous Years for historical data
  { id: 'a010', teacherId: 't002', departmentId: DepartmentName.INTERMEDIATE, role: Role.LEADER, academicYear: 2023 },
  { id: 'a014', teacherId: 't005', departmentId: DepartmentName.JUNIOR, role: Role.TEACHER, academicYear: 2022 },
  { id: 'a015', teacherId: 't005', departmentId: DepartmentName.JUNIOR, role: Role.TEACHER, academicYear: 2021 },
];

export const mockAcademicYears: AcademicYear[] = [
    { year: 2024, startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31') },
    { year: 2023, startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
    { year: 2022, startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31') },
];
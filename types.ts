
export enum DepartmentName {
  BEGINNER = 'Beginner',
  PRIMARY = 'Primary',
  JUNIOR = 'Junior',
  INTERMEDIATE = 'Intermediate',
  SACRAMENT = 'Sacrament',
  SENIOR = 'Senior',
  ADULT = 'Puitling',
}

export enum Role {
  LEADER = 'Leader',
  ASSISTANT_LEADER = 'Asst. Leader',
  SECRETARY = 'Secretary',
  TEACHER = 'Zirtirtu',
}

export enum UserRole {
    ADMIN = 'Admin',
    DEPARTMENT_HEAD = 'Department Head',
    VIEWER = 'Viewer',
}

export interface Teacher {
  id: string;
  name: string;
  contact: {
    phone: string;
    email?: string;
  };
  photoUrl?: string;
  startYear: number;
  isActive: boolean;
}

export interface Department {
  id: DepartmentName;
  name: string;
  ageGroup: string;
  capacity: number;
  requirements: string[];
}

export interface Assignment {
  id: string;
  teacherId: string;
  departmentId: DepartmentName;
  role: Role;
  academicYear: number;
  remarks?: string;
}

export interface AcademicYear {
  year: number;
  startDate: Date;
  endDate: Date;
}

export type ViewType = 'dashboard' | 'teachers' | 'departments' | 'reports';

export type Action =
  | { type: 'ADD_TEACHER'; payload: Teacher }
  | { type: 'UPDATE_TEACHER'; payload: Teacher }
  | { type: 'ADD_ASSIGNMENT'; payload: Assignment }
  | { type: 'UPDATE_ASSIGNMENT'; payload: Assignment }
  | { type: 'SET_ACADEMIC_YEAR'; payload: number }
  | { type: 'SET_ASSIGNMENTS_FOR_TEACHER'; payload: { teacherId: string; assignments: Omit<Assignment, 'id' | 'teacherId'>[] } };

export interface AppState {
    teachers: Teacher[];
    departments: Department[];
    assignments: Assignment[];
    academicYears: AcademicYear[];
    currentAcademicYear: number;
}
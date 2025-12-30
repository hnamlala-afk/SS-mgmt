
import { Department, DepartmentName } from './types';

export const DEPARTMENTS: Department[] = [
  { id: DepartmentName.BEGINNER, name: 'Beginner', ageGroup: '4-5', capacity: 20, requirements: ['Basic child safety training'] },
  { id: DepartmentName.PRIMARY, name: 'Primary', ageGroup: '6-8', capacity: 25, requirements: ['Curriculum Training Level 1'] },
  { id: DepartmentName.JUNIOR, name: 'Junior', ageGroup: '9-11', capacity: 30, requirements: ['Curriculum Training Level 2'] },
  { id: DepartmentName.INTERMEDIATE, name: 'Intermediate', ageGroup: '12-13', capacity: 30, requirements: ['Mentorship skills'] },
  { id: DepartmentName.SACRAMENT, name: 'Sacrament', ageGroup: '14', capacity: 25, requirements: ['Theology Course 101', 'PCI Membership'] },
  { id: DepartmentName.SENIOR, name: 'Senior', ageGroup: '15-17', capacity: 25, requirements: ['Theology Course 201', 'Advanced Apologetics', 'PCI Membership'] },
  { id: DepartmentName.ADULT, name: 'Puitling', ageGroup: '18+', capacity: 50, requirements: ['PCI Elder Approval'] },
];

export const CURRENT_YEAR = 2024;
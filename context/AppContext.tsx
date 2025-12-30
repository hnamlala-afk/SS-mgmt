
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { AppState, Action, Teacher, Assignment } from '../types';
import { mockTeachers, mockAssignments, mockAcademicYears } from '../data/mockData';
import { DEPARTMENTS, CURRENT_YEAR } from '../constants';

const initialState: AppState = {
  teachers: mockTeachers,
  departments: DEPARTMENTS,
  assignments: mockAssignments,
  academicYears: mockAcademicYears,
  currentAcademicYear: CURRENT_YEAR,
};

const DataContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const dataReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TEACHER':
      return { ...state, teachers: [...state.teachers, action.payload] };
    case 'UPDATE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'ADD_ASSIGNMENT':
        return { ...state, assignments: [...state.assignments, action.payload] };
    case 'UPDATE_ASSIGNMENT':
        return {
            ...state,
            assignments: state.assignments.map((a) => (a.id === action.payload.id ? action.payload : a)),
        };
    case 'SET_ACADEMIC_YEAR':
        return { ...state, currentAcademicYear: action.payload };
    case 'SET_ASSIGNMENTS_FOR_TEACHER': {
      const { teacherId, assignments: newAssignmentsData } = action.payload;
      // Remove all existing assignments for this teacher
      const otherTeacherAssignments = state.assignments.filter(
        (a) => a.teacherId !== teacherId
      );
      // Create full new assignment objects
      const newAssignments = newAssignmentsData.map((a, index) => ({
        ...a,
        id: `a-${teacherId}-${Date.now()}-${index}`, // A more robust unique ID
        teacherId: teacherId,
      }));
      return {
        ...state,
        assignments: [...otherTeacherAssignments, ...newAssignments],
      };
    }
    default:
      return state;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
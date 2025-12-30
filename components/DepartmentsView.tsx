
import React, { useState } from 'react';
import { useData } from '../context/AppContext';
import { Department, Teacher, Assignment } from '../types';
import Card from './ui/Card';

// Teacher Roster Item Component
const TeacherRosterItem: React.FC<{ teacher: Teacher; assignment: Assignment }> = ({ teacher, assignment }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
        <div className="flex items-center">
            <img 
                src={teacher.photoUrl || `https://i.pravatar.cc/150?u=${teacher.id}`} 
                alt={teacher.name} 
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
                <p className="font-semibold text-gray-800">{teacher.name}</p>
                <p className="text-sm text-gray-500">{teacher.contact.email || teacher.contact.phone}</p>
            </div>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-church-blue-100 text-church-blue-800">
            {assignment.role}
        </span>
    </div>
);


const DepartmentsView: React.FC = () => {
    const { state } = useData();
    const { departments, teachers, assignments, currentAcademicYear } = state;
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const getRoster = (departmentId: string): { teacher: Teacher; assignment: Assignment }[] => {
        const departmentAssignments = assignments.filter(a => a.departmentId === departmentId && a.academicYear === currentAcademicYear);
        return departmentAssignments.map(assignment => {
            const teacher = teachers.find(t => t.id === assignment.teacherId);
            return { teacher, assignment };
        }).filter(item => item.teacher).map(item => item as { teacher: Teacher; assignment: Assignment });
    };

    if (selectedDepartment) {
        const roster = getRoster(selectedDepartment.id);
        const capacityFilled = roster.length;
        const capacityPercentage = Math.round((capacityFilled / selectedDepartment.capacity) * 100);

        return (
             <Card>
                <button onClick={() => setSelectedDepartment(null)} className="mb-4 text-church-blue-600 hover:underline">&larr; Department-te list-ah let leh</button>
                <h2 className="text-3xl font-bold text-gray-800">{selectedDepartment.name}</h2>
                <p className="text-lg text-gray-500 mb-4">Kum Bîk: {selectedDepartment.ageGroup}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">A chipchiar</h3>
                        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                           <li><span className="font-semibold">Zat tur:</span> {capacityFilled} / {selectedDepartment.capacity} Zirtirtu</li>
                           <li><span className="font-semibold">Mamawhte:</span> {selectedDepartment.requirements.join(', ')}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Zirtirtu Awm Zat</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-church-blue-600 h-4 rounded-full"
                                style={{ width: `${capacityPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-right text-sm mt-1 font-semibold">{capacityPercentage}% a khat</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Zirtirtu Awm Mekte ({currentAcademicYear})</h3>
                    <div className="space-y-3">
                        {roster.length > 0 ? roster.map(({ teacher, assignment }) => (
                            <TeacherRosterItem key={assignment.id} teacher={teacher} assignment={assignment} />
                        )) : <p className="text-gray-500">He kum atan hian zirtirtu ruat an awm lo.</p>}
                    </div>
                </div>
             </Card>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map(dept => {
                const roster = getRoster(dept.id);
                const capacityPercentage = Math.round((roster.length / dept.capacity) * 100);
                return (
                    <Card key={dept.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedDepartment(dept)}>
                        <h3 className="text-xl font-bold text-church-blue-800">{dept.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Kum {dept.ageGroup}</p>
                        <div className="my-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-600">Zirtirtute</span>
                                <span className="font-semibold">{roster.length} / {dept.capacity}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-church-blue-600 h-2.5 rounded-full" style={{ width: `${capacityPercentage}%` }}></div>
                            </div>
                        </div>
                        <div className="flex -space-x-2 justify-end">
                            {roster.slice(0, 5).map(({ teacher }) => (
                                <img key={teacher.id} src={teacher.photoUrl || `https://i.pravatar.cc/150?u=${teacher.id}`} alt={teacher.name} className="w-8 h-8 rounded-full border-2 border-white object-cover"/>
                            ))}
                            {roster.length > 5 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                    +{roster.length - 5}
                                </div>
                            )}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default DepartmentsView;
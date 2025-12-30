
import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/AppContext';
import { Teacher, Role, DepartmentName, Assignment } from '../types';
import Card from './ui/Card';
import Modal from './ui/Modal';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, PhoneIcon, EnvelopeIcon, XMarkIcon } from './icons';

type FormAssignment = Omit<Assignment, 'id' | 'teacherId'>;

// Teacher Form Component (defined inside TeachersView to keep it self-contained)
const TeacherForm: React.FC<{ teacher?: Teacher; onClose: () => void }> = ({ teacher, onClose }) => {
    const { state, dispatch } = useData();
    const { departments, assignments: allAssignments } = state;

    const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
        name: teacher?.name || '',
        contact: { phone: teacher?.contact.phone || '', email: teacher?.contact.email || '' },
        startYear: teacher?.startYear || new Date().getFullYear(),
        isActive: teacher?.isActive !== undefined ? teacher.isActive : true,
        photoUrl: teacher?.photoUrl || '',
    });
    const [formAssignments, setFormAssignments] = useState<FormAssignment[]>([]);

    useEffect(() => {
        if (teacher) {
            const existingAssignments = allAssignments
                .filter(a => a.teacherId === teacher.id)
                .map(({ id, teacherId, ...rest }) => rest) // Omit id and teacherId
                .sort((a,b) => b.academicYear - a.academicYear);
            setFormAssignments(existingAssignments);
        }
    }, [teacher, allAssignments]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
        } else if (name === 'isActive') {
            setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const teacherId = teacher ? teacher.id : `t${Date.now()}`;
        
        if (teacher) {
            dispatch({ type: 'UPDATE_TEACHER', payload: { ...teacher, ...formData } });
        } else {
            dispatch({ type: 'ADD_TEACHER', payload: { id: teacherId, ...formData } });
        }

        dispatch({
            type: 'SET_ASSIGNMENTS_FOR_TEACHER',
            payload: {
                teacherId,
                assignments: formAssignments,
            },
        });

        onClose();
    };

    const handleAssignmentChange = (index: number, field: keyof FormAssignment, value: string | number) => {
        const updatedAssignments = [...formAssignments];
        updatedAssignments[index] = { ...updatedAssignments[index], [field]: value };
        setFormAssignments(updatedAssignments);
    };

    const handleAddAssignment = () => {
        setFormAssignments(prev => [
            {
                academicYear: state.currentAcademicYear,
                departmentId: departments[0].id,
                role: Role.TEACHER,
                remarks: '',
            },
            ...prev
        ]);
    };

    const handleRemoveAssignment = (index: number) => {
        setFormAssignments(prev => prev.filter((_, i) => i !== index));
    };

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear + 1; year >= 2000; year--) {
            years.push(year);
        }
        return years;
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Zirtirtu Chanchin</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hming Pum</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" name="phone" value={formData.contact.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rawngbawl Tan Kum</label>
                            <input type="number" name="startYear" value={formData.startYear} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Dinhmun</label>
                            <select name="isActive" value={String(formData.isActive)} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm">
                                <option value="true">La thawk mek</option>
                                <option value="false">Thawk tawh lo</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Thlalak URL (a dah loh theih)</label>
                        <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm" />
                    </div>
                </div>
            </div>

            <div>
                 <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Chanvote</h4>
                    <button type="button" onClick={handleAddAssignment} className="flex items-center text-sm px-3 py-1 bg-church-blue-100 text-church-blue-700 rounded-md hover:bg-church-blue-200">
                        <PlusIcon className="w-4 h-4 mr-1"/> Chanvo Dah Belh
                    </button>
                 </div>
                 <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                     {formAssignments.map((assignment, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-md">
                            <div className="col-span-3">
                                <label className="text-xs text-gray-500">Kum</label>
                                <select value={assignment.academicYear} onChange={(e) => handleAssignmentChange(index, 'academicYear', parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm">
                                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                             <div className="col-span-4">
                                <label className="text-xs text-gray-500">Department</label>
                                <select value={assignment.departmentId} onChange={(e) => handleAssignmentChange(index, 'departmentId', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm">
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-3">
                                <label className="text-xs text-gray-500">Chanvo</label>
                                <select value={assignment.role} onChange={(e) => handleAssignmentChange(index, 'role', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm">
                                    {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                             <div className="col-span-2 flex items-end">
                                <button type="button" onClick={() => handleRemoveAssignment(index)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                                    <XMarkIcon className="w-5 h-5"/>
                                </button>
                            </div>
                             <div className="col-span-12">
                                <label className="text-xs text-gray-500">Remarks</label>
                                <input type="text" value={assignment.remarks || ''} onChange={(e) => handleAssignmentChange(index, 'remarks', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-church-blue-500 focus:ring-church-blue-500 sm:text-sm" placeholder="Remarks (optional)..."/>
                            </div>
                        </div>
                     ))}
                 </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Sût leh</button>
                <button type="submit" className="px-4 py-2 bg-church-blue-600 text-white rounded-md hover:bg-church-blue-700">{teacher ? 'Siamtha' : 'Dah luh'}</button>
            </div>
        </form>
    );
};

// Main Teachers View
const TeachersView: React.FC = () => {
    const { state } = useData();
    const { teachers, assignments, departments } = state;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>(undefined);

    const groupedAndFilteredAssignments = useMemo(() => {
        const assignmentsByTeacher: { [key: string]: Assignment[] } = {};
        for (const assignment of assignments) {
            if (!assignmentsByTeacher[assignment.teacherId]) {
                assignmentsByTeacher[assignment.teacherId] = [];
            }
            assignmentsByTeacher[assignment.teacherId].push(assignment);
        }

        return teachers
            .map(teacher => ({
                teacher,
                assignments: (assignmentsByTeacher[teacher.id] || []).sort((a, b) => b.academicYear - a.academicYear)
            }))
            .filter(group => 
                group.assignments.length > 0 && 
                group.teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.teacher.name.localeCompare(b.teacher.name));

    }, [assignments, teachers, searchTerm]);

    const handleAddTeacher = () => {
        setEditingTeacher(undefined);
        setIsFormOpen(true);
    };

    const handleEditTeacher = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setIsFormOpen(true);
    };
    
    const getTeacherAssignments = (teacherId: string) => {
        return assignments.filter(a => a.teacherId === teacherId).sort((a,b) => b.academicYear - a.academicYear);
    };

    const getDepartmentName = (id: DepartmentName) => departments.find(d => d.id === id)?.name || 'Unknown';

    if(selectedTeacher) {
        const teacherAssignments = getTeacherAssignments(selectedTeacher.id);
        const yearsOfService = new Date().getFullYear() - selectedTeacher.startYear;
        return (
            <Card>
                <button onClick={() => setSelectedTeacher(null)} className="mb-4 text-church-blue-600 hover:underline">&larr; Zirtirtute list-ah let leh</button>
                <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-6">
                    <div className="flex-shrink-0 text-center">
                       <img src={selectedTeacher.photoUrl || `https://i.pravatar.cc/150?u=${selectedTeacher.id}`} alt={selectedTeacher.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">{selectedTeacher.name}</h2>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full mt-2 inline-block ${selectedTeacher.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedTeacher.isActive ? 'La thawk mek' : 'Thawk tawh lo'}
                        </span>
                         <button onClick={() => handleEditTeacher(selectedTeacher)} className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm text-church-blue-700 bg-church-blue-100 rounded-md hover:bg-church-blue-200">
                            <PencilIcon className="w-4 h-4 mr-2" /> Chanchin & Chanvo Siamthatna
                        </button>
                    </div>
                    <div className="mt-6 md:mt-0 flex-grow w-full">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Zirtirtu Chanchin</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                            {selectedTeacher.contact.email && <div className="flex items-center text-gray-600"><EnvelopeIcon className="w-5 h-5 mr-2 text-gray-400"/> {selectedTeacher.contact.email}</div>}
                            <div className="flex items-center text-gray-600"><PhoneIcon className="w-5 h-5 mr-2 text-gray-400"/> {selectedTeacher.contact.phone}</div>
                            <div><span className="font-semibold text-gray-500">Rawngbawl Tan Kum:</span> {selectedTeacher.startYear}</div>
                            <div><span className="font-semibold text-gray-500">Rawngbawl Kum Zat:</span> {yearsOfService}</div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-8">Chanvo lo chelh tawhte</h3>
                        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
                           {teacherAssignments.map(assignment => (
                               <div key={assignment.id} className="p-3 bg-gray-50 rounded-md">
                                   <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{assignment.academicYear} - {getDepartmentName(assignment.departmentId)}</p>
                                            {assignment.remarks && <p className="text-xs text-gray-500 mt-1">Remarks: {assignment.remarks}</p>}
                                        </div>
                                        <span className="text-xs font-medium text-church-blue-800 bg-church-blue-100 px-2.5 py-1 rounded-full">{assignment.role}</span>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Hmingin zawnna..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80"
                    />
                </div>
                <button onClick={handleAddTeacher} className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-church-blue-600 text-white rounded-lg hover:bg-church-blue-700 transition-colors">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Zirtirtu Thar Dah Luhna
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">No.</th>
                                <th scope="col" className="px-6 py-3">Hming</th>
                                <th scope="col" className="px-6 py-3">Kum</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedAndFilteredAssignments.map((group, groupIndex) => (
                                <React.Fragment key={group.teacher.id}>
                                    {group.assignments.map((assignment, assignmentIndex) => (
                                        <tr key={assignment.id} className="bg-white border-b hover:bg-gray-50">
                                            {assignmentIndex === 0 && (
                                                <>
                                                    <td rowSpan={group.assignments.length} className="px-6 py-4 font-medium text-gray-700 align-top pt-5">{groupIndex + 1}</td>
                                                    <td rowSpan={group.assignments.length} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap align-top pt-5">
                                                        <button onClick={() => setSelectedTeacher(group.teacher)} className="font-semibold text-church-blue-600 hover:underline text-left">
                                                            {group.teacher.name}
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                            <td className="px-6 py-4">{assignment.academicYear}</td>
                                            <td className="px-6 py-4">
                                                {getDepartmentName(assignment.departmentId)}
                                                {assignment.role !== Role.TEACHER && ` (${assignment.role})`}
                                            </td>
                                            <td className="px-6 py-4">{assignment.remarks || ''}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingTeacher ? 'Zirtirtu Chanchin Siamthatna' : 'Zirtirtu Thar Dah Luhna'}>
                <TeacherForm teacher={editingTeacher} onClose={() => setIsFormOpen(false)} />
            </Modal>
        </div>
    );
};

export default TeachersView;
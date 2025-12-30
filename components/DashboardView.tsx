
import React, { useState } from 'react';
import { useData } from '../context/AppContext';
import Card from './ui/Card';
import { UsersIcon, BuildingLibraryIcon, CalendarIcon, MagnifyingGlassIcon } from './icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DepartmentName, Teacher, Assignment } from '../types';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
    </Card>
);

const AnniversaryItem: React.FC<{ teacher: Teacher, years: number }> = ({ teacher, years }) => (
    <div className="flex items-center py-3 border-b last:border-b-0">
        <img src={teacher.photoUrl || `https://i.pravatar.cc/150?u=${teacher.id}`} alt={teacher.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="ml-4 flex-grow">
            <p className="font-semibold text-gray-800">{teacher.name}</p>
            <p className="text-sm text-gray-500">Kum {years} a tlin lawmpuina</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-400">Kum {teacher.startYear} atangin</p>
        </div>
    </div>
);


const DashboardView: React.FC = () => {
    const { state } = useData();
    const { teachers, departments, assignments, currentAcademicYear } = state;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<{ teacher: Teacher; assignments: Assignment[] } | null>(null);
    const [notFound, setNotFound] = useState(false);

    const activeTeachers = teachers.filter(t => t.isActive);
    const currentAssignments = assignments.filter(a => a.academicYear === currentAcademicYear);

    const departmentData = departments.map(dept => {
        const teachersInDept = currentAssignments.filter(a => a.departmentId === dept.id).length;
        return {
            name: dept.name,
            'Zirtirtute': teachersInDept,
            'Zat tur': dept.capacity,
        };
    });
    
    const serviceAnniversaries = teachers
        .map(t => ({ teacher: t, years: new Date().getFullYear() - t.startYear }))
        .filter(item => [5, 10, 15, 20, 25].includes(item.years))
        .sort((a, b) => b.years - a.years);
        
    const getDepartmentName = (id: DepartmentName) => departments.find(d => d.id === id)?.name || 'Unknown';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setSearchResult(null);
            setNotFound(false);
            return;
        }

        const foundTeacher = teachers.find(t => t.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

        if (foundTeacher) {
            const teacherAssignments = assignments
                .filter(a => a.teacherId === foundTeacher.id)
                .sort((a, b) => b.academicYear - a.academicYear);
            
            setSearchResult({ teacher: foundTeacher, assignments: teacherAssignments });
            setNotFound(false);
        } else {
            setSearchResult(null);
            setNotFound(true);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Zirtirtu Rawngbawl Dan Enna</h3>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Zirtirtu hming chhu rawh..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <button type="submit" className="px-6 py-2 bg-church-blue-600 text-white rounded-lg hover:bg-church-blue-700 transition-colors">
                        Zawng rawh
                    </button>
                </form>
                {searchResult && (
                    <div className="mt-6">
                        <div className="flex items-center gap-4">
                            <img src={searchResult.teacher.photoUrl || `https://i.pravatar.cc/150?u=${searchResult.teacher.id}`} alt={searchResult.teacher.name} className="w-16 h-16 rounded-full object-cover"/>
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{searchResult.teacher.name}</h4>
                                <p className="text-gray-500">Rawngbawl tan kum {searchResult.teacher.startYear}</p>
                            </div>
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <h5 className="font-semibold mb-2 text-gray-700">Rawngbawl Dan:</h5>
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {searchResult.assignments.map(assignment => (
                                    <li key={assignment.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                        <div>
                                            <span className="font-semibold text-gray-700">{assignment.academicYear}</span>
                                            <p className="text-sm text-gray-600">{getDepartmentName(assignment.departmentId)}</p>
                                        </div>
                                        <span className="text-sm font-medium text-church-blue-800 bg-church-blue-100 px-2.5 py-1 rounded-full">
                                            {assignment.role}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {notFound && (
                    <p className="mt-6 text-center text-gray-500 py-4">He hming pu zirtirtu hmuh an awm lo.</p>
                )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<UsersIcon className="w-6 h-6 text-white"/>} title="Zirtirtu la thawk mekte" value={activeTeachers.length} color="bg-church-blue-500" />
                <StatCard icon={<BuildingLibraryIcon className="w-6 h-6 text-white"/>} title="Department-te" value={departments.length} color="bg-green-500"/>
                <StatCard icon={<CalendarIcon className="w-6 h-6 text-white"/>} title="Chanvo Kengkawhtute" value={currentAssignments.length} color="bg-yellow-500"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Chanvo ({currentAcademicYear})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={departmentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6B7280' }} interval={0} angle={-20} textAnchor="end" height={60} />
                            <YAxis tick={{ fill: '#6B7280' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Zirtirtute" fill="#3b82f6" />
                            <Bar dataKey="Zat tur" fill="#dbeafe" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Rawngbawl Kum Tlin Lawmna</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {serviceAnniversaries.length > 0 ? serviceAnniversaries.map(item => (
                            <AnniversaryItem key={item.teacher.id} teacher={item.teacher} years={item.years} />
                        )) : <p className="text-gray-500 text-center py-4">Kuminah lawm tur kum tling an awm lo.</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardView;
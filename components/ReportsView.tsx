
import React, { useMemo } from 'react';
import { useData } from '../context/AppContext';
import { DepartmentName } from '../types';
import Card from './ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const ReportsView: React.FC = () => {
    const { state } = useData();
    const { teachers, assignments, currentAcademicYear } = state;

    const teacherServiceData = useMemo(() => {
        return teachers.map(t => {
            const serviceYears = new Date().getFullYear() - t.startYear;
            let bracket = '';
            if (serviceYears <= 2) bracket = 'Kum 0-2';
            else if (serviceYears <= 5) bracket = 'Kum 3-5';
            else if (serviceYears <= 10) bracket = 'Kum 6-10';
            else bracket = 'Kum 10 chuang';
            return { ...t, serviceYears, bracket };
        });
    }, [teachers]);

    const serviceTenureDistribution = useMemo(() => {
        const brackets = { 'Kum 0-2': 0, 'Kum 3-5': 0, 'Kum 6-10': 0, 'Kum 10 chuang': 0 };
        teacherServiceData.forEach(t => {
            if (t.isActive) {
                brackets[t.bracket]++;
            }
        });
        return Object.entries(brackets).map(([name, value]) => ({ name, value }));
    }, [teacherServiceData]);

    const activeAssignments = assignments.filter(a => a.academicYear === currentAcademicYear);
    const departmentDistribution = useMemo(() => {
        const counts: { [key in DepartmentName]?: number } = {};
        activeAssignments.forEach(a => {
            counts[a.departmentId] = (counts[a.departmentId] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [activeAssignments]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Report & Chikna</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Zirtirtu Rawngbawl Rei Zawng</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={serviceTenureDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {serviceTenureDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Department-a Chanvo Insem Dan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                         <PieChart>
                            <Pie
                                data={departmentDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label
                            >
                                {departmentDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
            
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Zirtirtu Rawngbawl Report</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Hming</th>
                                <th scope="col" className="px-6 py-3">Tan Kum</th>
                                <th scope="col" className="px-6 py-3">Rawngbawl Kum Zat</th>
                                <th scope="col" className="px-6 py-3">Dinhmun</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherServiceData.sort((a,b) => b.serviceYears - a.serviceYears).map(teacher => (
                                <tr key={teacher.id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{teacher.name}</th>
                                    <td className="px-6 py-4">{teacher.startYear}</td>
                                    <td className="px-6 py-4">{teacher.serviceYears}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${teacher.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {teacher.isActive ? 'La thawk mek' : 'Thawk tawh lo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ReportsView;
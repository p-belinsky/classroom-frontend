export const DEPARTMENTS = [
    'CS',
    'Math',
    'English'
];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept)=> ({
    value: dept,
    label: dept
}))

export const MOCK_SUBJECTS = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "An introductory course covering the fundamentals of computer science and programming.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus II",
        department: "Math",
        description: "Detailed study of integration, sequences, series, and multivariable calculus.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        code: "ENG102",
        name: "English Composition",
        department: "English",
        description: "Development of critical thinking and writing skills through the study of literature.",
        createdAt: new Date().toISOString()
    }
];
const startServer = require('../data/database.js');

class Student {
    constructor(id) {
        this.id = id;
        this.name = null;
        this.programme = null;
        this.modules = [];
    }

    async getStudentName() {
        try {
            const connection = await startServer();
            const [rows, fields] = await connection.execute('SELECT name FROM students WHERE id = ?', [this.id]);
            if (rows.length > 0) {
                this.name = rows[0].name;
                return this.name;
            } else {
                throw new Error('Student not found');
            }
        } catch (error) {
            throw new Error(`Error fetching student name: ${error.message}`);
        }
    }

    async getStudentProgramme() {
        try {
            const connection = await startServer();
            const [rows, fields] = await connection.execute('SELECT programmes.name AS programme FROM students INNER JOIN programmes ON students.programme_id = programmes.id WHERE students.id = ?', [this.id]);
            if (rows.length > 0) {
                this.programme = rows[0].programme;
                return this.programme;
            } else {
                throw new Error('Student not found');
            }
        } catch (error) {
            throw new Error(`Error fetching student programme: ${error.message}`);
        }
    }
    
    async getStudentModules() {
        try {
            const connection = await startServer();
            const [rows, fields] = await connection.execute('SELECT modules.* FROM student_modules INNER JOIN modules ON student_modules.module_id = modules.id WHERE student_modules.student_id = ?', [this.id]);
            if (rows.length > 0) {
                this.modules = rows;
                return this.modules;
            } else {
                throw new Error('No modules found for the student');
            }
        } catch (error) {
            throw new Error(`Error fetching student modules: ${error.message}`);
        }
    }
}

module.exports = {
    Student
};

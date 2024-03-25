const { Student } = require('../model/student.js');

class StudentController {
    async getStudentById(req, res) {
        try {
            const studentId = req.params.id;
            const student = new Student(studentId);
            await student.getStudentName(); // Fetch student name
            await student.getStudentProgramme(); // Fetch student programme
            await student.getStudentModules(); // Fetch student modules
            console.log(student);
            res.json(student, {student:student});
        } catch (error) {
            // Custom error handling based on error type
            if (error instanceof SyntaxError) {
                res.status(400).json({ error: "Invalid request syntax" });
            } else if (error.code === 'ENOENT') {
                res.status(404).json({ error: "Student not found" });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    // Add more controller methods as needed...
}

module.exports = { StudentController };


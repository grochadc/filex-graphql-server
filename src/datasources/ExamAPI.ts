import { DataSource } from "apollo-datasource";
import englishExam from "./data/exam_questions/en";
import frenchExam from "./data/exam_questions/fr";

class ExamAPI extends DataSource {
  getSection(course, level) {
    console.log("Getting questions for course ", course);
    if (course === "en") {
      return {
        totalSections: englishExam.sections.length,
        questions: englishExam.sections[level - 1].questions,
      };
    }
    if (course === "fr") {
      return {
        totalSections: frenchExam.sections.length,
        questions: frenchExam.sections[level - 1].questions,
      };
    } else {
      throw Error("That course doesn`t exist");
    }
  }
}
export { ExamAPI };

import { Candidate } from 'src/infrastructure/schemas/candidate.schema';
const fs = require('fs');
const pdf = require('pdf-parse');
var mammoth = require('mammoth');

export const ExtractPdf = async (file) => {
    let content = '';
    let dataBuffer = fs.readFileSync(file.path);
    content = await pdf(dataBuffer).then(function (data) {
        return data.text;
    });
    return content;
};

export const ExtractDocx = async (file) => {
    let content = await mammoth.extractRawText({ path: file.path }).then((result) => {
        return result.value;
    });
    return content;
};

function readFullname(text) {
    const nameRegex = /(?<=Fullname ).*/i;
    const nameMatch = text.match(nameRegex);
    const fullName = nameMatch ? nameMatch[0] : '';
    return fullName.replace('Fullname', '').trim();
}

function readPhone(text) {
    const phoneNumberRegex = /((\+|00)84|0)[1-9]\d{7,9}/g;
    const phoneMatches = text.match(phoneNumberRegex);
    const phone = phoneMatches ? phoneMatches[0] : '';
    return phone;
}

function readEmail(text) {
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gim;
    const emailMatches = text.match(emailRegex);
    const email = emailMatches ? emailMatches[0] : '';
    return email;
}
function readIntroduce(text) {
    const descriptionRegex = /(?<=DESCRIPTION)[\s\S]*?(?=EDUCATION)/i;
    const descriptionMatch = text.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[0].trim() : '';
    return description;
}

function readAddress(text) {
    const addressRegex = /Address\s*([\w\s,]+)/i;
    const addressMatch = text.match(addressRegex);
    const address = addressMatch ? addressMatch[0].trim() : '';
    return address.replace('Address', '').trim();
}
function readGender(text) {
    const genderRegex = /Gender\s*([\w-]+)/i;
    const genderMatch = text.match(genderRegex);
    const gender = genderMatch ? genderMatch[0] : '';
    return gender.replace('Gender', '').trim();
}
function readDob(text) {
    const dobRegex = /Date of birth\s*([\w\s,]+)/i;
    const dobMatch = text.match(dobRegex);
    const dob = dobMatch ? dobMatch[0] : '';
    return dob.replace('Date of birth', '').trim();
}
function readSkill(text) {
    const programmingLanguagesRegex =
        /\.Net|NodeJs|Javascript|JavaScript|Java|Python|C#|PHP|C\+\+|Ruby|Swift|Objective-C|TypeScript|Go|Angular|SQL|Sql/gi;
    const dobMatch = text.match(programmingLanguagesRegex);
    const skill = dobMatch ? dobMatch[0] : '';
    return skill;
}
export function convertData(text): Candidate {
    const candidate = new Candidate();

    candidate.name = readFullname(text);
    candidate.phone_number = readPhone(text);
    candidate.email = readEmail(text);
    candidate.address = readAddress(text);
    candidate.introduce = readIntroduce(text);
    candidate.dob = readDob(text);
    candidate.gender = readGender(text);

    candidate.educations = '';
    candidate.work_experiences = '';
    candidate.projects = '';
    candidate.cv_skill = readSkill(text);

    candidate.avatar = '';
    candidate.isInterview = false;
    candidate.interview_by = null;
    candidate.interview_date = null;
    candidate.cv_file_path = '';
    candidate.cv_file_name = '';
    candidate.notes = '';
    candidate.educations = '[]';
    candidate.work_experiences = '[]';
    candidate.projects = '[]';
    candidate.cv_skill = '[]';
    return candidate;
}

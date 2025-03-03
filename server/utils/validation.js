import validator from "validator";

export const ValidateLoginData = (req) => {
    const {email, password} = req.body;
    if(!email?.trim() || !password?.trim()) {
        throw new Error("Invalid email or password");
    } else if(!validator.isEmail(email)) {
        throw new Error("Invalid email or password");
    }
}

export const validateSignUpData = (req) => {
    const { userName, email, password, confirmPassword } = req.body;
    if(!userName?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
        throw new Error("Fill every detail!");
    } else if(password !== confirmPassword) {
        throw new Error("Enter confirm password correctly!");
    } else if(!validator.isEmail(email)) {
        throw new Error("Enter valid email!");
    }
}

export const validateAddEducationDetails = (req) => {
    const {institution, degree, fieldOfStudy, startYear, endYear} = req.body;
    if(!institution?.trim() || !degree?.trim() || !fieldOfStudy?.trim() || !startYear?.trim() || !endYear?.trim()) {
        throw new Error("Fill every detail!");
    }
}

export const validateAddExperienceDetails = (req) => {
    const {company, jobTitle, startDate, endDate} = req.body;
    if(!company?.trim() || !jobTitle?.trim() || !startDate?.trim() || !endDate?.trim()) {
        throw new Error("Fill every detail!");
    }
}

export const validateSkillDetails = (req) => {
    const {skill} = req.body;
    if(!skill?.trim()) {
        throw new Error("Fill every detail!");
    }
}


export const validatePostExperience = (req) => {
    const {company, role, hiringMode, roundsDescription, difficulty, offerStatus} = req.body;
    if(!company?.trim() || !role?.trim() || !hiringMode?.trim() || !roundsDescription?.trim() || !difficulty?.trim() || !offerStatus?.trim()) {
        throw new Error("Fill every detail!");
    }
}

export const validatePostJob = (req) => {
    const {role, description, location, salary, jobType, skills} = req.body;
    if(!role?.trim() || !description?.trim() || !location?.trim() || !salary?.trim() || !jobType?.trim() || !skills?.trim()) {
        throw new Error("Fill every detail!");
    }
}

export const jobApplyDetails = (req) => {
    const {jobPostId, status, marks, scored, cutOff} = req.body;
    if(!jobPostId?.trim() || !status?.trim() || !marks?.trim() || !scored?.trim() || !cutOff?.trim()) {
        throw new Error("Fill every detail!");
    }
}
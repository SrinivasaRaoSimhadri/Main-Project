import mongoose from "mongoose";
const JobPostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    applications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    closeHiring: {
        type: Boolean,
        default: false
    },
    questions: {
        type: 
        [   
            {
                question: { 
                    type: String, 
                    required: true,
                    trim: true 
                },
                A: { 
                    type: String, 
                    required: true,
                    trim: true 
                },
                B: { 
                    type: String, 
                    required: true,
                    trim: true 
                },
                C: { 
                    type: String, 
                    required: true,
                    trim: true 
                },
                D: { 
                    type: String, 
                    required: true,
                    trim: true 
                },
                answer: { 
                    type: String, 
                    required: true,
                    trim: true,
                    validate: {
                        validator: function (value) {
                            return ["A", "B", "C", "D"].includes(value);
                        },
                        message: "Correct option must match one of the provided options."
                    }
                }
            }
        ],
        required: true,
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length >= 5;
            },
            message: "Add at least 5 questions."
        }
    },
    cutoffMarks: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0 && value <= this.questions.length;
            },
            message: function () {
                return `Cutoff marks should be between 1 and ${this.questions?.length}.`;
            }
        }  
    }
}, {
    timestamps: true
});

const JobPost = mongoose.models.JobPost || mongoose.model("JobPost", JobPostSchema);
export default JobPost;
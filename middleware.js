const validateMember = (req, res, next) => {
    const { member } = req.body;
    console.log(member);
    // check first name is not empty

    // check last name is not empty

    // check dob is a date

    // check address is not empty

    // check postcode regex

    // check contact is not empty

    // check phone is length of 11, and only numbers

    // check ehtinicity is in ethnincities

    // check gender is in genders

    // check laanguage in languages

    // check school in schools


    next();
}

/*
    gender: {
        type: String,
        required: true,
        enum: data.selections.genders
    },
    language: {
        type: String,
        required: true,
        enum: data.selections.languages
    },
    religion: {
        type: String,
        required: true,
        enum: data.selections.religions
    },
    school: {
        type: String,
        required: true,
        enum: data.selections.schools
    },
    medical: {
        type: String,
    },
    diet: {
        type: String
    },
    lastVisit: {
        type: Date
    },
    dateJoined: {
        type: Date
    }
 */
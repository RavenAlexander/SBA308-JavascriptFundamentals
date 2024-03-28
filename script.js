// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  //This is where my code begins
  const t = true;

  do {
    
    console.log("Welcome! Here you will find information about Learners by their IDs.");
  } while (!t); //This runs once and I'm ok with that.

  function getLearnerData(course, assignment_group, submissions) {
    
    try { //This checks to see if assignment_group.course_id matches course.id, if it doesn't, it catches an error
    if (assignment_group.course_id !== course.id) {
      throw error ("Error! Courses do not match");} }
      catch (err) {
        console.log(err);
    } 
  

    let seenLearnerIds = []; // This creates a new array of learner ids that keep track of if the learner id has been stored into the result array
    let result = []; // This creates a new array of results with all learner data

    for (const s of submissions) { //For every current iteration of submissions
      if (seenLearnerIds.includes(s.learner_id)) { // If seenLearner_ids includes the learner id of the current iteration...
        continue;
      } else {
        let currentStudent = { //create new variable object
          course: course.id, //pull course id from parameter "course"
          id: s.learner_id // pulls the learner id from current iteration of parameter "submissions"
        }
        const filteredSubmissions = submissions.filter((x) => x.learner_id === s.learner_id); //This filters through learner submissions, it returns a subset of submissions where x.learner_id matches s.learner_id
        let totalPossibleScore = 0;
        let totalScore = 0; 
        for (const fs of filteredSubmissions) { //for every current iteration of "filteredSubmissions", we want to:
          const filteredAssignments = assignment_group.assignments.filter((a) => a.id === fs.assignment_id) //create a new variable that filters through the assignment id of assignment_group and saves it
          
          if (filteredAssignments.length <= 0 || filteredAssignments[0].due_at >= "2024-03-26") { // If the length of filteredAssignments is less than or equal to 0, or if the assignment is due at a date later than March 26 2024...
            continue; //skip that assignment
          } else {
            const assignment = filteredAssignments[0] //create variable for assignment starting at the first index of filteredAssignments

          // What if points_possible is 0?     
            if (assignment.points_possible <= 0) {
              console.error("Skipping assignment " + assignment.id + " which has invalid possible points: " + assignment.points_possible); //This will skip that assignment in such case
              continue;
            }
            if (assignment.id in currentStudent) {
              console.error("Skipping assignment " + assignment.id + " as it was already processed"); // This prevents duplicate assignment ids to be added to the result array
              continue;
            }
            let score = fs.submission.score;  // variable score keeps track of the submission score from the current iteration of "fs"
          
            if (assignment.due_at < fs.submission.submitted_at) { // if the learner's submission is late, 10% will be deducted from the score
              score -= 0.1 * assignment.points_possible;
            }

            totalScore += score;  //Add the iteration of "fs" of "submission score" to the Total Score variable
            totalPossibleScore += assignment.points_possible; // Add the number of points possible to the Total Possible Score variable
            currentStudent [fs.assignment_id] = score / assignment.points_possible; // This adds the property fs.assignment_id to the currentStudent object now that we know the updated values of score and assignment.points_possible
          }
        }
        currentStudent.avg = totalScore / totalPossibleScore; // "avg" stands for average, this divides the learner's score from the total possible score. The property "avg" is added to currentStudent (if it does not already exist)
        result.push(currentStudent) // This adds all the info of currentStudent to the result array
        seenLearnerIds.push(s.learner_id); //This adds all the info of each unique learner id into seenLearner_ids to mark it as "seen" so the same info doesn't get re-added over and over 
      }
    }

    return result; // returns the data of result array, now that data has been added to it
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);

    
// -------------

            //Example result provided at the start
        // const result = [
        //   {
        //     id: 125,
        //     avg: 0.985, // (47 + 150) / (50 + 150)
        //     1: 0.94, // 47 / 50
        //     2: 1.0, // 150 / 150
        //   },
        //   {
        //     id: 132,
        //     avg: 0.82, // (39 + 125) / (50 + 150)
        //     1: 0.78, // 39 / 50
        //     2: 0.833, // late: (140 - 15) / 150
        //   },
        // ];
      
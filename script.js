// // // // Employ basic JavaScript syntax accurately.
// // // // Implement control flow structures such as conditionals and loops effectively.
// // // // Use arrays and objects to organize and manage data.
// // // // Develop functions to create reusable code.
// // // // Utilize loops and iteration to navigate through data collections.
// // // // Implement error handling to manage potential code failures gracefully.

// // // You will create a script that gathers data, processes it, and then outputs a consistent result as
// //  described by a specification. This is a very typical situation in industry, and this particular 
// //  scenario has been modified from a real application. The data you will use is provided below.

// Your goal is to analyze and transform this data such that the output of your program is an array
//  of objects, each containing the following information in the following format:

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
  

  function getLearnerData(course, assignment_group, submissions) {
    
    // here, we would process this data to achieve the desired result.
    //This is where the assignment technically begins
    //Use map and filter methods to iterate through AssignmentGroup and LearnerSubmissions for data
    //create new arrays for data

    //Check to see if AssignmentGroup matches course_id, if it doesn't, throw an error (if statement)
    if (assignment_group.course_id !== course.id) {
      throw error ("Error! Courses do not match");
    } 

    let seenLearnerIds = []; // This creates a new array of learner ids that keep track of if the learner id has been stored into the result array
    let result = []; // This creates a new array of results with all learner data
    let i = 0;

    for (const s of submissions) { //For every iteration of submissions
      if (seenLearnerIds.includes(s.learner_id)) { // If seenLearner_ids does not include the learner id of the current iteration...
        continue;
      } else {
        let currentStudent = { //create new variable object
          course: course.id, //pull course id from parameter "course"
          id: s.learner_id // pulls the learner id from current iteration of parameter "submissions"
        }
        const filteredSubmissions = submissions.filter((x) => x.learner_id === s.learner_id); //This filters through learner submissions, it returns a subset of submissions where x.learner_id matches s.learner_id
        let totalPossibleScore = 0;
        let totalScore = 0; 
        for (const fs of filteredSubmissions) { //for every iteration of "filteredSubmissions", we want to:
          const filteredAssignments = assignment_group.assignments.filter((a) => a.id === fs.assignment_id) //create a new variable that filters the assignment group. Idk how to describe this
          
          if (filteredAssignments.length <= 0 || filteredAssignments[0].due_at >= "2024-03-26") {
            continue;
          } else {
            const assignment = filteredAssignments[0]
            if (assignment.points_possible <= 0) {
              console.error("Skipping assignment " + assignment.id + " which has invalid possible points: " + assignment.points_possible);
              continue;
            }
            if (assignment.id in currentStudent) {
              console.error("Skipping assignment " + assignment.id + " as it was already processed");
              continue;
            }
            let score = fs.submission.score; 
            //if the learner's submission is late, 10% will be deducted from the score
            if (assignment.due_at < fs.submission.submitted_at) {
              score -= 0.1 * assignment.points_possible;
            }

            totalScore += score;  //Add the iteration of "fs" of "submission score" to the Total Score variable
            totalPossibleScore += assignment.points_possible; // Add the number of points possible to the Total Possible Score variable
            currentStudent [fs.assignment_id] = score / assignment.points_possible; //help explain this. why does currentStudent change. It takes a value from "submissions" and manipulates it but I don't know how this is added to the original variable
          }
        }
        currentStudent.avg = totalScore / totalPossibleScore; // "avg" stands for average, this calculates the learner's score from the total possible score. But I don't understand how this value is added to the original variable
        result.push(currentStudent) // This adds the info of currentStudent to the result array
        seenLearnerIds.push(s.learner_id); //This adds the info of each learner id into seenLearner_ids to mark it as "seen" so the same info doesn't get re-added over and over 
      }
    }

    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  
    //    To do:     
    // Use strings, numbers, and Boolean values cached within variables
    // Utilize at least two different types of loops.
  
    // Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.

    //If an assignment is not yet due, do not include it in the results or the average.(skip past the iteration)
    //     
        
    //     if (assignment_group.due_at > "2024-01-01") {
    //         //skip it
    //     } else {
    //         console.log("excluded 1 submission not due");
    //     }
    
    
    // //     You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
    // // Use try/catch and other logic to handle these types of errors gracefully.
    //     try {
    //         (filteredAssignments[0].points_possible == 0)
    //     } catch (error) {
    //         "Error! Cannot divide by zero"
    //     }
    


            //Example result provided by the assignment
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
      
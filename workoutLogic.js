function validateWorkout(workout) {
    return (
        typeof workout.exercise === "string" &&
        workout.exercise.trim() !== "" &&
        Number.isInteger(workout.sets) &&
        workout.sets >= 1 &&
        workout.sets <= 20 &&
        Number.isInteger(workout.reps) &&
        workout.reps >= 1 &&
        workout.reps <= 50 &&
        Number.isFinite(workout.weight) &&
        workout.weight >= 0 &&
        workout.weight <= 500 &&
        typeof workout.date === "string" &&
        workout.date.trim() !== ""
    );
}


function updateWorkout(workouts, index, updatedWorkout) {
    if (!Number.isInteger(index) ||
        index < 0 ||
        index >= workouts.length) {
        throw new Error("Workout not found.");
    }

    const updatedWorkouts = [...workouts];
    updatedWorkouts[index] = updatedWorkout;

    return updatedWorkouts;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { updateWorkout, validateWorkout };
}

if (typeof window !== "undefined") {
    window.updateWorkout = updateWorkout;
    window.validateWorkout = validateWorkout;
}
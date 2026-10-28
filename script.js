
console.log("FitnessWatcher JavaScript is working!");

const workoutForm = document.getElementById("workoutForm");
const exerciseDropdown = document.getElementById("exercise");
const customExercise = document.getElementById("customExercise");

exerciseDropdown.addEventListener("change", function () {
    if (exerciseDropdown.value === "Other") {
        customExercise.style.display = "block";
        customExercise.required = true;
    } else {
        customExercise.style.display = "none";
        customExercise.required = false;
        customExercise.value = "";
    }
});

workoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const exercise = exerciseDropdown.value === "Other"
        ? customExercise.value.trim()
        : exerciseDropdown.value;

    const sets = Number(document.getElementById("sets").value);
    const reps = Number(document.getElementById("reps").value);
    const weight = Number(document.getElementById("weight").value);
    const date = document.getElementById("date").value;

    if (!exercise) {
        alert("Please enter an exercise name.");
        return;
    }

    if (sets < 1 || sets > 20 ||
        reps < 1 || reps > 50 ||
        weight < 0 || weight > 500) {
        alert("Please enter valid sets, reps, and weight.");
        return;
    }

    const workout = {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        date: date
    };

    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workouts.push(workout);

    localStorage.setItem("workouts", JSON.stringify(workouts));

    alert("Workout saved successfully!");

    displayWorkouts();

    workoutForm.reset();
    customExercise.style.display = "none";
    customExercise.required = false;
});

function displayWorkouts() {
    const workoutList = document.getElementById("workoutList");
    const emptyMessage = document.getElementById("emptyMessage");

    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workoutList.innerHTML = "";

    if (workouts.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";

        workouts.forEach(function(workout) {
            const listItem = document.createElement("li");

            listItem.textContent =
                workout.exercise +
                " | Sets: " + workout.sets +
                " | Reps: " + workout.reps +
                " | Weight: " + workout.weight + " lbs" +
                " | Date: " + workout.date;

            workoutList.appendChild(listItem);
        });
    }
}

displayWorkouts();

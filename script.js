
console.log("FitnessWatcher JavaScript is working!");

const workoutForm = document.getElementById("workoutForm");
const exerciseDropdown = document.getElementById("exercise");
const customExercise = document.getElementById("customExercise");
let editingWorkoutIndex = null;

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

    if (editingWorkoutIndex !== null) {
    if (editingWorkoutIndex < 0 || editingWorkoutIndex >= workouts.length) {
        alert("Workout not found.");
        return;
    }

    workouts[editingWorkoutIndex] = workout;
    alert("Workout updated successfully!");
    } else {
    workouts.push(workout);
    alert("Workout saved successfully!");
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));

editingWorkoutIndex = null;


    displayWorkouts();

    workoutForm.reset();
    customExercise.style.display = "none";
    customExercise.required = false;
});


function editWorkout(index) {
    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    console.log("Editing workout index:", editingWorkoutIndex); 
    const workout = workouts[index];

    if (!workout) {
        alert("Workout not found.");
        return;
    }

    editingWorkoutIndex = index;

    const exerciseSelect = document.getElementById("exercise");
    const customExercise = document.getElementById("customExercise");

    const exerciseExists = Array.from(exerciseSelect.options).some(function(option) {
        return option.value === workout.exercise;
    });

    if (exerciseExists) {
        exerciseSelect.value = workout.exercise;
        customExercise.value = "";
    } else {
        exerciseSelect.value = "Other";
        customExercise.value = workout.exercise;
    }

    exerciseSelect.dispatchEvent(new Event("change"));

    document.getElementById("sets").value = workout.sets;
    document.getElementById("reps").value = workout.reps;
    document.getElementById("weight").value = workout.weight;
    document.getElementById("date").value = workout.date;

    document.getElementById("workoutForm").scrollIntoView({
        behavior: "smooth"
    });
}


function displayWorkouts() {
    const workoutList = document.getElementById("workoutList");
    const emptyMessage = document.getElementById("emptyMessage");

    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workoutList.innerHTML = "";

    if (workouts.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";

        workouts.forEach(function(workout, index) {
            const listItem = document.createElement("li");

            const workoutText = document.createElement("span");

            workoutText.textContent =
                workout.exercise +
                " | Sets: " + workout.sets +
                " | Reps: " + workout.reps +
                " | Weight: " + workout.weight + " lbs" +
                " | Date: " + workout.date;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.type = "button";

            editButton.addEventListener("click", function() {
            editWorkout(index);
            });

            listItem.appendChild(workoutText);
            listItem.appendChild(editButton);

            workoutList.appendChild(listItem);
        });
    }
}

displayWorkouts();

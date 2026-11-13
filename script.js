console.log("FitnessWatcher JavaScript is working!");

const workoutForm = document.getElementById("workoutForm");
const exerciseDropdown = document.getElementById("exercise");
const customExercise = document.getElementById("customExercise");
let editingWorkoutIndex = null;

const workoutStorage = {
    getAll: function() {
        return JSON.parse(localStorage.getItem("workouts")) || [];
    },

    saveAll: function(workouts) {
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }
};

function getWorkouts(storage = workoutStorage) {
    return storage.getAll();
}

function saveWorkouts(workouts, storage = workoutStorage) {
    storage.saveAll(workouts);
}

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

    const workout = {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        date: date
    };

    if (!validateWorkout(workout)) {
        alert("Please enter valid workout information.");
        return;
    }

    const workouts = getWorkouts();

    let updatedWorkouts;

    if (editingWorkoutIndex !== null) {
        try {
        updatedWorkouts = updateWorkout(
            workouts,
            editingWorkoutIndex,
            workout
        );

        alert("Workout updated successfully!");
        } catch (error) {
        alert(error.message);
        return;
    }

    } else {    
    updatedWorkouts = [...workouts, workout];
    alert("Workout saved successfully!");

    }

    saveWorkouts(updatedWorkouts);


editingWorkoutIndex = null;


    displayWorkouts();

    workoutForm.reset();
    customExercise.style.display = "none";
    customExercise.required = false;
});

function editWorkout(index) {
    const workouts = getWorkouts();
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

    const workouts = getWorkouts();

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

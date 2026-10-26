
console.log("FitnessWatcher JavaScript is working!");

const workoutForm = document.getElementById("workoutForm");

workoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    const date = document.getElementById("date").value;

    
    const workout = {
        exercise: exercise,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
        date: date
    };

    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workouts.push(workout);

    localStorage.setItem("workouts", JSON.stringify(workouts));

    alert("Workout saved successfully!");
    displayWorkouts();

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

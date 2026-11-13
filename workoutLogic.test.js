import { describe, it, expect } from "vitest";
const { updateWorkout, validateWorkout } = require("./workoutLogic");

describe("FitnessWatcher Edit Workout Tests", () => {

    it("should update an existing workout", () => {
        const workouts = [
            {
                exercise: "Bench Press",
                sets: 3,
                reps: 10,
                weight: 100,
                date: "2026-11-10"
            }
        ];

        const updatedWorkout = {
            exercise: "Bench Press",
            sets: 3,
            reps: 12,
            weight: 110,
            date: "2026-11-12"
        };

        const result = updateWorkout(workouts, 0, updatedWorkout);

        expect(result[0]).toEqual(updatedWorkout);
        expect(result).toHaveLength(1);
    });

    it("should reject an invalid workout index", () => {
        const workouts = [];

        expect(() => {
            updateWorkout(workouts, 0, {});
        }).toThrow("Workout not found.");
    });


it("should not change other workouts", () => {
    const workouts = [
        { exercise: "Bench Press", sets: 3, reps: 10, weight: 100 },
        { exercise: "Squats", sets: 4, reps: 8, weight: 150 }
    ];

    const updatedWorkout = {
        exercise: "Bench Press",
        sets: 3,
        reps: 12,
        weight: 110
    };

    const result = updateWorkout(workouts, 0, updatedWorkout);

    expect(result[0]).toEqual(updatedWorkout);
    expect(result[1]).toEqual(workouts[1]);
    expect(workouts[0].reps).toBe(10);
});

describe("FitnessWatcher Workout Validation Tests", () => {

    const validWorkout = {
        exercise: "Bench Press",
        sets: 3,
        reps: 10,
        weight: 100,
        date: "2026-11-13"
    };

    it("should accept a valid workout", () => {
        expect(validateWorkout(validWorkout)).toBe(true);
    });

    it("should reject an empty exercise name", () => {
        const workout = { ...validWorkout, exercise: "" };
        expect(validateWorkout(workout)).toBe(false);
    });

    it("should reject sets greater than 20", () => {
        const workout = { ...validWorkout, sets: 25 };
        expect(validateWorkout(workout)).toBe(false);
    });

    it("should reject reps greater than 50", () => {
        const workout = { ...validWorkout, reps: 60 };
        expect(validateWorkout(workout)).toBe(false);
    });

    it("should reject negative weight", () => {
        const workout = { ...validWorkout, weight: -10 };
        expect(validateWorkout(workout)).toBe(false);
    });

});

});

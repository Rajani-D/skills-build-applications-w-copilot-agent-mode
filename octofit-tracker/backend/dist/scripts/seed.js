"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const database_1 = require("../config/database");
// Seed the octofit_db database with test data
async function seed() {
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            username: 'ada',
            role: 'captain',
            fitnessLevel: 'advanced',
            bio: 'Loves early morning runs and strength sessions.',
        },
        {
            name: 'Grace Hopper',
            email: 'grace@example.com',
            username: 'grace',
            role: 'member',
            fitnessLevel: 'intermediate',
            bio: 'Enjoys cycling and yoga.',
        },
        {
            name: 'Katherine Johnson',
            email: 'katherine@example.com',
            username: 'katherine',
            role: 'member',
            fitnessLevel: 'beginner',
            bio: 'Focused on building consistency.',
        },
    ]);
    const team = await models_1.Team.create({
        name: 'Alpha Squad',
        members: [users[0]._id, users[1]._id],
        goal: 'Complete 100 weekly workouts together',
    });
    await models_1.Activity.insertMany([
        {
            userId: users[0]._id,
            type: 'run',
            duration: 35,
            distance: 5.2,
            calories: 320,
        },
        {
            userId: users[1]._id,
            type: 'cycle',
            duration: 45,
            distance: 12.8,
            calories: 410,
        },
        {
            userId: users[2]._id,
            type: 'walk',
            duration: 20,
            distance: 1.8,
            calories: 90,
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { userId: users[0]._id, name: users[0].name, score: 1420, streak: 7 },
        { userId: users[1]._id, name: users[1].name, score: 1310, streak: 4 },
        { userId: users[2]._id, name: users[2].name, score: 980, streak: 3 },
    ]);
    await models_1.Workout.insertMany([
        {
            title: 'Cardio Blast',
            difficulty: 'beginner',
            duration: 25,
            focus: 'endurance',
            description: 'A brisk workout with intervals for beginners.',
        },
        {
            title: 'Strength Flow',
            difficulty: 'intermediate',
            duration: 40,
            focus: 'strength',
            description: 'A circuit of bodyweight strength moves.',
        },
        {
            title: 'Mobility Reset',
            difficulty: 'beginner',
            duration: 20,
            focus: 'mobility',
            description: 'Gentle stretching and recovery work.',
        },
    ]);
    console.log('Seeded octofit_db with test data');
    console.log(`Created team: ${team.name}`);
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});

import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  fitnessLevel: { type: String, default: 'intermediate' },
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  goal: { type: String, default: 'Stay active together' },
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const leaderboardEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, default: 30 },
  focus: { type: String, default: 'full body' },
  description: { type: String, default: '' },
});

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);

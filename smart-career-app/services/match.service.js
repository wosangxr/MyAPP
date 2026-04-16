export const matchScore = (user, job) => {
  let score = 0;

  const matchedSkills = job.skills.filter((s) =>
    user.skills.includes(s)
  );

  score += (matchedSkills.length / job.skills.length) * 50;

  if (user.personality === job.mood) {
    score += 50;
  }

  return Math.floor(score);
};

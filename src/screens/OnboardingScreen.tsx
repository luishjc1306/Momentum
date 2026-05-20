import { Activity, ArrowRight, Brain, Dumbbell, Heart, Leaf, Moon, Scale, Sparkles, Target, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChoiceCard } from '../onboarding/ChoiceCard';
import { OnboardingButton } from '../onboarding/OnboardingButton';
import { OnboardingShell } from '../onboarding/OnboardingShell';
import { coachingStyles, mainGoalOptions, todayKey } from '../data/seedData';
import type { CoachingStyle, MainGoal, UserGoals, UserProfile } from '../types';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile, goals: UserGoals) => void;
}

const totalSteps = 4;

const goalIcons: Record<MainGoal, typeof Scale> = {
  'Lose weight': Scale,
  'Build muscle': Dumbbell,
  'Improve energy': Zap,
  'Improve sleep': Moon,
  'Stay consistent': Target,
  'Just exploring': Sparkles,
};

const styleIcons: Record<CoachingStyle, typeof Heart> = {
  Supportive: Heart,
  Straightforward: Activity,
  'Science-based': Brain,
  Funny: Sparkles,
  Balanced: Leaf,
};

const screenMotion = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.98 },
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [mainGoals, setMainGoals] = useState<MainGoal[]>([]);
  const [coachingStyle, setCoachingStyle] = useState<CoachingStyle>('Balanced');

  const toggleGoal = (goal: MainGoal) => {
    setMainGoals((current) => (current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]));
  };

  const finish = () => {
    const profile: UserProfile = {
      nickname: nickname.trim() || 'friend',
      age: Number(age) > 0 ? Number(age) : undefined,
      mainGoals: mainGoals.length ? mainGoals : ['Just exploring'],
      onboardedAt: new Date().toISOString(),
    };

    // Future expansion: progressively ask for nutrition, recovery, and training targets after users see dashboard value.
    const goals: UserGoals = {
      startingWeight: 0,
      goalWeight: 0,
      dailyCalorieTarget: 0,
      proteinTarget: 0,
      workoutTargetPerWeek: 0,
      walkingTargetMiles: 0,
      sleepTargetHours: 0,
      coachingStyle,
      startDate: todayKey(),
    };

    onComplete(profile, goals);
  };

  return (
    <OnboardingShell step={step} totalSteps={totalSteps}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.section key="welcome" {...screenMotion} transition={{ duration: 0.42, ease: 'easeOut' }} className="w-full text-center">
            <motion.div
              className="mx-auto mb-8 grid h-28 w-28 place-items-center rounded-[2rem] border border-white/70 bg-white/65 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
              animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="text-lagoon dark:text-mint" size={44} />
            </motion.div>
            <h1 className="text-4xl font-black leading-tight tracking-normal">Welcome to Momentum</h1>
            <p className="mx-auto mt-4 max-w-xs text-lg leading-7 text-stone-600 dark:text-white/70">
              Build momentum. One day at a time.
            </p>
            <OnboardingButton className="mt-10" onClick={() => setStep(1)}>
              Get Started
            </OnboardingButton>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section key="identity" {...screenMotion} transition={{ duration: 0.32, ease: 'easeOut' }} className="w-full space-y-5">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-lagoon dark:text-mint">Quick hello</p>
              <h1 className="mt-2 text-3xl font-black leading-tight">What should we call you?</h1>
              <p className="mt-2 text-sm text-stone-600 dark:text-white/65">Age is optional. You can edit this later.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/70 bg-white/72 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
              <label className="block space-y-2">
                <span className="text-sm font-black text-stone-600 dark:text-white/70">Name or nickname</span>
                <input
                  className="h-16 w-full rounded-2xl border border-stone-200 bg-white px-4 text-xl font-black outline-none transition focus:border-lagoon focus:ring-4 focus:ring-lagoon/15 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  autoComplete="nickname"
                  placeholder="Alex"
                />
              </label>
              <label className="mt-4 block space-y-2">
                <span className="text-sm font-black text-stone-600 dark:text-white/70">Age</span>
                <input
                  className="h-16 w-full rounded-2xl border border-stone-200 bg-white px-4 text-xl font-black outline-none transition focus:border-lagoon focus:ring-4 focus:ring-lagoon/15 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  inputMode="numeric"
                  placeholder="Optional"
                />
              </label>
            </div>
            <OnboardingButton onClick={() => setStep(2)} disabled={!nickname.trim()}>
              Continue <ArrowRight className="ml-2" size={18} />
            </OnboardingButton>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section key="goals" {...screenMotion} transition={{ duration: 0.32, ease: 'easeOut' }} className="w-full space-y-5">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-lagoon dark:text-mint">Your direction</p>
              <h1 className="mt-2 text-3xl font-black leading-tight">What’s your main goal?</h1>
              <p className="mt-2 text-sm text-stone-600 dark:text-white/65">Pick one or a few. No perfect answer needed.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mainGoalOptions.map((goal) => (
                <ChoiceCard key={goal} icon={goalIcons[goal]} label={goal} selected={mainGoals.includes(goal)} onClick={() => toggleGoal(goal)} />
              ))}
            </div>
            <OnboardingButton onClick={() => setStep(3)}>
              Continue <ArrowRight className="ml-2" size={18} />
            </OnboardingButton>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section key="style" {...screenMotion} transition={{ duration: 0.32, ease: 'easeOut' }} className="w-full space-y-5">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-lagoon dark:text-mint">Coach vibe</p>
              <h1 className="mt-2 text-3xl font-black leading-tight">How should Momentum coach you?</h1>
              <p className="mt-2 text-sm text-stone-600 dark:text-white/65">You can change this later in settings.</p>
            </div>
            <div className="space-y-3">
              {coachingStyles.map((style) => (
                <ChoiceCard key={style} icon={styleIcons[style]} label={style} selected={coachingStyle === style} onClick={() => setCoachingStyle(style)} />
              ))}
            </div>
            <OnboardingButton onClick={finish}>Start My Journey</OnboardingButton>
          </motion.section>
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}

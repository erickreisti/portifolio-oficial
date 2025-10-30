import { useMemo } from "react";
import {
  STATIC_SKILLS_DATA,
  STATIC_STATS_DATA,
  calculateSkillStats,
  searchSkills,
  getSkillsByCategory,
  SkillCategory,
  SkillItem,
  StatItem,
} from "@/lib/skills-data";

interface UseSkillsReturn {
  skillsData: SkillCategory[];
  statsData: StatItem[];
  skillStats: ReturnType<typeof calculateSkillStats>;
  getSkillsByCategory: (categoryId: string) => SkillItem[];
  searchSkills: (query: string) => SkillItem[];
  getAllCategories: () => SkillCategory[];
}

export const useSkills = (): UseSkillsReturn => {
  const skillsData = useMemo(() => STATIC_SKILLS_DATA, []);
  const statsData = useMemo(() => STATIC_STATS_DATA, []);
  const skillStats = useMemo(() => calculateSkillStats(), []);

  const getAllCategories = useMemo(() => {
    return () => skillsData;
  }, [skillsData]);

  return {
    skillsData,
    statsData,
    skillStats,
    getSkillsByCategory,
    searchSkills,
    getAllCategories,
  };
};

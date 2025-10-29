export const TECH_GRADIENTS = {
  primary: "from-cyan-500 to-blue-500",
  secondary: "from-purple-500 to-pink-500",
  success: "from-green-500 to-emerald-500",
  warning: "from-orange-500 to-red-500",
  cyan: "from-cyan-400 to-cyan-600",
  blue: "from-blue-400 to-blue-600",
  indigo: "from-indigo-400 to-indigo-600",
} as const;

export const FOCUS_CLASSES =
  "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900";

export const ANIMATION_DELAYS = {
  fast: "delay-75",
  normal: "delay-150",
  slow: "delay-300",
} as const;

export const PERFORMANCE_TARGETS = {
  LIGHTHOUSE: {
    PERFORMANCE: 95,
    ACCESSIBILITY: 100,
    BEST_PRACTICES: 100,
    SEO: 100,
  },
  LOAD_TIMES: {
    FIRST_CONTENTFUL_PAINT: 1500,
    LARGEST_CONTENTFUL_PAINT: 2500,
    CUMULATIVE_LAYOUT_SHIFT: 0.1,
  },
  BUNDLE: {
    INITIAL_LOAD: 500,
    TOTAL_SIZE: 2000,
  },
} as const;

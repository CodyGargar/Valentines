/**
 * All user-editable copy for the Valentine's app.
 * Edit girlfriendName, intro, ask, celebration, and date ideas here.
 */

export const content = {
  /** Optional: use in messages for a personal touch (e.g. "Hey, {name}!") */
  girlfriendName: "Mayra",

  /** Intro / landing lines (shown one at a time or as a block) */
  intro: {
    line1: "Hey BB",
    line2: "I made you something",
    //line3: "Scroll when you're ready.",
  },

  /** The big ask */
  ask: {
    question: "Will you be my Valentine?",
    subtext: "Tap your answer below 💕",
  },

  /** When she taps "No" — cycling microcopy (playful, not pushy) */
  noMicrocopy: [
    "Are you suuure? 🥺",
    "I'll bring snacks…",
    "Okay but like… reconsider?",
    "What if I said please? 🙏",
    "One more chance? 💘",
    "The Yes button is right there 👉",
    "I made this whole thing for you…",
    "Pretty please?",
    "Think of the snacks. And me.",
  ],

  /** "No, but tell me why" modal */
  tellMeWhyModal: {
    title: "I'll always listen 💬",
    message:
      "If something's on your mind or you're not ready yet, that's okay. Leave a note here (only you and I will see it — it stays on your device).",
    placeholder: "Tell me what you're thinking...",
    submitLabel: "Save (stays on this device)",
    closeLabel: "Close",
    notYetLabel: "I'm not ready yet",
  },

  /** Yes — celebration screen */
  yesCelebration: {
    headline: "You said yes! 💖",
    message:
      "I'm so glad you're my Valentine. This year (and honestly every year) I want to make it special for you. Thank you for being you.",
    unlockButtonLabel: "Unlock your surprise",
    afterUnlockTitle: "Plan our date",
    afterUnlockSubtext: "Pick one and I'll make it happen.",
    pickOneMessage: "Perfect. I'll plan it. 💘",
  },

  /** Date idea cards (after "Unlock your surprise") */
  dateIdeas: [
    {
      id: "dinner",
      label: "Fancy dinner",
      icon: "🍽️",
      description: "Somewhere nice, just us.",
    },
    {
      id: "adventure",
      label: "Little adventure",
      icon: "🌿",
      description: "A walk, a drive, or a surprise spot.",
    },
    {
      id: "cozy",
      label: "Cozy night in",
      icon: "🛋️",
      description: "Movies, snacks, and zero plans.",
    },
  ],

  /** "Not yet" / soft no outcome */
  notYet: {
    headline: "No worries 💕",
    message:
      "I'm here whenever you're ready. No pressure — just wanted you to know how I feel.",
    cta: "Back to the question",
  },

  /** Copy-to-clipboard message (SMS style) */
  shareMessage: "YES!!! 💖 I'll be your Valentine 😘",

  /** Music toggle (optional) */
  music: {
    label: "Play background music",
    ariaLabel: "Toggle background music",
  },

  /** Photo quiz (11 questions) — images from public/Pics-val/Pics-val/ */
  quiz: {
    title: "Little memory quiz",
    intro:
      "Eleven tiny questions about us. Look at the photo and guess where that date was.",
    completionMessage:
      "You made it through all eleven. I kind of love how many little memories we've stacked up together.",
    /**
     * Quiz questions:
     * - imageSrc: path under /public (e.g. /quiz/q1.jpg)
     * - choices: FOUR answer options (edit these!)
     * - correctIndex: 0–3 (which choice is correct)
     */
    questions: [
      {
        id: "q1",
        imageSrc: "/Pics-val/Pics-val/image_1.JPG",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["Evelyn's quince", "Arboretum", "Prom", "A wedding"],
        correctIndex: 0,
      },
      {
        id: "q2",
        imageSrc: "/Pics-val/Pics-val/IMG_0377.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["Winter Dance", "Junior Prom", "Senior Prom", "Perot Museum"],
        correctIndex: 2,
      },
      {
        id: "q3",
        imageSrc: "/Pics-val/Pics-val/IMG_0468.JPG",
        imageAlt: "Us together on a date",
        prompt: "Where was this date at?",
        choices: ["Arcade", "Chuck E Cheese", "Dave and Busters", "A Museum"],
        correctIndex: 0,
      },
      {
        id: "q4",
        imageSrc: "/Pics-val/Pics-val/IMG_0501.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["Terreno", "MIT", "UT", "My backyard"],
        correctIndex: 0,
      },
      {
        id: "q5",
        imageSrc: "/Pics-val/Pics-val/IMG_0667.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["Yolk", "Eggscellent Cafe", "IHOP", "Waffle House"],
        correctIndex: 1,
      },
      {
        id: "q6",
        imageSrc: "/Pics-val/Pics-val/IMG_0679.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["Dave N Busters", "K1 Speed", "Andretti's", "The DMV"],
        correctIndex: 2,
      },
      {
        id: "q7",
        imageSrc: "/Pics-val/Pics-val/IMG_0795.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this date at?",
        choices: ["Mayra's Room", "Meow Wolf", "Mirror Maze", "Parks Mall"],
        correctIndex: 1,
      },
      {
        id: "q8",
        imageSrc: "/Pics-val/Pics-val/IMG_0834.HEIC",
        imageAlt: "Us together on a date",
        prompt: "What did Edgar buy before this boba date?",
        choices: ["Mini Fridge", "Some clothes", "Snacks", "Food"],
        correctIndex: 0,
      },
      {
        id: "q9",
        imageSrc: "/Pics-val/Pics-val/IMG_1377.HEIC",
        imageAlt: "Us together on a date",
        prompt: "What movie did we watch before this?",
        choices: ["Demon Slayer", "Avatar", "FNAF 2", "Ghostbusters"],
        correctIndex: 0,
      },
      {
        id: "q10",
        imageSrc: "/Pics-val/Pics-val/IMG_1475.heic",
        imageAlt: "Us together on a date",
        prompt: "What arts and crafts did Edgar make after this?",
        choices: ["A duck", "A dinosaur", "A dog", "A cow"],
        correctIndex: 1,
      },
      {
        id: "q11",
        imageSrc: "/Pics-val/Pics-val/IMG_8597.HEIC",
        imageAlt: "Us together on a date",
        prompt: "Where was this picture taken?",
        choices: ["In Antartica", "Inside a fridge", "Arboretum", "Gaylord Ice Sculpture showcase"],
        correctIndex: 3,
      },
    ],
  },

  /** Gifts experience after the quiz */
  gifts: {
    title: "You did it 💌",
    subtitle:
      "Eleven questions, eleven little memories. Now there's one more surprise waiting for you.",
    boxes: [
      {
        id: "target",
        label: "Target surprise",
        description: "For cozy things, snacks, and little treats.",
      },
      {
        id: "chipotle",
        label: "Chipotle date",
        description: "Because burrito bowls together just hit different.",
      },
      {
        id: "letter",
        label: "A handwritten note",
        description: "Because some things feel better written slowly by hand.",
      },
    ],
    targetGift: {
      heading: "Target gift card",
      deliveryNote:
        "Your gift card will be sent via email or phone number at 8 AM CT on Feb 14.",
    },
    chipotleGift: {
      heading: "Chipotle gift card",
      deliveryNote:
        "Your gift card will be sent via email or phone number at 8 AM CT on Feb 14.",
    },
    letter: {
      heading: "Your Valentine card",
      prompt: "Tap the card or the button below to see the next part.",
      pdfUrl: "/ValentineCard.pdf",
    },
  },
} as const;

export type Content = typeof content;

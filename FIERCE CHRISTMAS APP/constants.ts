import { Prompt, SongMetadata } from './types';

// ==========================================
// 🎵 HOW TO ADD YOUR CONTENT
// ==========================================

// 1. YOUTUBE VIDEO ID:
//    We have added your specific video IDs below.
//    The "Watch" button will now play these videos inside the app.

// 2. AUDIO URL (For the "Listen" button):
//    We have set these to look for files in your 'public/music' folder.
//    Make sure you save your MP3s as:
//    - december.mp3
//    - sleigh.mp3
//    - fiercest.mp3
//    - heels.mp3
//    - claus.mp3
//    - grinch.mp3

export const songs: Record<string, SongMetadata> = {
  december: { 
    id: 'december', 
    title: 'December Diamond', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/tiR6DrYihpE',
    videoId: 'tiR6DrYihpE', 
    audioUrl: '/music/december.mp3' 
  },
  sleigh: { 
    id: 'sleigh', 
    title: 'Sleigh All Day', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/q5XlNegoQYE',
    videoId: 'q5XlNegoQYE', 
    audioUrl: '/music/sleigh.mp3' 
  },
  fiercest: { 
    id: 'fiercest', 
    title: 'A Few of My FIERCEST Things', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/SdaKG2DSdXI',
    videoId: 'SdaKG2DSdXI', 
    audioUrl: '/music/fiercest.mp3' 
  },
  heels: { 
    id: 'heels', 
    title: 'Holiday Heels', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/jd4N0Sv5etM',
    videoId: 'jd4N0Sv5etM', 
    audioUrl: '/music/heels.mp3' 
  },
  claus: { 
    id: 'claus', 
    title: 'The Claus Effect', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/I6Jn2hncHFg',
    videoId: 'I6Jn2hncHFg', 
    audioUrl: '/music/claus.mp3' 
  },
  grinch: { 
    id: 'grinch', 
    title: 'Grinch-ified', 
    artist: 'FIERCE Christmas', 
    youtubeUrl: 'https://youtu.be/9jLEK9FETTw',
    videoId: '9jLEK9FETTw', 
    audioUrl: '/music/grinch.mp3' 
  },
};

export const decemberPrompts: Prompt[] = [
  { id: 0, month: 'Diamond 1', icon: '💎', prompt: 'January - Clarity: What dreams and intentions are you crystallizing for this year? What is becoming crystal clear?' },
  { id: 1, month: 'Diamond 2', icon: '💠', prompt: 'February - Love: How are you polishing your self-love? What inner work is making you shine brighter?' },
  { id: 2, month: 'Diamond 3', icon: '💍', prompt: 'March - Commitment: What are you committing to? What promises are you making to yourself?' },
  { id: 3, month: 'Diamond 4', icon: '✨', prompt: 'April - Sparkle: What moments made you sparkle this month? What brought out your brilliance?' },
  { id: 4, month: 'Diamond 5', icon: '🔷', prompt: 'May - Strength: Like a diamond formed under pressure, what challenges strengthened you?' },
  { id: 5, month: 'Diamond 6', icon: '🔶', prompt: 'June - Radiance: You are glowing! What accomplishments are reflecting your hard work?' },
  { id: 6, month: 'Diamond 7', icon: '💫', prompt: 'July - Celebration: Celebrate your multifaceted brilliance! What makes you uniquely valuable?' },
  { id: 7, month: 'Diamond 8', icon: '⭐', prompt: 'August - Abundance: What riches (inner and outer) are you harvesting? How are you wealthy?' },
  { id: 8, month: 'Diamond 9', icon: '🌟', prompt: 'September - Refinement: How are you being refined? What edges are being smoothed?' },
  { id: 9, month: 'Diamond 10', icon: '✴️', prompt: 'October - Resilience: Like an unbreakable diamond, how have you proven your strength?' },
  { id: 10, month: 'Diamond 11', icon: '💖', prompt: 'November - Gratitude: Count your blessings like precious gems. What treasures are you grateful for?' },
  { id: 11, month: 'Diamond 12', icon: '👑', prompt: 'December - Royalty: You are a crown jewel now. Reflect on your complete transformation. How do you reign?' }
];

export const sleighPrompts: Prompt[] = [
  { id: 0, icon: '📝', title: 'The Good List', prompt: '"I\'m always on the good list; minding my business" - What does being on YOUR good list look like? What standards do you hold yourself to?' },
  { id: 1, icon: '💪', title: 'The Grind', prompt: '"Long days, late nights; persistence stayed strong" - Describe your grind. What sacrifices have you made to get where you are?' },
  { id: 2, icon: '🔔', title: 'Loud Goals', prompt: '"Goals so loud, bells can\'t compete" - What are your LOUDEST goals right now? The ones you can\'t ignore?' },
  { id: 3, icon: '❄️', title: 'Diamond Wins', prompt: '"My wins rain down like a diamond snow storm" - Celebrate your wins! List all your victories, big and small, that prove your hard work pays off.' },
  { id: 4, icon: '✨', title: 'Grind to Glam', prompt: '"From the grind to the glam" - How do you celebrate your success? What does your personal "glow-up" look like?' },
  { id: 5, icon: '💭', title: 'Power Beliefs', prompt: '"Focus, dedication, and belief is all you need" - What beliefs about yourself fuel your success? What do you tell yourself when things get hard?' },
  { id: 6, icon: '🌟', title: 'Full Display', prompt: '"Putting my glow-up on full display" - Where in your life are you ready to show up BIGGER and shine brighter?' },
  { id: 7, icon: '👑', title: 'V.I.P. Life', prompt: '"Everywhere I go, I sleigh all day" - What does being a "V.I.P. in your own life" mean to you? How do you treat yourself like royalty?' },
  { id: 8, icon: '🎁', title: 'Earned Rewards', prompt: '"Shopping spree on Santa, no naughty list for me" - What rewards have you earned? What are you manifesting into your life?' },
  { id: 9, icon: '💎', title: 'Diamond Life', prompt: '"This diamond life reflects the success of my grind" - Visualize your dream life in vivid detail. What does your "diamond life" look like?' }
];

export const fiercestPrompts: Prompt[] = [
  { id: 0, icon: '👻', title: 'Past Lessons', prompt: '"Ghosts of the past still call my name, they taught me lessons that changed the game" - What lessons from your past transformed you? What painful experiences actually changed the game for you?' },
  { id: 1, icon: '🙏', title: 'Present Grace', prompt: '"Ghosts of the present teach me to stand in grace" - How are you reclaiming your time and space RIGHT NOW? What boundaries are you setting?' },
  { id: 2, icon: '🔮', title: 'Future Whispers', prompt: '"Ghosts of the future whispers sweetly to me" - What is your future self whispering to you? What destiny are you walking toward?' },
  { id: 3, icon: '📣', title: 'Bold Affirmations', prompt: '"Peace and money and bold affirmations" - Write your boldest affirmations. What are you declaring over your life?' },
  { id: 4, icon: '🎯', title: 'Clear Goals', prompt: '"Peace and money and goals that\'s clear" - List your clearest goals. What are you laser-focused on manifesting?' },
  { id: 5, icon: '💚', title: 'Healed Emotions', prompt: '"Peace and money and healed emotions" - What emotional wounds have you healed or are healing? How does that freedom feel?' },
  { id: 6, icon: '🕊️', title: 'Ditched Drama', prompt: '"Ditched the drama, now I\'m livin\' right" - What drama, toxicity, or chaos did you release? How has your life changed since?' },
  { id: 7, icon: '💍', title: 'Proof & Trust', prompt: '"5 golden rings adorn my hand, proof that I followed and trusted the plan" - What proof do you have that trusting the process works? What victories validate your faith?' },
  { id: 8, icon: '🔥', title: 'Big Dreams', prompt: '"I conspire and dream big by the fire" - Dream BIG. What desires are you conspiring with the universe to create?' },
  { id: 9, icon: '✨', title: 'Gratitude List', prompt: '"Peace and money and holiday bling - These are a few of my FIERCEST things" - Make your gratitude list below! What are YOUR fiercest things?' }
];

export const heelsPrompts: Prompt[] = [
  { id: 0, icon: '🦋', title: 'Comeback Story', prompt: '"Spent so many years feeling sad and blue, now I\'m in a good place and I\'m feeling brand new" - What transformed you from sad to brand new? Tell your comeback story.' },
  { id: 1, icon: '👑', title: 'Queen Spaces', prompt: '"I\'m stepping out in spaces that honors my Queen. And, just to be clear, that Queen is me" - What spaces honor YOUR queendom? Where do you feel most celebrated and valued?' },
  { id: 2, icon: '🎄', title: 'Year-Round Joy', prompt: '"December or July, I\'m always in a Christmas vibe" - What brings you joy year-round? How do you maintain your "Christmas vibe" energy daily?' },
  { id: 3, icon: '🌟', title: 'Praise Overflow', prompt: '"Even in the midst of darkness, praise still overflows" - How do you stay grateful when things get hard? What practices keep your praise flowing?' },
  { id: 4, icon: '💫', title: 'No Regrets', prompt: '"Living this life with no regrets" - What would you need to do/say/become to live with zero regrets? What\'s holding you back?' },
  { id: 5, icon: '✨', title: 'Magical Dreams', prompt: '"I got mistletoe dreams and glitter-filled goals" - What are your most magical, sparkling dreams? The ones that make you giddy?' },
  { id: 6, icon: '💪', title: 'Unstoppable', prompt: '"Got confidence bigger than the entire North Pole" - Where does your confidence come from? What makes you feel unstoppable?' },
  { id: 7, icon: '🎯', title: 'Intentional Living', prompt: '"Intentional dreaming, I\'m not for play-play" - What does being INTENTIONAL look like in your life? Where are you no longer playing small?' },
  { id: 8, icon: '🏆', title: 'Battles Won', prompt: '"Clickity-clack-clack - Strolling through life like the battle\'s won" - What battles have you already won? Celebrate your victories with confidence!' },
  { id: 9, icon: '💖', title: 'Season of Bliss', prompt: '"One thing for sure, there\'s nothing better than this" - Describe your current season of bliss. What makes THIS moment so beautiful?' }
];

export const clausPrompts: Prompt[] = [
  { id: 0, icon: '📜', title: 'Lesson 1: Your Rules', prompt: '"Know who you are. Be loyal to yourself. You play by your rules not the rules of someone else" - What are YOUR rules for your life? Where have you been playing by someone else\'s rulebook?' },
  { id: 1, icon: '⏰', title: 'Lesson 2: Raise Standards', prompt: '"When you\'re on time, you are actually late" - Where in your life do you need to raise your standards? What mediocrity are you accepting?' },
  { id: 2, icon: '💬', title: 'Lesson 3: Confidence Speaks', prompt: '"When doubt comes knocking, let your confidence speak" - What does YOUR confidence say when doubt shows up? Write your confident comeback.' },
  { id: 3, icon: '👯‍♀️', title: 'Lesson 4: Your Tribe', prompt: '"Make sure you\'re rolling with queens who match your vibe. They fix your crown, not compete for space" - Who are the queens in your tribe? Who genuinely celebrates you?' },
  { id: 4, icon: '🚢', title: 'Lesson 5: Release Toxicity', prompt: '"If they can\'t celebrate for you while you on your rise, abandon them like ship wrecks beneath your skies" - Who do you need to release? What toxic relationships are you ready to abandon?' },
  { id: 5, icon: '⚡', title: 'Lesson 6: Energy Boundaries', prompt: '"Don\'t serve your vision where envy feeds" - Where have you been pouring into people who don\'t believe in your dreams? Where do you need to redirect your energy?' },
  { id: 6, icon: '🗺️', title: 'Lesson 7: The Strategist', prompt: '"He may drive the sleigh but I map the plan. He may be the headline but I\'m the brand" - Where are YOU the strategist/brand behind the scenes? How do you own your power quietly?' },
  { id: 7, icon: '💎', title: 'Lesson 8: Real Power', prompt: '"Who cares who gets the press when you got the clout" - What real power/influence do you have that others don\'t see? What\'s your behind-the-scenes magic?' },
  { id: 8, icon: '🎯', title: 'Lesson 9: Energy Audit', prompt: '"Be careful of the things you care about" - What are you giving too much energy to? What needs to matter less?' },
  { id: 9, icon: '📋', title: 'Lesson 10: Your Blueprint', prompt: '"Fuel your days with no regrets. I\'m handing you my blueprint… It\'s The Claus Effect" - CREATE YOUR BLUEPRINT: What are the non-negotiable principles you live by? What\'s YOUR "effect" on the world?' }
];

export const grinchPrompts: Prompt[] = [
  { id: 0, icon: '😔', title: 'Shadow Confession', prompt: '"Envy and jealousy was once my story to tell. I told it loud and bold, I was Grinch-ified to the bones" - When have YOU been the green-eyed one? Confess your jealous moments without judgment.' },
  { id: 1, icon: '😓', title: 'Cost of Bitterness', prompt: '"There\'s venom in your blood, I feel sorry for you. You must be exhausted" - How exhausting was it when YOU were bitter? What did that season cost you?' },
  { id: 2, icon: '🎭', title: 'Faking It', prompt: '"I wore Holiday heels that neither clicked or clacked" - When did you go through the motions without real joy? When were you faking happiness?' },
  { id: 3, icon: '🔄', title: 'Turning Point', prompt: '"I turned my life around. Preferred to make an impact" - What made you change? What was your turning point from bitter to better?' },
  { id: 4, icon: '🛡️', title: 'Joy Stealers', prompt: '"You stay stealin\' joy... all things considered, the Grinch ain\'t got nothing on you" - Who\'s trying to steal YOUR joy right now? Who\'s playing grinch in your life?' },
  { id: 5, icon: '✨', title: 'Rising Above', prompt: '"I\'ll throw glitter while you throw shade" - How do you rise above negativity? What\'s your strategy for staying unbothered?' },
  { id: 6, icon: '🕊️', title: 'Release Darkness', prompt: '"Why you mad? Don\'t be mad. Let that darkness go" - What darkness do YOU still need to release? Where are you holding onto resentment?' },
  { id: 7, icon: '💚', title: 'Extend Grace', prompt: '"Even the Grinch gotta grip and his heart overflowed" - Who in your life deserves grace? Can you extend compassion to someone toxic?' },
  { id: 8, icon: '🏆', title: 'Hater Fuel', prompt: '"Are you mad at my achievements or are you mad at yourself?" - What are people actually jealous of in YOUR life? What wins are attracting haters?' },
  { id: 9, icon: '🔥', title: 'Fire Made Me', prompt: '"I still sparkle in your shade. I am also what the fire made" - How has adversity refined you? Write your "fire made me" testimony.' }
];

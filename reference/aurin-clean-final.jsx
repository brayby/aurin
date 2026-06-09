/* eslint-disable */
import { useState, useRef, useEffect } from "react";

const MAJOR_ARCANA = [
  { id: 0, name: "The Fool", suit: "Major Arcana", number: "0", keywords: ["Beginnings", "Innocence", "Adventure", "Spontaneity"], meaning: "A leap of faith. New beginnings, fresh starts, unlimited potential. The Fool steps off the cliff not from stupidity but from pure trust. You're at the start of something — embrace it without overthinking.", reversed: "Recklessness, naivety, poor planning. You might be jumping in without thinking, or holding back out of fear of looking foolish.", element: "Air", symbol: "☽" },
  { id: 1, name: "The Magician", suit: "Major Arcana", number: "I", keywords: ["Willpower", "Skill", "Manifestation", "Resourcefulness"], meaning: "You have everything you need. The Magician channels energy from above into the material world — all four suits sit on the table before him. This card says: use your skills, take action, make it happen.", reversed: "Manipulation, trickery, untapped potential. Skills being wasted or someone being deceptive.", element: "Air / Mercury", symbol: "✦" },
  { id: 2, name: "The High Priestess", suit: "Major Arcana", number: "II", keywords: ["Intuition", "Mystery", "Inner Knowledge", "Stillness"], meaning: "Stop, listen, and trust your gut. The High Priestess guards what lies beneath the surface. She doesn't speak — she knows. Your intuition is telling you something. Pay attention to dreams, feelings, and what isn't being said.", reversed: "Secrets being revealed, ignoring intuition, surface-level thinking.", element: "Water / Moon", symbol: "☾" },
  { id: 3, name: "The Empress", suit: "Major Arcana", number: "III", keywords: ["Abundance", "Fertility", "Nature", "Nurturing"], meaning: "Growth, creativity, and nurturing energy. The Empress represents all things lush and abundant — creative projects flourishing, relationships deepening, self-care mattering. Nature, the body, and the senses are all under her domain.", reversed: "Creative blocks, neglecting yourself, smothering others, dependence.", element: "Earth / Venus", symbol: "♀" },
  { id: 4, name: "The Emperor", suit: "Major Arcana", number: "IV", keywords: ["Authority", "Structure", "Stability", "Control"], meaning: "Order, leadership, and foundation. The Emperor brings discipline and structure — the framework that allows things to grow. Can represent a father figure, a boss, or your own need to take charge and build something solid.", reversed: "Tyranny, rigidity, abuse of power, or loss of control.", element: "Fire / Aries", symbol: "♈" },
  { id: 5, name: "The Hierophant", suit: "Major Arcana", number: "V", keywords: ["Tradition", "Institutions", "Belief", "Conformity"], meaning: "Tradition, spiritual guidance, and institutions. The Hierophant represents established systems — religion, education, marriage, cultural norms. Sometimes this means finding a teacher or mentor; sometimes it's asking whether the rules you follow actually serve you.", reversed: "Rebellion, breaking free, unorthodox approaches, challenging the status quo.", element: "Earth / Taurus", symbol: "♉" },
  { id: 6, name: "The Lovers", suit: "Major Arcana", number: "VI", keywords: ["Love", "Choice", "Values", "Union"], meaning: "A significant choice, not just romance. Yes it can mean love, but The Lovers is fundamentally about alignment — are your choices in line with your values? It often appears at crossroads where you must choose between two paths that represent different parts of yourself.", reversed: "Misalignment, poor choices, values conflict, a relationship out of balance.", element: "Air / Gemini", symbol: "♊" },
  { id: 7, name: "The Chariot", suit: "Major Arcana", number: "VII", keywords: ["Victory", "Drive", "Control", "Determination"], meaning: "Willpower in motion. The Chariot is about harnessing opposing forces and driving forward anyway. You can win this — but it takes discipline, focus, and keeping both hands on the wheel. A card of triumph through sheer determination.", reversed: "Loss of direction, aggression, going off the rails, lack of control.", element: "Water / Cancer", symbol: "♋" },
  { id: 8, name: "Strength", suit: "Major Arcana", number: "VIII", keywords: ["Courage", "Patience", "Compassion", "Inner power"], meaning: "Quiet strength, not brute force. The woman in the card tames the lion with gentleness. True strength is the courage to stay calm, be patient, and act from love rather than fear. You have more power than you realise.", reversed: "Self-doubt, weakness, lack of discipline, or abuse of power.", element: "Fire / Leo", symbol: "♌" },
  { id: 9, name: "The Hermit", suit: "Major Arcana", number: "IX", keywords: ["Solitude", "Introspection", "Guidance", "Wisdom"], meaning: "Withdrawal and inner wisdom. The Hermit walks alone by choice — not from loneliness but to seek truth. A time for reflection, stepping back from the noise, looking inward. The answer you're looking for is inside, not outside.", reversed: "Isolation becoming unhealthy, withdrawing too much, or refusing wisdom.", element: "Earth / Virgo", symbol: "♍" },
  { id: 10, name: "Wheel of Fortune", suit: "Major Arcana", number: "X", keywords: ["Change", "Cycles", "Fate", "Turning points"], meaning: "Everything turns. Life moves in cycles — what goes up comes down, what is lost returns. The Wheel reminds you that you're not entirely in control, and that's okay. A change is coming. Go with it rather than fight it.", reversed: "Bad luck, resistance to change, feeling like fate is working against you.", element: "Fire / Jupiter", symbol: "♃" },
  { id: 11, name: "Justice", suit: "Major Arcana", number: "XI", keywords: ["Fairness", "Truth", "Law", "Cause & Effect"], meaning: "Truth and accountability. Justice is clear-eyed and impartial. This card often appears around legal matters, decisions, or karmic consequences. What you've put out is coming back. The scales balance — eventually, always.", reversed: "Injustice, dishonesty, avoiding accountability, unfair outcomes.", element: "Air / Libra", symbol: "♎" },
  { id: 12, name: "The Hanged Man", suit: "Major Arcana", number: "XII", keywords: ["Suspension", "Perspective", "Surrender", "Waiting"], meaning: "Pause and shift perspective. The Hanged Man is suspended willingly — he's not trapped, he's waiting and seeing the world upside down. This card asks you to surrender control, accept a period of waiting, and trust that the pause has purpose.", reversed: "Stalling, martyrdom, refusing to let go, wasted sacrifice.", element: "Water / Neptune", symbol: "♆" },
  { id: 13, name: "Death", suit: "Major Arcana", number: "XIII", keywords: ["Transformation", "Endings", "Transition", "Release"], meaning: "Endings that make way for beginnings. Almost never literal death. Death is transformation — the end of a chapter, a relationship, a version of yourself. What needs to die so something new can grow? Let it go.", reversed: "Resistance to change, clinging to what's ending, stagnation.", element: "Water / Scorpio", symbol: "♏" },
  { id: 14, name: "Temperance", suit: "Major Arcana", number: "XIV", keywords: ["Balance", "Moderation", "Patience", "Integration"], meaning: "Flow, balance, and alchemy. Temperance pours water between cups — mixing, blending, finding the middle path. A card of patience and integration. Things are coming together slowly. Don't force it. Trust the process.", reversed: "Imbalance, excess, impatience, things feeling out of sync.", element: "Fire / Sagittarius", symbol: "♐" },
  { id: 15, name: "The Devil", suit: "Major Arcana", number: "XV", keywords: ["Bondage", "Addiction", "Shadow", "Materialism"], meaning: "What's keeping you chained? The Devil shows two figures chained — but the chains are loose enough to remove. This card points to addiction, unhealthy attachments, self-limiting beliefs, or the parts of yourself you refuse to look at. The chains are often self-imposed.", reversed: "Breaking free, releasing addiction, reclaiming power, shadow work.", element: "Earth / Capricorn", symbol: "♑" },
  { id: 16, name: "The Tower", suit: "Major Arcana", number: "XVI", keywords: ["Upheaval", "Sudden change", "Chaos", "Revelation"], meaning: "Sudden, necessary destruction. The Tower is rarely comfortable — it's a shock, a crisis, a sudden collapse of something built on shaky foundations. But what falls needed to fall. The lightning reveals what was always unstable. Painful, but ultimately clearing.", reversed: "Avoiding disaster, delayed collapse, fear of change, narrowly escaping.", element: "Fire / Mars", symbol: "♂" },
  { id: 17, name: "The Star", suit: "Major Arcana", number: "XVII", keywords: ["Hope", "Renewal", "Inspiration", "Healing"], meaning: "Hope after the storm. After The Tower comes The Star — calm, healing, and quiet optimism. You are being renewed. This is a card of faith, inspiration, and gentle restoration. The universe has not abandoned you.", reversed: "Hopelessness, losing faith, despair, disconnection from inspiration.", element: "Air / Aquarius", symbol: "♒" },
  { id: 18, name: "The Moon", suit: "Major Arcana", number: "XVIII", keywords: ["Illusion", "Fear", "Subconscious", "Confusion"], meaning: "Things aren't what they seem. The Moon illuminates with uncertain light — shadows, distortions, and half-truths abound. Anxiety, hidden fears, and subconscious patterns are surfacing. Trust is difficult here. Look more carefully before acting.", reversed: "Clarity returning, fears dissolving, illusions lifting, repressed feelings emerging.", element: "Water / Pisces", symbol: "♓" },
  { id: 19, name: "The Sun", suit: "Major Arcana", number: "XIX", keywords: ["Joy", "Success", "Vitality", "Confidence"], meaning: "Pure, radiant success. The Sun is one of the most positive cards in the deck — clarity, joy, and vitality. Whatever you're working on, this card says it's going well. You're in a good place. Enjoy it.", reversed: "Temporary setback, overconfidence, sadness blocking joy.", element: "Fire / Sun", symbol: "☀" },
  { id: 20, name: "Judgement", suit: "Major Arcana", number: "XX", keywords: ["Reckoning", "Awakening", "Rebirth", "Calling"], meaning: "A wake-up call. Judgement asks you to rise and answer. Something is calling you — your higher self, a second chance, a reckoning. This is about honest self-evaluation, forgiveness, and stepping into who you're meant to be.", reversed: "Self-doubt, ignoring the call, refusing to change, harsh self-judgement.", element: "Fire / Pluto", symbol: "♇" },
  { id: 21, name: "The World", suit: "Major Arcana", number: "XXI", keywords: ["Completion", "Integration", "Wholeness", "Achievement"], meaning: "A cycle complete. The World is the final card of the Major Arcana — everything has come together. A project finished, a goal reached, a chapter closed with satisfaction. Integration, fulfilment, and the readiness to begin the next great cycle.", reversed: "Loose ends, incomplete work, delays to completion, not quite there yet.", element: "Earth / Saturn", symbol: "♄" },
];

const MINOR_ARCANA = [
  { id: 22, name: "Ace of Wands", suit: "Wands", number: "Ace", keywords: ["Inspiration", "New energy", "Creative spark", "Potential"], meaning: "A burst of inspiration or creative energy. Something new is igniting — a project, a passion, an idea. Grab it. This energy won't wait.", reversed: "Delays, lack of motivation, creative block, false start.", element: "Fire", symbol: "🔥" },
  { id: 23, name: "Two of Wands", suit: "Wands", number: "2", keywords: ["Planning", "Future vision", "Decisions", "Expansion"], meaning: "You're looking at the horizon with something already built behind you. Now: where next? A card of future planning, bold vision, and deciding which direction to grow.", reversed: "Fear of the unknown, poor planning, staying too small.", element: "Fire", symbol: "🔥" },
  { id: 24, name: "Three of Wands", suit: "Wands", number: "3", keywords: ["Progress", "Expansion", "Foresight", "Opportunity"], meaning: "Your ship has sailed and you're watching it go. Plans are in motion, expansion is happening. This card says: trust what you've set in motion.", reversed: "Setbacks, delays, things not returning as expected.", element: "Fire", symbol: "🔥" },
  { id: 25, name: "Four of Wands", suit: "Wands", number: "4", keywords: ["Celebration", "Community", "Milestone", "Harmony"], meaning: "Celebrate! A milestone reached, a homecoming, a joyful gathering. Something worth honouring is happening. This is one of the happiest cards in the deck.", reversed: "Instability at home, conflict in community, celebration cut short.", element: "Fire", symbol: "🔥" },
  { id: 26, name: "Five of Wands", suit: "Wands", number: "5", keywords: ["Conflict", "Competition", "Tension", "Chaos"], meaning: "Everyone's fighting for the mic. Competing ideas, friction, chaotic energy. Could be healthy competition or pointless conflict — look at context. Someone needs to listen.", reversed: "Conflict resolved, avoiding confrontation, inner tension.", element: "Fire", symbol: "🔥" },
  { id: 27, name: "Six of Wands", suit: "Wands", number: "6", keywords: ["Victory", "Recognition", "Success", "Confidence"], meaning: "Public success and recognition. You've won something and people know it. A moment of triumph — enjoy the applause. You earned it.", reversed: "Ego, fall from grace, seeking validation, private failure.", element: "Fire", symbol: "🔥" },
  { id: 28, name: "Seven of Wands", suit: "Wands", number: "7", keywords: ["Defense", "Perseverance", "Challenge", "Standing firm"], meaning: "Hold your ground. You're being challenged — possibly from multiple angles — but you have the high ground. Don't back down if you believe in your position.", reversed: "Giving up, feeling overwhelmed, caving to pressure.", element: "Fire", symbol: "🔥" },
  { id: 29, name: "Eight of Wands", suit: "Wands", number: "8", keywords: ["Speed", "Movement", "News", "Momentum"], meaning: "Everything's moving fast. Messages, travel, rapid developments. After a period of waiting, things are finally flying. Keep up.", reversed: "Delays, slow news, miscommunication, energy scattered.", element: "Fire", symbol: "🔥" },
  { id: 30, name: "Nine of Wands", suit: "Wands", number: "9", keywords: ["Resilience", "Persistence", "Boundaries", "Fatigue"], meaning: "Battered but still standing. You've been through a lot and you're tired — but you haven't quit. This card honours resilience. One more push.", reversed: "Paranoia, giving up too close to the finish, stubbornness.", element: "Fire", symbol: "🔥" },
  { id: 31, name: "Ten of Wands", suit: "Wands", number: "10", keywords: ["Burden", "Overwhelm", "Responsibility", "Hard work"], meaning: "You're carrying too much. This card shows someone struggling under a heavy load — responsibilities piling up, burnout approaching. Time to put some things down or ask for help.", reversed: "Releasing burden, delegating, collapse under weight.", element: "Fire", symbol: "🔥" },
  { id: 32, name: "Page of Wands", suit: "Wands", number: "Page", keywords: ["Enthusiasm", "Curiosity", "New ideas", "Messenger"], meaning: "An enthusiastic beginner. Fresh energy, curiosity, and willingness to learn. Messages about creative ventures. A young or youthful person full of excitement.", reversed: "Immaturity, lack of follow-through, scattered energy.", element: "Fire", symbol: "🔥" },
  { id: 33, name: "Knight of Wands", suit: "Wands", number: "Knight", keywords: ["Action", "Adventure", "Impulsiveness", "Passion"], meaning: "Fast, passionate, and a bit reckless. The Knight of Wands charges ahead without always thinking it through. Can be thrillingly bold or dangerously impulsive.", reversed: "Recklessness, arrogance, delays, frustration.", element: "Fire", symbol: "🔥" },
  { id: 34, name: "Queen of Wands", suit: "Wands", number: "Queen", keywords: ["Confidence", "Warmth", "Determination", "Charisma"], meaning: "Bold, magnetic, and in her power. The Queen of Wands knows exactly who she is and draws people to her. Confident leadership with warmth.", reversed: "Jealousy, demanding, selfish, insecurity masked as confidence.", element: "Fire", symbol: "🔥" },
  { id: 35, name: "King of Wands", suit: "Wands", number: "King", keywords: ["Vision", "Leadership", "Entrepreneurship", "Authority"], meaning: "A visionary leader who makes things happen. The King of Wands has drive, charisma, and the ability to inspire others. A natural entrepreneur.", reversed: "Impulsive leadership, tyranny, high expectations, burn out.", element: "Fire", symbol: "🔥" },
  { id: 36, name: "Ace of Cups", suit: "Cups", number: "Ace", keywords: ["New love", "Emotional opening", "Compassion", "Overflow"], meaning: "An emotional beginning. New love, deep compassion, creative inspiration, spiritual connection. Your heart is open and ready. Receive what's being offered.", reversed: "Emotional repression, emptiness, blocked feelings.", element: "Water", symbol: "💧" },
  { id: 37, name: "Two of Cups", suit: "Cups", number: "2", keywords: ["Partnership", "Connection", "Mutual attraction", "Balance"], meaning: "A meaningful connection — romantic, platonic, or professional. Two people seeing and choosing each other. Mutual respect and genuine attraction.", reversed: "Imbalance, breakup, tension in partnership, one-sided feelings.", element: "Water", symbol: "💧" },
  { id: 38, name: "Three of Cups", suit: "Cups", number: "3", keywords: ["Celebration", "Friendship", "Community", "Joy"], meaning: "Raise a glass with your people. Friendship, celebration, and communal joy. A reunion, a party, creative collaboration. Your people are your joy.", reversed: "Isolation, gossip, overindulgence, falling out with friends.", element: "Water", symbol: "💧" },
  { id: 39, name: "Four of Cups", suit: "Cups", number: "4", keywords: ["Apathy", "Contemplation", "Withdrawal", "Discontent"], meaning: "Sitting under a tree, ignoring a cup being offered. Boredom, dissatisfaction, or withdrawal from what's available. Are you missing an opportunity because you're too caught in your own head?", reversed: "Emerging from apathy, new motivation, taking a chance.", element: "Water", symbol: "💧" },
  { id: 40, name: "Five of Cups", suit: "Cups", number: "5", keywords: ["Grief", "Loss", "Regret", "Disappointment"], meaning: "Looking at what's been spilled, not what remains. Grief and disappointment are real — don't rush past them. But two cups still stand. Loss doesn't have to be total.", reversed: "Acceptance, moving on, finding the silver lining.", element: "Water", symbol: "💧" },
  { id: 41, name: "Six of Cups", suit: "Cups", number: "6", keywords: ["Nostalgia", "Childhood", "Innocence", "Past"], meaning: "A warm glow of the past. Childhood memories, old friends, nostalgia. Sometimes a return to simpler times. Can also mean someone from the past reappearing.", reversed: "Stuck in the past, naive, living in memory not present.", element: "Water", symbol: "💧" },
  { id: 42, name: "Seven of Cups", suit: "Cups", number: "7", keywords: ["Fantasy", "Choices", "Illusion", "Wishful thinking"], meaning: "So many options — but which are real? A card of daydreams, fantasies, and possible delusion. You might be seeing what you want rather than what's true. Focus.", reversed: "Clarity, making a decision, cutting through illusion.", element: "Water", symbol: "💧" },
  { id: 43, name: "Eight of Cups", suit: "Cups", number: "8", keywords: ["Walking away", "Withdrawal", "Seeking meaning", "Disappointment"], meaning: "Leaving what no longer fulfils you. The figure walks away from eight full cups — it's not failure, it's evolution. Something isn't enough anymore, and you know it.", reversed: "Staying out of fear, aimlessness, returning to the wrong thing.", element: "Water", symbol: "💧" },
  { id: 44, name: "Nine of Cups", suit: "Cups", number: "9", keywords: ["Contentment", "Satisfaction", "Wish fulfilled", "Gratitude"], meaning: "The wish card. Emotional satisfaction, comfort, and contentment. A wish is coming true. You feel good, and you've earned it. Savour this.", reversed: "Smugness, overindulgence, wish not granted, shallow satisfaction.", element: "Water", symbol: "💧" },
  { id: 45, name: "Ten of Cups", suit: "Cups", number: "10", keywords: ["Harmony", "Family", "Lasting happiness", "Fulfilment"], meaning: "Emotional fulfilment and lasting happiness. The family beneath the rainbow. Harmony in relationships, a sense of home and belonging, deep joy. The good life.", reversed: "Family conflict, broken home, misaligned values, surface happiness.", element: "Water", symbol: "💧" },
  { id: 46, name: "Page of Cups", suit: "Cups", number: "Page", keywords: ["Creative beginnings", "Intuition", "Sensitivity", "Dreamer"], meaning: "Gentle, intuitive, and imaginative. The Page of Cups brings messages about love or creative ventures, and carries an open, dreamy quality.", reversed: "Emotional immaturity, escapism, creative blocks, bad news.", element: "Water", symbol: "💧" },
  { id: 47, name: "Knight of Cups", suit: "Cups", number: "Knight", keywords: ["Romance", "Charm", "Idealism", "Invitation"], meaning: "A romantic figure bearing an offer. Charming, idealistic, emotionally expressive. Could be a person, or an invitation into something emotionally significant.", reversed: "Moodiness, unreliability, manipulation, heartbreaker.", element: "Water", symbol: "💧" },
  { id: 48, name: "Queen of Cups", suit: "Cups", number: "Queen", keywords: ["Empathy", "Intuition", "Compassion", "Emotional depth"], meaning: "Deeply intuitive, compassionate, and emotionally intelligent. The Queen of Cups feels everything and holds space for others. Genuine care, strong psychic awareness.", reversed: "Codependency, over-emotional, martyrdom, emotionally manipulative.", element: "Water", symbol: "💧" },
  { id: 49, name: "King of Cups", suit: "Cups", number: "King", keywords: ["Emotional maturity", "Compassionate leadership", "Balance", "Wisdom"], meaning: "Emotional intelligence in a position of authority. The King of Cups leads with empathy and keeps calm in turbulent waters. Wise, diplomatic, deeply feeling but in control.", reversed: "Emotional manipulation, moodiness, cold or repressed, volatility under pressure.", element: "Water", symbol: "💧" },
  { id: 50, name: "Ace of Swords", suit: "Swords", number: "Ace", keywords: ["Clarity", "Truth", "Breakthrough", "New thinking"], meaning: "A breakthrough moment — sudden clarity, a truth revealed, a new way of thinking. Cut through the noise. The mind is sharp and ready.", reversed: "Confusion, misinformation, poor communication, mental fog.", element: "Air", symbol: "🌬" },
  { id: 51, name: "Two of Swords", suit: "Swords", number: "2", keywords: ["Stalemate", "Avoidance", "Difficult choice", "Indecision"], meaning: "Blindfolded with crossed swords. A stalemate — you're avoiding a difficult decision because both options seem equally painful. You'll have to look eventually.", reversed: "Indecision breaking, information emerging, moving forward.", element: "Air", symbol: "🌬" },
  { id: 52, name: "Three of Swords", suit: "Swords", number: "3", keywords: ["Heartbreak", "Grief", "Pain", "Sorrow"], meaning: "Three swords through a heart. Grief, heartbreak, and sorrow. This pain is real and it deserves to be felt. Don't minimise it — but know it will pass.", reversed: "Recovery, releasing pain, forgiving, moving through grief.", element: "Air", symbol: "🌬" },
  { id: 53, name: "Four of Swords", suit: "Swords", number: "4", keywords: ["Rest", "Recovery", "Meditation", "Retreat"], meaning: "Lie down. Rest. The Four of Swords is a strong signal to step back, recover, and restore. You cannot keep pushing. Retreat is not defeat.", reversed: "Restlessness, returning too soon, burnout, refusing to rest.", element: "Air", symbol: "🌬" },
  { id: 54, name: "Five of Swords", suit: "Swords", number: "5", keywords: ["Conflict", "Defeat", "Dishonour", "Winning at a cost"], meaning: "A win that doesn't feel like a win. Conflict, possibly with some dishonesty involved. Someone (maybe you) won, but at what cost? Is this really worth it?", reversed: "Reconciliation, letting go of conflict, moving past ego.", element: "Air", symbol: "🌬" },
  { id: 55, name: "Six of Swords", suit: "Swords", number: "6", keywords: ["Transition", "Moving on", "Calmer waters", "Recovery"], meaning: "Moving away from troubled waters toward something calmer. Travel, transition, or mental shift. It's not completely smooth yet — but it's better than where you were.", reversed: "Stuck in a difficult situation, unable to move on, baggage.", element: "Air", symbol: "🌬" },
  { id: 56, name: "Seven of Swords", suit: "Swords", number: "7", keywords: ["Deception", "Strategy", "Stealth", "Getting away with it"], meaning: "Someone is being sneaky — possibly you. The Seven of Swords can mean theft, deception, or clever strategy. Check who's being dishonest in this situation, and whether that includes yourself.", reversed: "Confession, coming clean, strategy backfiring, imposter syndrome.", element: "Air", symbol: "🌬" },
  { id: 57, name: "Eight of Swords", suit: "Swords", number: "8", keywords: ["Restriction", "Feeling trapped", "Victimhood", "Mental prison"], meaning: "Bound and blindfolded — but look at the feet. Not tied. The Eight of Swords shows a mental prison: you feel trapped but the restrictions are largely self-imposed. You can walk away.", reversed: "Release, seeing clearly, breaking free, taking responsibility.", element: "Air", symbol: "🌬" },
  { id: 58, name: "Nine of Swords", suit: "Swords", number: "9", keywords: ["Anxiety", "Nightmares", "Worry", "Mental anguish"], meaning: "Waking up at 3am in a cold sweat. This card is anxiety, dread, and mental torment — often about things that are worse in your head than in reality. Are your fears accurate?", reversed: "Recovery from anxiety, fears being unfounded, finding help.", element: "Air", symbol: "🌬" },
  { id: 59, name: "Ten of Swords", suit: "Swords", number: "10", keywords: ["Betrayal", "Rock bottom", "Endings", "Painful conclusion"], meaning: "Ten swords in the back. A brutal ending — betrayal, rock bottom, or total collapse. Painful as it is, this is also the absolute lowest point. From here, things can only go up. The dawn is in the background.", reversed: "Recovery beginning, resisting the inevitable, partial healing.", element: "Air", symbol: "🌬" },
  { id: 60, name: "Page of Swords", suit: "Swords", number: "Page", keywords: ["Curiosity", "Vigilance", "New ideas", "Messenger"], meaning: "Sharp, curious, and maybe a bit nosy. The Page of Swords is alert and mentally agile — a quick thinker, a gossip, or someone bearing news. Watch what you say.", reversed: "Deception, all talk no action, cynicism, gossip.", element: "Air", symbol: "🌬" },
  { id: 61, name: "Knight of Swords", suit: "Swords", number: "Knight", keywords: ["Speed", "Ambition", "Blunt", "Charging ahead"], meaning: "Fast, sharp, and absolutely certain they're right. The Knight of Swords charges in without always thinking about the fallout. Brilliant mind, not always great timing.", reversed: "Recklessness, burnout, arguments, rushing in foolishly.", element: "Air", symbol: "🌬" },
  { id: 62, name: "Queen of Swords", suit: "Swords", number: "Queen", keywords: ["Clarity", "Independence", "Sharp mind", "Directness"], meaning: "Clear-eyed, sharp-tongued, and honest. The Queen of Swords cuts through nonsense and doesn't coddle. She's been through things — and is stronger for it. Respect her.", reversed: "Cold, bitter, cruel, using intelligence as a weapon.", element: "Air", symbol: "🌬" },
  { id: 63, name: "King of Swords", suit: "Swords", number: "King", keywords: ["Authority", "Intellect", "Truth", "Strategic thinking"], meaning: "The ultimate rational mind. The King of Swords sees clearly, speaks truth, and leads through intellect. Could be a lawyer, a doctor, an authority figure — or your own sharp analytical mind.", reversed: "Tyranny, manipulation, cold logic without empathy, abuse of power.", element: "Air", symbol: "🌬" },
  { id: 64, name: "Ace of Pentacles", suit: "Pentacles", number: "Ace", keywords: ["New opportunity", "Prosperity", "Manifestation", "Potential"], meaning: "A new material opportunity — money, a job, a project, a home. Solid, tangible potential. This offer is worth taking seriously.", reversed: "Missed opportunity, poor financial planning, lost potential.", element: "Earth", symbol: "🌿" },
  { id: 65, name: "Two of Pentacles", suit: "Pentacles", number: "2", keywords: ["Balance", "Juggling", "Adaptability", "Time management"], meaning: "Keeping multiple plates spinning. Life is busy and you're managing it — just about. A reminder to keep your balance and not let one area swallow all your energy.", reversed: "Overwhelm, dropping the ball, poor financial management.", element: "Earth", symbol: "🌿" },
  { id: 66, name: "Three of Pentacles", suit: "Pentacles", number: "3", keywords: ["Teamwork", "Skill", "Collaboration", "Craftsmanship"], meaning: "Good work done together. A card of skilled collaboration — everyone contributing their expertise. Apprenticeship, teamwork, or recognition of your craft.", reversed: "Poor teamwork, lack of skill, working alone when you shouldn't.", element: "Earth", symbol: "🌿" },
  { id: 67, name: "Four of Pentacles", suit: "Pentacles", number: "4", keywords: ["Security", "Holding on", "Control", "Scarcity mindset"], meaning: "Gripping your coins tight. There's a tension here between security and hoarding — holding on so tightly that nothing can flow. Is fear of loss stopping generosity or growth?", reversed: "Releasing control, generosity, financial openness.", element: "Earth", symbol: "🌿" },
  { id: 68, name: "Five of Pentacles", suit: "Pentacles", number: "5", keywords: ["Hardship", "Poverty", "Isolation", "Worry"], meaning: "Cold and struggling, outside in the snow. Financial hardship, material loss, or feeling excluded. The light of the church window is often missed — help may be closer than you think.", reversed: "Recovery, financial improvement, asking for help.", element: "Earth", symbol: "🌿" },
  { id: 69, name: "Six of Pentacles", suit: "Pentacles", number: "6", keywords: ["Generosity", "Charity", "Balance of giving", "Receiving"], meaning: "Giving and receiving in balance. Generosity, charity, or fair reward. Someone is sharing resources — or you're in a position of receiving what you need. Also asks: are you giving too much, or not enough?", reversed: "One-sided giving, debt, charity with strings attached.", element: "Earth", symbol: "🌿" },
  { id: 70, name: "Seven of Pentacles", suit: "Pentacles", number: "7", keywords: ["Patience", "Long-term view", "Investment", "Assessment"], meaning: "Leaning on a hoe, looking at what's grown. Time to assess: is the effort worth the return? A card of patience and long-term thinking. Not everything grows at the pace you want.", reversed: "Impatience, poor investment, lack of growth, giving up too soon.", element: "Earth", symbol: "🌿" },
  { id: 71, name: "Eight of Pentacles", suit: "Pentacles", number: "8", keywords: ["Diligence", "Skill-building", "Apprenticeship", "Craft"], meaning: "Head down, working. The Eight of Pentacles is pure dedication to the craft — practising, learning, improving. Mastery doesn't come overnight. Keep going.", reversed: "Cutting corners, perfectionism paralysis, lack of focus.", element: "Earth", symbol: "🌿" },
  { id: 72, name: "Nine of Pentacles", suit: "Pentacles", number: "9", keywords: ["Abundance", "Independence", "Luxury", "Self-sufficiency"], meaning: "Standing in a garden you built. Financial independence, self-sufficiency, and well-earned comfort. You did this. Enjoy the fruits of your labour — you've earned this peace.", reversed: "Dependence, over-working, financial setback, hollow success.", element: "Earth", symbol: "🌿" },
  { id: 73, name: "Ten of Pentacles", suit: "Pentacles", number: "10", keywords: ["Legacy", "Family wealth", "Tradition", "Long-term security"], meaning: "The whole picture — legacy, family, lasting wealth, and tradition. Everything built over a lifetime. Security that extends beyond yourself to those who come after.", reversed: "Family conflict over money, broken legacy, instability.", element: "Earth", symbol: "🌿" },
  { id: 74, name: "Page of Pentacles", suit: "Pentacles", number: "Page", keywords: ["Ambition", "Studious", "Practical beginnings", "Learning"], meaning: "Studying something new with focus and practical curiosity. The Page of Pentacles is ambitious, diligent, and just getting started. A new study, business idea, or practical project.", reversed: "Lack of focus, procrastination, impractical plans.", element: "Earth", symbol: "🌿" },
  { id: 75, name: "Knight of Pentacles", suit: "Pentacles", number: "Knight", keywords: ["Reliability", "Hard work", "Routine", "Patience"], meaning: "Slow, steady, and completely dependable. The Knight of Pentacles isn't flashy — but he shows up, does the work, and finishes what he starts. The one you can count on.", reversed: "Stubbornness, being stuck in routine, boredom, laziness.", element: "Earth", symbol: "🌿" },
  { id: 76, name: "Queen of Pentacles", suit: "Pentacles", number: "Queen", keywords: ["Nurturing", "Practical", "Abundance", "Home"], meaning: "Warm, practical, and abundant. The Queen of Pentacles creates comfort — a lovely home, financial security, care for others. She makes things work with quiet competence.", reversed: "Neglecting self, smothering, financial insecurity, being overly materialistic.", element: "Earth", symbol: "🌿" },
  { id: 77, name: "King of Pentacles", suit: "Pentacles", number: "King", keywords: ["Wealth", "Stability", "Business", "Provider"], meaning: "A provider and builder. The King of Pentacles has made it — financial success, business acumen, dependable leadership. Material mastery built through effort and good judgement.", reversed: "Stubbornness, materialism, poor financial decisions, greed.", element: "Earth", symbol: "🌿" },
];

const ALL_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];

const SUIT_COLORS = {
  "Major Arcana": { accent: "#c4714a", glow: "#c4714a30", bg: "#1e1008" },
  "Wands":        { accent: "#d4895a", glow: "#d4895a30", bg: "#1c0e06" },
  "Cups":         { accent: "#b5836a", glow: "#b5836a30", bg: "#1a0e0a" },
  "Swords":       { accent: "#c9a882", glow: "#c9a88230", bg: "#1a1208" },
  "Pentacles":    { accent: "#a87d5a", glow: "#a87d5a30", bg: "#180e06" },
};

const SPREADS = {
  three: {
    name: "3-Card Spread",
    desc: "Past · Present · Future",
    count: 3,
    positions: ["Past", "Present", "Future"],
    positionDesc: [
      "What has led you here — the foundation or the wound.",
      "Where you stand right now — the energy you're working with.",
      "Where things are heading — the likely outcome if you continue on this path."
    ],
    layout: [[0,1,2]],
  },
  four: {
    name: "4-Card Spread",
    desc: "Situation · Action · Obstacle · Outcome",
    count: 4,
    positions: ["Situation", "Action", "Obstacle", "Outcome"],
    positionDesc: [
      "The heart of the matter — what the reading is really about.",
      "What you should do — the recommended course of action.",
      "What's in the way — the challenge or block to navigate.",
      "Where this leads — the likely result of taking action."
    ],
    layout: [[0,1,2,3]],
  },
  five: {
    name: "5-Card Spread",
    desc: "Mind · Body · Spirit · Want · Need",
    count: 5,
    positions: ["Mind", "Body", "Spirit", "What You Want", "What You Need"],
    positionDesc: [
      "Your thoughts and mental state right now.",
      "Your physical energy, health, or practical reality.",
      "Your deeper spiritual or emotional truth.",
      "What you consciously desire from this situation.",
      "What would actually serve you — which may differ from what you want."
    ],
    layout: [[0,1,2],[3,4]],
  },
  celtic: {
    name: "7-Card Spread",
    desc: "A deeper situational reading",
    count: 7,
    positions: ["Present", "Challenge", "Past", "Future", "Foundation", "Hopes & Fears", "Outcome"],
    positionDesc: [
      "The central energy surrounding you right now.",
      "What crosses or challenges you — the main obstacle.",
      "What's behind you — the recent past influencing things.",
      "What's ahead — where things are moving.",
      "The root of the matter — hidden or subconscious influences.",
      "Your hopes or fears around this situation.",
      "The final outcome — where it all leads."
    ],
    layout: [[null,0,null],[2,1,3],[null,4,null],[5,null,6]],
  },
  eight: {
    name: "8-Card Spread",
    desc: "Full life areas reading",
    count: 8,
    positions: ["Self", "Home & Family", "Love", "Work", "Health", "Finances", "Spirituality", "Hidden Influence"],
    positionDesc: [
      "Your current sense of self — who you are being right now.",
      "The energy in your home life and family relationships.",
      "Your love life — romantic or close emotional connections.",
      "Career, work, and ambitions.",
      "Your physical and mental wellbeing.",
      "Your relationship with money and material security.",
      "Your inner life, intuition, and spiritual path.",
      "Something beneath the surface influencing everything else."
    ],
    layout: [[0,1],[2,3],[4,5],[6,7]],
  },
  nine: {
    name: "9-Card Spread",
    desc: "The three realms — past, present, future across mind, body, spirit",
    count: 9,
    positions: [
      "Past Mind","Past Body","Past Spirit",
      "Present Mind","Present Body","Present Spirit",
      "Future Mind","Future Body","Future Spirit"
    ],
    positionDesc: [
      "How you used to think — past patterns of mind.",
      "Your physical reality and actions in the past.",
      "The spiritual or emotional truth of where you've been.",
      "Your current thoughts and mental state.",
      "Your body, health, and physical world right now.",
      "Your emotional and spiritual state in this moment.",
      "The mindset that will serve you going forward.",
      "Physical changes or actions coming your way.",
      "The deeper soul lesson or spiritual direction ahead."
    ],
    layout: [[0,1,2],[3,4,5],[6,7,8]],
  },
  celtic_cross: {
    name: "Celtic Cross",
    desc: "The classic 10-card reading",
    count: 10,
    positions: ["The Present", "The Challenge", "The Foundation", "The Recent Past", "The Possible Future", "The Near Future", "Your Attitude", "External Influences", "Hopes & Fears", "The Outcome"],
    positionDesc: [
      "The central energy of the situation — what surrounds you right now.",
      "What crosses or complicates you — the main obstacle or tension.",
      "The root beneath it all — subconscious influences or the foundation of the matter.",
      "What has just passed — energies that are fading but still relevant.",
      "What could be — a potential outcome if things continue as they are.",
      "What's coming in the near term — the next development on the horizon.",
      "How you see yourself in this situation — your attitude and inner stance.",
      "How others see you, or outside forces affecting the situation.",
      "What you hope for — or fear. Often both at once.",
      "The final outcome — where all these energies are leading."
    ],
    layout: [
      [null, 2, null, null, null],
      [3, 0, 4, null, 6],
      [null, 1, null, null, 7],
      [null, 5, null, null, 8],
      [null, null, null, null, 9],
    ],
  },
  horseshoe: {
    name: "Horseshoe",
    desc: "7-card spread for specific questions",
    count: 7,
    positions: ["The Past", "The Present", "Hidden Influences", "Obstacles", "Attitudes of Others", "What You Should Do", "Likely Outcome"],
    positionDesc: [
      "Recent events that have shaped the current situation.",
      "Where things stand right now — the current energy.",
      "What's working beneath the surface, unseen but influential.",
      "The block or challenge standing between you and resolution.",
      "How others involved in this situation view it or are acting.",
      "The recommended course of action — what to do next.",
      "Where this is heading if you follow the guidance of this reading."
    ],
    layout: [[0,1,2,3,4,5,6]],
  },
  yes_no: {
    name: "Yes / No",
    desc: "3-card directional reading for a specific question",
    count: 3,
    positions: ["Energy Around the Question", "What Supports a Yes", "What Suggests No or Caution"],
    positionDesc: [
      "The overall energy surrounding your question — the context the answer sits within.",
      "Cards or forces pointing toward yes, forward movement, or a positive outcome.",
      "Cards or forces urging caution, delay, or pointing toward no."
    ],
    layout: [[0,1,2]],
  },
  relationship: {
    name: "Relationship",
    desc: "6-card reading for connection between two people",
    count: 6,
    positions: ["How You See Them", "How They See You", "What You Bring", "What They Bring", "The Challenge Between You", "The Potential"],
    positionDesc: [
      "Your perception of the other person — conscious or unconscious.",
      "How they perceive you — the energy you project in their eyes.",
      "What you contribute to this connection — your gifts and your shadow.",
      "What they contribute — their gifts and their shadow.",
      "The central tension or challenge between you that needs to be navigated.",
      "What this relationship is capable of becoming — its highest possibility."
    ],
    layout: [[0,1],[2,3],[4,5]],
  },
  year_ahead: {
    name: "Year Ahead",
    desc: "12 cards — one per month",
    count: 12,
    positions: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    positionDesc: [
      "The energy and themes of January.",
      "The energy and themes of February.",
      "The energy and themes of March.",
      "The energy and themes of April.",
      "The energy and themes of May.",
      "The energy and themes of June.",
      "The energy and themes of July.",
      "The energy and themes of August.",
      "The energy and themes of September.",
      "The energy and themes of October.",
      "The energy and themes of November.",
      "The energy and themes of December.",
    ],
    layout: [[0,1,2,3],[4,5,6,7],[8,9,10,11]],
  },
  astrological: {
    name: "Astrological",
    desc: "12 cards — one per zodiac house",
    count: 12,
    positions: [
      "1st House — Self","2nd House — Money","3rd House — Communication",
      "4th House — Home","5th House — Creativity","6th House — Health",
      "7th House — Relationships","8th House — Transformation","9th House — Philosophy",
      "10th House — Career","11th House — Community","12th House — The Hidden"
    ],
    positionDesc: [
      "Your identity, appearance, and how you present to the world.",
      "Your finances, possessions, and relationship with material security.",
      "How you communicate, think, and connect with those around you.",
      "Your home, roots, family, and sense of belonging.",
      "Your creativity, pleasure, romance, and self-expression.",
      "Your daily routines, health, and how you serve others.",
      "Your partnerships — romantic, business, and significant one-on-one connections.",
      "Change, death, rebirth, shared resources, and what lies beneath the surface.",
      "Your beliefs, travel, higher education, and search for meaning.",
      "Your career, public reputation, and long-term ambitions.",
      "Your friendships, social circles, hopes, and collective purpose.",
      "What's hidden, subconscious, self-undoing, and the unseen spiritual realm."
    ],
    layout: [[0,1,2,3],[4,5,6,7],[8,9,10,11]],
  },
  shadow_work: {
    name: "Shadow Work",
    desc: "5-card reading for self-discovery",
    count: 5,
    positions: ["What You're Hiding From Yourself", "Why You Hide It", "What It's Costing You", "What Healing Looks Like", "Your First Step"],
    positionDesc: [
      "The part of yourself you've pushed down, denied, or refused to look at.",
      "The root fear, wound, or belief that makes this shadow feel too dangerous to face.",
      "How carrying this hidden thing is affecting your life, relationships, and energy.",
      "What integration and wholeness could look like — the other side of this work.",
      "The most immediate, honest action you can take toward facing and healing this shadow."
    ],
    layout: [[0,1,2],[null,3,4]],
  },
};

const DECKS = [
  {
    id: "rws",
    name: "Rider-Waite-Smith",
    short: "Rider-Waite",
    year: "1909",
    tradition: "Western esoteric / Golden Dawn",
    symbol: "✦",
    description: "The most widely used deck in the world. Illustrated by Pamela Colman Smith under Arthur Edward Waite's direction. All 78 cards have pictorial scenes, making it the foundation for most modern tarot reading and interpretation.",
    readingNotes: "Readings follow the classic Rider-Waite-Smith symbolism. Pay close attention to the imagery — every figure, colour, and background detail carries meaning. The Minor Arcana scenes are particularly rich in narrative.",
    variants: ["Universal Waite", "Radiant Rider-Waite", "Centennial Rider Waite", "Smith-Waite Centennial"],
  },
  {
    id: "thoth",
    name: "Thoth Tarot",
    short: "Thoth",
    year: "1943",
    tradition: "Thelema / Hermetic Kabbalah",
    symbol: "☽",
    description: "Created by Aleister Crowley and painted by Lady Frieda Harris. Deeply rooted in Kabbalah, astrology, and numerology. More abstract and esoteric than RWS — the imagery is geometric and symbolic rather than narrative.",
    readingNotes: "Thoth readings draw heavily on astrological and Kabbalistic correspondence. The court cards are renamed (Knight/Queen/Prince/Princess instead of King/Queen/Knight/Page). Justice is card VIII and Strength is XI — the reverse of RWS. Meanings carry more psychological and initiatory weight.",
    variants: ["Harris Thoth", "Thoth Tarot Large", "Crowley Thoth"],
  },
  {
    id: "marseille",
    name: "Tarot de Marseille",
    short: "Marseille",
    year: "c.1650",
    tradition: "French / Italian playing card tradition",
    symbol: "⊕",
    description: "One of the oldest and most historically significant tarot traditions. The Minor Arcana are pip cards — non-illustrated suits showing only the suit symbols. Readings rely heavily on numerology, suit energies, and the richly symbolic Major Arcana.",
    readingNotes: "Marseille readings focus more on intuition, numerology, and the pip structure than on illustrated scenes. The Major Arcana imagery differs from RWS in key ways — Justice is VIII and Strength (La Force) is XI. The court cards are Valet, Cavalier, Reine, and Roy.",
    variants: ["Camoin-Jodorowsky", "Nicolas Conver", "Jean Dodal", "Tarot de Paris"],
  },
  {
    id: "osho",
    name: "Osho Zen Tarot",
    short: "Osho Zen",
    year: "1994",
    tradition: "Zen Buddhism / transpersonal psychology",
    symbol: "◎",
    description: "A non-traditional deck created by Ma Deva Padma. Rather than fortune-telling, it's designed as a tool for meditation and self-awareness. The suits are renamed (Fire, Water, Clouds, Rainbows) and many Major Arcana have different names and meanings.",
    readingNotes: "Osho Zen readings focus on the present moment and inner states rather than prediction. Cards represent psychological and spiritual energies. Don't apply standard RWS meanings — the imagery and intention are distinctly different. Excellent for shadow work and personal insight.",
    variants: ["Standard Osho Zen"],
  },
  {
    id: "lenormand",
    name: "Lenormand",
    short: "Lenormand",
    year: "c.1800",
    tradition: "French cartomancy",
    symbol: "⟡",
    description: "Technically not tarot — Lenormand is a 36-card oracle system named after French fortune-teller Marie Anne Lenormand. Cards are more literal and concrete than tarot, read primarily in combinations and chains rather than individually.",
    readingNotes: "Lenormand works very differently to tarot. Cards are almost always read in pairs or larger tableaux — a single card rarely stands alone. Meanings are more concrete and event-based. If you're using this for spreads, focus on how cards modify each other.",
    variants: ["Blue Owl", "Mystical Lenormand", "Gilded Reverie"],
  },
  {
    id: "wild-unknown",
    name: "The Wild Unknown",
    short: "Wild Unknown",
    year: "2012",
    tradition: "RWS-based / nature symbolism",
    symbol: "🌿",
    description: "Created by Kim Krans. A modern deck with stark black-and-white imagery drawn from nature — animals, plants, and geometric forms. RWS-compatible in structure but with a distinctly intuitive, nature-based energy.",
    readingNotes: "The Wild Unknown follows RWS card structure and meanings closely, so standard interpretations apply. The animal imagery adds an instinctual, nature-based layer — pay attention to which animal appears and its symbolic associations. The stark aesthetic invites slower, more meditative readings.",
    variants: ["Original", "Animal Spirit Oracle"],
  },
  {
    id: "modern-witch",
    name: "Modern Witch Tarot",
    short: "Modern Witch",
    year: "2019",
    tradition: "RWS-based / contemporary feminist",
    symbol: "☾",
    description: "Created by Lisa Sterle. A direct reimagining of RWS with diverse, modern characters — all the figures are women or non-binary people in contemporary settings. Fully RWS-compatible.",
    readingNotes: "Meanings follow RWS exactly — any standard tarot interpretation applies. The modern imagery can make the symbolism feel more immediately relatable, especially for younger readers or those who found the classic imagery dated.",
    variants: ["Standard edition"],
  },
  {
    id: "other",
    name: "Other / Custom Deck",
    short: "Other",
    year: "",
    tradition: "Various",
    symbol: "✧",
    description: "Using a deck not listed here, or a custom or handmade deck. Readings will use general tarot symbolism and card meanings as a foundation.",
    readingNotes: "General tarot card meanings will be used as the interpretive foundation. If your deck has significantly different symbolism or is non-RWS, use the individual card meanings as a starting point and trust your intuition with the specific imagery in front of you.",
    variants: [],
  },
];

export default function TarotApp() {
  // Load persisted defaults from localStorage
  const savedDeckId = (() => { try { return localStorage.getItem("aurin_default_deck"); } catch { return null; } })();
  const savedSpreadKey = (() => { try { return localStorage.getItem("aurin_default_spread"); } catch { return null; } })();

  const [screen, setScreen] = useState("home"); // home | settings | deck-select | pick-spread | build-reading | reading | browse | card-detail
  const [activeDeck, setActiveDeck] = useState(() => DECKS.find(d => d.id === savedDeckId) || null);
  const [activeSpread, setActiveSpread] = useState(null);
  const [spreadSlots, setSpreadSlots] = useState([]);
  const [pickingSlot, setPickingSlot] = useState(null);
  const [search, setSearch] = useState("");
  const [filterSuit, setFilterSuit] = useState("All");
  const [detailCard, setDetailCard] = useState(null);
  const [detailReversed, setDetailReversed] = useState(false);
  const [readingInsight, setReadingInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [readingQuestion, setReadingQuestion] = useState("");
  const [readingDate, setReadingDate] = useState(() => new Date().toISOString().slice(0, 16));
  const [defaultDeckId, setDefaultDeckId] = useState(savedDeckId);
  const [defaultSpreadKey, setDefaultSpreadKey] = useState(savedSpreadKey);
  const [reactionVideoUrl, setReactionVideoUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [showReactionRecorder, setShowReactionRecorder] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [shareAnonymous, setShareAnonymous] = useState(false);
  const [allowAurinShare, setAllowAurinShare] = useState(false);
  const [shareSubmitted, setShareSubmitted] = useState(false);
  const [showAdminQueue, setShowAdminQueue] = useState(false);
  const [adminQueue, setAdminQueue] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aurin_admin_queue") || "[]"); } catch { return []; }
  });
  const mediaRecorderRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Onboarding
  const hasOnboarded = (() => { try { return localStorage.getItem("aurin_onboarded") === "true"; } catch { return false; } })();
  const [onboardingStep, setOnboardingStep] = useState(hasOnboarded ? null : 0);
  const [onboardLevel, setOnboardLevel] = useState(null);
  const [onboardMoment, setOnboardMoment] = useState(null);
  const [onboardIntention, setOnboardIntention] = useState("");
  const [showDailyCard, setShowDailyCard] = useState(false);
  const [dailyCard, setDailyCard] = useState(null);
  const [dailyCardInsight, setDailyCardInsight] = useState("");
  const [loadingDailyInsight, setLoadingDailyInsight] = useState(false);
  const [dailyJournal, setDailyJournal] = useState("");

  // Guided session
  const [guidedSession, setGuidedSession] = useState(null);
  // guidedSession states: null | "settle" | "breathe" | "intention" | "shuffle" | "listening" | "confirm" | "reveal" | "reading"
  const [guidedSpreadKey, setGuidedSpreadKey] = useState(null);
  const [guidedSlots, setGuidedSlots] = useState([]); // {card, reversed, confidence} or null
  const [currentGuidedSlot, setCurrentGuidedSlot] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState("in"); // in | hold | out
  const [guidedQuestion, setGuidedQuestion] = useState("");
  const [listeningStatus, setListeningStatus] = useState("idle"); // idle | listening | heard | nomatch
  const [heardText, setHeardText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealIndex, setRevealIndex] = useState(0);
  const breathTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const guidedVideoRef = useRef(null);
  const guidedRecorderRef = useRef(null);
  const guidedChunksRef = useRef([]);

  const RITUAL_TIMES = {
    "morning":  { label: "Morning before the world wakes up", time: "07:00", days: "daily",   emoji: "🌅" },
    "lunch":    { label: "Lunchtime, when I need a reset",    time: "12:30", days: "daily",   emoji: "☕" },
    "evening":  { label: "Evening wind-down",                 time: "20:30", days: "tue-wed", emoji: "🌙" },
    "latenight":{ label: "Late night when it's quiet",        time: "22:00", days: "daily",   emoji: "✦"  },
    "weekends": { label: "Weekends only",                     time: "09:00", days: "sat",     emoji: "🌿" },
  };

  const completeOnboarding = () => {
    try {
      localStorage.setItem("aurin_onboarded", "true");
      if (onboardMoment) localStorage.setItem("aurin_ritual_time", onboardMoment);
      if (onboardIntention) localStorage.setItem("aurin_intention", onboardIntention);
      if (onboardLevel) localStorage.setItem("aurin_level", onboardLevel);
    } catch {}
    setOnboardingStep(null);
    // Show daily card straight after onboarding
    const card = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)];
    setDailyCard(card);
    setShowDailyCard(true);
  };

  const getDailyInsight = async (card, intention) => {
    setLoadingDailyInsight(true);
    setDailyCardInsight("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a warm, wise tarot reader. Someone has drawn their daily card: ${card.name}.
${intention ? `Their intention or what they're seeking: "${intention}"` : ""}
Keywords: ${card.keywords.join(", ")}

Write 2-3 sentences of daily guidance — warm, direct, personal. End with a single reflection question for them to sit with today. Use British English. No fluff, no disclaimers. Write as if speaking gently to a friend.`
          }]
        })
      });
      const data = await response.json();
      setDailyCardInsight(data.content?.map(b => b.text || "").join("") || "");
    } catch { setDailyCardInsight("Take a moment to sit with this card today. What does it stir in you?"); }
    setLoadingDailyInsight(false);
  };

  const saveDefaultDeck = (deckId) => {
    try { localStorage.setItem("aurin_default_deck", deckId); } catch {}
    setDefaultDeckId(deckId);
  };

  const saveDefaultSpread = (spreadKey) => {
    try { localStorage.setItem("aurin_default_spread", spreadKey); } catch {}
    setDefaultSpreadKey(spreadKey);
  };

  const clearDefaults = () => {
    try { localStorage.removeItem("aurin_default_deck"); localStorage.removeItem("aurin_default_spread"); } catch {}
    setDefaultDeckId(null);
    setDefaultSpreadKey(null);
    setActiveDeck(null);
  };

  const downloadReading = () => {
    const now = new Date(readingDate);
    const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const divider = "═".repeat(56);
    const thinDivider = "─".repeat(56);

    let text = "";
    text += `\n${divider}\n`;
    text += `  ✦  TAROT READING  ✦\n`;
    text += `${divider}\n\n`;
    text += `  Date     ${dateStr}\n`;
    text += `  Time     ${timeStr}\n`;
    if (activeDeck) text += `  Deck     ${activeDeck.name}\n`;
    text += `  Spread   ${activeSpread.name} — ${activeSpread.desc}\n`;
    if (readingQuestion.trim()) {
      text += `\n  Question\n  ${readingQuestion.trim()}\n`;
    }
    text += `\n${divider}\n\n`;
    text += `  CARDS\n\n`;

    spreadSlots.forEach((s, i) => {
      text += `  ${i + 1}. ${activeSpread.positions[i].toUpperCase()}\n`;
      text += `     ${s.card.name}${s.reversed ? " (Reversed)" : ""}\n`;
      text += `     ${s.card.keywords.join(" · ")}\n`;
      text += `\n     ${s.reversed ? s.card.reversed : s.card.meaning}\n\n`;
      if (i < spreadSlots.length - 1) text += `  ${thinDivider}\n\n`;
    });

    if (readingInsight) {
      text += `\n${divider}\n\n`;
      text += `  FULL READING\n\n`;
      const wrapped = readingInsight.match(/.{1,54}(\s|$)/g) || [readingInsight];
      wrapped.forEach(line => { text += `  ${line.trim()}\n`; });
    }

    text += `\n\n${divider}\n`;
    text += `  Generated with The Arcana Tarot Companion\n`;
    text += `${divider}\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = dateStr.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    a.download = `tarot-reading-${safeName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startRecording = async () => {
    setCameraError(null);
    recordedChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }
      const mr = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm" });
      mr.ondataavailable = e => { if (e.data.size > 0) recordedChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setReactionVideoUrl(url);
        stream.getTracks().forEach(t => t.stop());
        if (videoPreviewRef.current) videoPreviewRef.current.srcObject = null;
      };
      mediaRecorderRef.current = mr;
      mr.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera and microphone access to record your reaction.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const discardRecording = () => {
    setReactionVideoUrl(null);
    setIsRecording(false);
    setRecordingSeconds(0);
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current) {
      try { mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop()); } catch {}
    }
  };

  const formatSeconds = (s) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

  const submitToAurinQueue = () => {
    const entry = {
      id: Date.now(),
      date: new Date(readingDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
      spread: activeSpread?.name,
      question: readingQuestion || null,
      deck: activeDeck?.name || null,
      reading: readingInsight || null,
      cards: spreadSlots.map((s, i) => s ? `${activeSpread?.positions[i]}: ${s.card.name}${s.reversed ? " (R)" : ""}` : null).filter(Boolean),
      hasVideo: !!reactionVideoUrl,
      anonymous: shareAnonymous,
      status: "pending",
    };
    const updated = [entry, ...adminQueue];
    try { localStorage.setItem("aurin_admin_queue", JSON.stringify(updated)); } catch {}
    setAdminQueue(updated);
    setShareSubmitted(true);
  };

  const updateQueueItem = (id, status) => {
    const updated = adminQueue.map(item => item.id === id ? { ...item, status } : item);
    try { localStorage.setItem("aurin_admin_queue", JSON.stringify(updated)); } catch {}
    setAdminQueue(updated);
  };

  const nativeShare = async () => {
    const text = `✦ My ${activeSpread?.name || "tarot"} reading on Aurín${readingQuestion ? ` — "${readingQuestion}"` : ""}\n\n${readingInsight || ""}\n\naurin.app`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Aurín Reading", text, url: "https://aurin.app" });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    }
  };

  const shareToplatform = (platform) => {
    const text = encodeURIComponent(`✦ My ${activeSpread?.name || "tarot"} reading on Aurín — aurin.app`);
    const url = encodeURIComponent("https://aurin.app");
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank", "noopener");
  };

  // ─── Guided session helpers ─────────────────────────────────

  const startGuidedSession = (spreadKey) => {
    const spread = SPREADS[spreadKey];
    setGuidedSpreadKey(spreadKey);
    setGuidedSlots(Array(spread.count).fill(null));
    setCurrentGuidedSlot(0);
    setBreathCount(0);
    setBreathPhase("in");
    setGuidedQuestion("");
    setHeardText("");
    setListeningStatus("idle");
    setIsRevealing(false);
    setRevealIndex(0);
    setReactionVideoUrl(null);
    setReadingInsight("");
    setGuidedSession("settle");
  };

  const startBreathing = () => {
    setGuidedSession("breathe");
    setBreathCount(0);
    setBreathPhase("in");
    let count = 0;
    let phase = "in";
    breathTimerRef.current = setInterval(() => {
      if (phase === "in") { phase = "hold"; setBreathPhase("hold"); }
      else if (phase === "hold") { phase = "out"; setBreathPhase("out"); }
      else {
        phase = "in"; count++;
        setBreathCount(count);
        setBreathPhase("in");
        if (count >= 3) {
          clearInterval(breathTimerRef.current);
          setTimeout(() => setGuidedSession("intention"), 800);
        }
      }
    }, 2000);
  };

  // Build a normalised name lookup for speech matching
  const buildCardLookup = () => {
    const lookup = {};
    ALL_CARDS.forEach(card => {
      const key = card.name.toLowerCase()
        .replace(/^the /, "")
        .replace(/of /g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim();
      lookup[key] = card;
      // Also index by short versions
      const words = card.name.toLowerCase().split(" ");
      if (words.length > 1) lookup[words.slice(-2).join(" ")] = card;
      lookup[card.name.toLowerCase()] = card;
    });
    return lookup;
  };

  const matchCardFromSpeech = (transcript) => {
    const lookup = buildCardLookup();
    const t = transcript.toLowerCase().trim();
    // Direct match
    if (lookup[t]) return { card: lookup[t], confidence: "high" };
    // Partial match — find best
    let best = null;
    let bestScore = 0;
    ALL_CARDS.forEach(card => {
      const name = card.name.toLowerCase();
      const words = name.split(" ");
      let score = 0;
      words.forEach(w => { if (t.includes(w) && w.length > 2) score++; });
      if (score > bestScore) { bestScore = score; best = card; }
    });
    if (bestScore >= 2) return { card: best, confidence: "medium" };
    if (bestScore === 1) return { card: best, confidence: "low" };
    return null;
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      // No speech recognition — go straight to tap-to-fill
      setGuidedSession("listening");
      setListeningStatus("nospeech");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-GB";
    recognition.onstart = () => setListeningStatus("listening");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setHeardText(transcript);
      const match = matchCardFromSpeech(transcript);
      if (match) {
        setListeningStatus("heard");
        const newSlots = [...guidedSlots];
        newSlots[currentGuidedSlot] = { card: match.card, reversed: false, confidence: match.confidence };
        setGuidedSlots(newSlots);
        setTimeout(() => {
          const nextSlot = currentGuidedSlot + 1;
          const spread = SPREADS[guidedSpreadKey];
          if (nextSlot < spread.count) {
            setCurrentGuidedSlot(nextSlot);
            setListeningStatus("idle");
            setHeardText("");
          } else {
            // All cards filled — go to confirm
            setGuidedSession("confirm");
          }
        }, 1200);
      } else {
        setListeningStatus("nomatch");
      }
    };
    recognition.onerror = () => setListeningStatus("nomatch");
    recognition.onend = () => { if (listeningStatus === "listening") setListeningStatus("idle"); };
    recognitionRef.current = recognition;
    recognition.start();
    setGuidedSession("listening");
  };

  const triggerRevealThenRecord = async () => {
    setIsRevealing(true);
    setRevealIndex(0);
    setGuidedSession("reveal");
    // Animate cards appearing one by one quickly
    for (let i = 0; i < SPREADS[guidedSpreadKey].count; i++) {
      await new Promise(r => setTimeout(r, 300));
      setRevealIndex(i + 1);
    }
    await new Promise(r => setTimeout(r, 600));
    setIsRevealing(false);
    // Start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
      if (guidedVideoRef.current) { guidedVideoRef.current.srcObject = stream; guidedVideoRef.current.play(); }
      guidedChunksRef.current = [];
      const mr = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm" });
      mr.ondataavailable = e => { if (e.data.size > 0) guidedChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(guidedChunksRef.current, { type: "video/webm" });
        setReactionVideoUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
        if (guidedVideoRef.current) guidedVideoRef.current.srcObject = null;
      };
      guidedRecorderRef.current = mr;
      mr.start(100);
    } catch { /* camera denied — no recording, continue to reading */ }
    // Transfer guided slots into main spread slots and run the spread
    const spreadData = SPREADS[guidedSpreadKey];
    setActiveSpread({ ...spreadData, key: guidedSpreadKey });
    setSpreadSlots(guidedSlots);
    if (activeDeck || defaultDeckId) setActiveDeck(DECKS.find(d => d.id === (activeDeck?.id || defaultDeckId)) || null);
    setReadingQuestion(guidedQuestion);
    setReadingDate(new Date().toISOString().slice(0, 16));
    setGuidedSession("reading");
  };

  const stopGuidedRecording = () => {
    if (guidedRecorderRef.current) {
      try { guidedRecorderRef.current.stop(); } catch {}
    }
  };

  const closeGuidedSession = () => {
    stopGuidedRecording();
    clearInterval(breathTimerRef.current);
    try { recognitionRef.current?.stop(); } catch {}
    setGuidedSession(null);
    setGuidedSlots([]);
    setCurrentGuidedSlot(0);
  };

  const suits = ["All", "Major Arcana", "Wands", "Cups", "Swords", "Pentacles"];

  const filtered = ALL_CARDS.filter(c => {
    const ms = filterSuit === "All" || c.suit === filterSuit;
    const mq = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
    return ms && mq;
  });

  const startSpread = (spreadKey) => {
    const spread = SPREADS[spreadKey];
    setActiveSpread({ ...spread, key: spreadKey });
    setSpreadSlots(Array(spread.count).fill(null));
    setPickingSlot(null);
    setReadingInsight("");
    setExpandedSlot(null);
    setReadingQuestion("");
    setReadingDate(new Date().toISOString().slice(0, 16));
    // Apply default deck if none currently active
    if (!activeDeck && defaultDeckId) {
      setActiveDeck(DECKS.find(d => d.id === defaultDeckId) || null);
    }
    setScreen("build-reading");
  };

  const handleSpreadFromHome = () => {
    if (defaultSpreadKey && SPREADS[defaultSpreadKey]) {
      startSpread(defaultSpreadKey);
    } else {
      setScreen("pick-spread");
    }
  };

  const assignCard = (card) => {
    if (pickingSlot === null) return;
    const newSlots = [...spreadSlots];
    newSlots[pickingSlot] = { card, reversed: false };
    setSpreadSlots(newSlots);
    setPickingSlot(null);
    setSearch("");
  };

  const toggleReversed = (idx) => {
    const newSlots = [...spreadSlots];
    if (newSlots[idx]) newSlots[idx] = { ...newSlots[idx], reversed: !newSlots[idx].reversed };
    setSpreadSlots(newSlots);
  };

  const removeCard = (idx) => {
    const newSlots = [...spreadSlots];
    newSlots[idx] = null;
    setSpreadSlots(newSlots);
    if (expandedSlot === idx) setExpandedSlot(null);
  };

  const allFilled = spreadSlots.length > 0 && spreadSlots.every(s => s !== null);

  const getReadingInsight = async () => {
    setLoadingInsight(true);
    setReadingInsight("");
    const cardList = spreadSlots.map((s, i) =>
      `Position ${i+1} — ${activeSpread.positions[i]}: ${s.card.name}${s.reversed ? " (reversed)" : ""}`
    ).join("\n");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a wise, experienced tarot reader with a warm, direct, and insightful voice.

The querent is using a ${activeDeck ? activeDeck.name : "standard tarot"} deck.
${activeDeck ? `Deck tradition: ${activeDeck.tradition}. Reading notes: ${activeDeck.readingNotes}` : ""}

The querent has laid out a ${activeSpread.name} (${activeSpread.desc}).
${readingQuestion.trim() ? `Their question: "${readingQuestion.trim()}"` : "No specific question was asked — read for general guidance."}

Here are the cards in each position:
${cardList}

Write a flowing, 4-6 sentence overall reading that weaves all the cards together into a coherent narrative. Where relevant, honour the specific tradition and symbolism of the ${activeDeck ? activeDeck.name : "deck"} being used. Don't list cards one by one — synthesise them into a reading that tells a story. Be specific, resonant, and genuinely insightful. Use British English. Write as a skilled reader would speak — warm, direct, no fluff, no disclaimers.`
          }]
        })
      });
      const data = await response.json();
      setReadingInsight(data.content?.map(b => b.text || "").join("") || "Could not generate reading.");
    } catch {
      setReadingInsight("Could not connect right now. Check each card's individual meaning above.");
    }
    setLoadingInsight(false);
  };



  const renderSlotCard = (slotIdx, ci) => {
    if (slotIdx === null) return <div key={ci} style={{ flex: 1, maxWidth: "130px" }} />;
    const slot = spreadSlots[slotIdx];
    const isActive = pickingSlot === slotIdx;
    const sc = slot ? SUIT_COLORS[slot.card.suit] : null;
    return (
      <div key={ci} style={{ flex: 1, maxWidth: "130px" }}>
        <div style={{ fontSize: "10px", color: "#9a7055", textAlign: "center", marginBottom: "6px" }}>
          {slotIdx + 1}. {activeSpread.positions[slotIdx]}
        </div>
        <div
          className={`spread-card ${slot ? "filled" : ""}`}
          style={{
            borderColor: isActive ? "#c4714a" : slot ? sc.accent + "60" : "#c4a08a40",
            background: isActive ? "#f5e8da" : slot ? sc.bg + "88" : "#ede0d440",
            minHeight: "90px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px", borderRadius: "8px", border: "1px solid", cursor: "pointer", transition: "all 0.2s",
            boxShadow: slot ? `0 0 12px ${sc.glow}` : "none",
          }}
          onClick={() => {
            if (screen === "build-reading") {
              setPickingSlot(pickingSlot === slotIdx ? null : slotIdx);
            } else {
              setExpandedSlot(expandedSlot === slotIdx ? null : slotIdx);
            }
          }}
        >
          {slot ? (
            <>
              <div style={{ fontSize: "22px", marginBottom: "4px" }}>{slot.card.symbol}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "9px", color: sc.accent, textAlign: "center", lineHeight: 1.3 }}>{slot.card.name}{slot.reversed ? " ↓" : ""}</div>
              {slot.reversed && <div style={{ fontSize: "9px", color: "#c4714a", marginTop: "2px" }}>reversed</div>}
            </>
          ) : (
            <div style={{ fontSize: "22px", color: isActive ? "#c4714a" : "#c4a08a" }}>+</div>
          )}
        </div>
      </div>
    );
  };

  // Pre-computed vars
  const selectedDeck = DECKS.find(d => d.id === defaultDeckId) || null;
  const selectedSpread = defaultSpreadKey ? SPREADS[defaultSpreadKey] : null;
  const savedIntention = (() => { try { return localStorage.getItem("aurin_intention") || ""; } catch { return ""; } })();
  const currentSpread = guidedSpreadKey ? SPREADS[guidedSpreadKey] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#f5ede4", color: "#2c1a0e", fontFamily: "'Crimson Text', Georgia, serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #f5ede4; } ::-webkit-scrollbar-thumb { background: #c4a08a; border-radius: 3px; }
        .btn { background: transparent; border: 1px solid #c4a08a; color: #8a5a3a; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-family: 'Crimson Text', serif; font-size: 15px; transition: all 0.2s; }
        .btn:hover { border-color: #c4714a; color: #2c1a0e; background: rgba(196,113,74,0.05); }
        .btn.gold { border-color: #c4714a; color: #c4714a; background: rgba(196,113,74,0.08); }
        .btn.gold:hover { border-color: #8a3a1a; background: rgba(196,113,74,0.15); color: #8a3a1a; }
        .btn.active { border-color: #c4714a; background: rgba(196,113,74,0.1); color: #2c1a0e; }
        .pill { padding: 5px 13px; border-radius: 20px; border: 1px solid #d4b89a; cursor: pointer; font-size: 13px; transition: all 0.2s; background: transparent; color: #9a7055; font-family: 'Crimson Text', serif; }
        .pill.on { background: rgba(196,113,74,0.12); border-color: #c4714a; color: #2c1a0e; }
        input { background: #ede0d4; border: 1px solid #c4a08a; border-radius: 6px; padding: 9px 14px; color: #2c1a0e; font-family: 'Crimson Text', serif; font-size: 15px; width: 100%; outline: none; }
        input:focus { border-color: #c4714a; }
        input::placeholder { color: #b09070; }
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fadein { animation: fadein 0.3s ease forwards; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .slot-card { border-radius: 8px; padding: 14px; cursor: pointer; transition: all 0.2s; }
        .slot-card:hover { transform: translateY(-2px); }
        .spread-card { background: #ede0d4; border: 1px dashed #c4a08a; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .spread-card.filled { border-style: solid; }
        .spread-card:hover { border-color: #c4714a; }
        .card-tile { background: #ede0d4; border: 1px solid #d4b89a; border-radius: 7px; padding: 12px; cursor: pointer; transition: all 0.2s; }
        .card-tile:hover { border-color: #c4714a; transform: translateY(-1px); }
        .card-tile.used { opacity: 0.35; pointer-events: none; }
        select { appearance: none; }
        select:focus { border-color: #c4714a; outline: none; }
        select option { background: #f5ede4; color: #2c1a0e; font-family: 'Crimson Text', serif; }
        select optgroup { color: #9a7055; font-family: 'Crimson Text', serif; font-style: normal; font-weight: 600; }
      `}</style>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid #d4c0a8", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div onClick={() => setScreen("home")} style={{ cursor: "pointer" }}>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(13px,3vw,18px)", color: "#c4714a", letterSpacing: "1px" }}>✦ The Arcana</div>
          {activeDeck && (
            <div style={{ fontSize: "11px", color: "#b09070", marginTop: "2px", letterSpacing: "0.5px" }}>{activeDeck.symbol} {activeDeck.short}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button className="btn" onClick={() => handleSpreadFromHome()} style={{ fontSize: "13px" }}>
            {defaultSpreadKey && SPREADS[defaultSpreadKey] ? `⊞ ${SPREADS[defaultSpreadKey].name}` : "⊞ Spread Reading"}
          </button>
          <button className="btn" onClick={() => { setSearch(""); setScreen("browse"); }}>Browse Cards</button>
          {adminQueue.filter(i => i.status === "pending").length > 0 && (
            <button className="btn" onClick={() => setShowAdminQueue(true)} style={{ fontSize: "13px", padding: "8px 12px", borderColor: "#c4714a60", color: "#c4714a", position: "relative" }}>
              ◉ Review {adminQueue.filter(i => i.status === "pending").length}
            </button>
          )}
          <button className="btn" onClick={() => setScreen("settings")} style={{ fontSize: "13px", padding: "8px 12px" }}>⚙</button>
        </div>
      </div>

      {/* DECK SELECT */}
      {screen === "deck-select" && (
        <div className="fadein" style={{ maxWidth: "720px", margin: "0 auto", padding: "36px 20px" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", marginBottom: "6px", fontSize: "20px" }}>Your Deck</h2>
          <p style={{ color: "#9a7055", marginBottom: "28px", fontSize: "15px" }}>
            Tell us what you're reading with. This shapes how the AI interprets your cards and tailors readings to your tradition. To set a permanent default, go to ⚙ Settings.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {DECKS.map(deck => {
              const isActive = activeDeck?.id === deck.id;
              return (
                <div key={deck.id}
                  onClick={() => { setActiveDeck(deck); if (defaultDeckId === deck.id || !defaultDeckId) saveDefaultDeck(deck.id); setScreen("home"); }}
                  style={{
                    background: isActive ? "rgba(196,113,74,0.08)" : "#ede0d4",
                    border: `1px solid ${isActive ? "#c4714a" : "#d4b89a"}`,
                    borderRadius: "10px", padding: "18px 20px", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "#c4714a80"; e.currentTarget.style.background = "rgba(196,113,74,0.04)"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#d4b89a"; e.currentTarget.style.background = "#ede0d4"; }}}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "18px" }}>{deck.symbol}</span>
                        <span style={{ fontFamily: "'Cinzel', serif", color: isActive ? "#c4714a" : "#2c1a0e", fontSize: "15px" }}>{deck.name}</span>
                        {deck.year && <span style={{ fontSize: "12px", color: "#b09070" }}>{deck.year}</span>}
                        {isActive && <span style={{ fontSize: "11px", color: "#c4714a", border: "1px solid #c4714a40", borderRadius: "10px", padding: "1px 8px" }}>selected</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "#9a7055", marginBottom: "8px", fontStyle: "italic" }}>{deck.tradition}</div>
                      <p style={{ fontSize: "14px", color: "#5a3a20", lineHeight: 1.6 }}>{deck.description}</p>
                      {deck.variants.length > 0 && (
                        <div style={{ fontSize: "12px", color: "#b09070", marginTop: "8px" }}>
                          Variants: {deck.variants.join(", ")}
                        </div>
                      )}
                    </div>
                    <div style={{ color: isActive ? "#c4714a" : "#d4b89a", fontSize: "20px", marginLeft: "16px", flexShrink: 0 }}>
                      {isActive ? "✦" : "→"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button className="btn" onClick={() => setScreen("home")}>← Back</button>
          </div>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div className="fadein" style={{ maxWidth: "640px", margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>✦</div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(20px,5vw,32px)", color: "#c4714a", marginBottom: "12px" }}>Tarot Companion</h1>
          <p style={{ color: "#9a7055", fontSize: "17px", lineHeight: 1.7, marginBottom: "32px" }}>Pull cards from your physical deck, select them here, and get the meaning of each position — plus an AI reading that weaves them all together.</p>

          {/* Deck prompt */}
          <div onClick={() => setScreen("deck-select")} style={{ background: activeDeck ? "rgba(196,113,74,0.07)" : "#ede0d4", border: `1px solid ${activeDeck ? "#c4714a60" : "#d4b89a"}`, borderRadius: "10px", padding: "14px 20px", marginBottom: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4714a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = activeDeck ? "#c4714a60" : "#d4b89a"; }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "3px" }}>YOUR DECK</div>
              {activeDeck ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", color: "#2c1a0e", fontSize: "15px" }}>{activeDeck.symbol} {activeDeck.name}</div>
                  {defaultDeckId === activeDeck.id && <span style={{ fontSize: "10px", color: "#c4714a", border: "1px solid #c4714a40", borderRadius: "10px", padding: "1px 7px" }}>default</span>}
                </div>
              ) : (
                <div style={{ color: "#c4714a", fontSize: "15px" }}>Select your deck →</div>
              )}
              {activeDeck && <div style={{ fontSize: "12px", color: "#9a7055", marginTop: "2px" }}>{activeDeck.tradition}</div>}
            </div>
            <div style={{ color: "#c4714a", fontSize: "18px" }}>⬡</div>
          </div>

          {/* Daily ritual prompt */}
          <div onClick={() => { setDailyCard(null); setDailyCardInsight(""); setDailyJournal(""); setShowDailyCard(true); }}
            style={{ background: "linear-gradient(135deg, #2c1a0e, #4a2a14)", border: "1px solid #c4714a40", borderRadius: "12px", padding: "20px 22px", marginBottom: "14px", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c4714a"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#c4714a40"}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ fontSize: "10px", color: "#c4a08a", letterSpacing: "2px" }}>YOUR DAILY RITUAL</div>
              <div style={{ fontSize: "20px", opacity: 0.6 }}>✦</div>
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", fontSize: "16px", marginBottom: "6px" }}>Time to pull your cards</div>
            <div style={{ fontSize: "13px", color: "#6a4a2a", lineHeight: 1.6 }}>Set your intention, shuffle your deck, and let the cards speak. Aurín will guide the rest.</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
            {[
              { icon: "⊞", title: defaultSpreadKey && SPREADS[defaultSpreadKey] ? `${SPREADS[defaultSpreadKey].name}` : "Spread Reading", sub: defaultSpreadKey ? "Your default · private, no recording" : "Private · no recording · no pressure", action: () => handleSpreadFromHome() },
              { icon: "✦", title: "Browse All Cards", sub: "All 78 — search & explore", action: () => setScreen("browse") },
            ].map((item, i) => (
              <div key={i} onClick={item.action} style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "10px", padding: "20px 16px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4714a"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4b89a"; }}>
                <div style={{ fontSize: "28px", color: "#c4714a", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#2c1a0e", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#9a7055" }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Guided session button */}
          <div onClick={() => {
              const key = defaultSpreadKey || "three";
              startGuidedSession(key);
            }}
            style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "10px", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c4714a"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#d4b89a"}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#2c1a0e", marginBottom: "3px" }}>◉ Guided Reading — voice & camera</div>
              <div style={{ fontSize: "12px", color: "#9a7055" }}>Breathe, pull, speak your cards · reaction recorded at the end</div>
            </div>
            <div style={{ fontSize: "18px", color: "#c4714a", opacity: 0.7 }}>→</div>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {screen === "settings" && (
          <div className="fadein" style={{ maxWidth: "560px", margin: "0 auto", padding: "36px 20px" }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", marginBottom: "6px", fontSize: "20px" }}>Settings</h2>
            <p style={{ color: "#9a7055", marginBottom: "32px", fontSize: "15px" }}>Set your defaults so every reading starts exactly where you want it.</p>

            {/* Default Deck dropdown */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "#b09070", letterSpacing: "2px", marginBottom: "8px", fontFamily: "'Cinzel', serif" }}>DEFAULT DECK</label>
              <div style={{ position: "relative" }}>
                <select
                  value={defaultDeckId || ""}
                  onChange={e => {
                    const deck = DECKS.find(d => d.id === e.target.value) || null;
                    if (deck) { saveDefaultDeck(deck.id); setActiveDeck(deck); }
                    else { saveDefaultDeck(null); }
                  }}
                  style={{ width: "100%", appearance: "none", background: "#ede0d4", border: "1px solid #c4a08a", borderRadius: "8px", padding: "12px 44px 12px 16px", color: "#2c1a0e", fontFamily: "'Crimson Text', serif", fontSize: "16px", cursor: "pointer", outline: "none" }}
                >
                  <option value="">No default — choose each time</option>
                  {DECKS.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.symbol} {deck.name} ({deck.year || "Various"})</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#c4714a", fontSize: "14px" }}>▾</div>
              </div>
              {selectedDeck && (
                <div style={{ marginTop: "10px", background: "rgba(196,113,74,0.06)", border: "1px solid rgba(196,113,74,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
                  <div style={{ fontSize: "12px", color: "#9a7055", fontStyle: "italic", marginBottom: "2px" }}>{selectedDeck.tradition}</div>
                  <div style={{ fontSize: "13px", color: "#5a3a20", lineHeight: 1.5 }}>{selectedDeck.description}</div>
                </div>
              )}
            </div>

            {/* Default Spread dropdown */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "#b09070", letterSpacing: "2px", marginBottom: "8px", fontFamily: "'Cinzel', serif" }}>DEFAULT SPREAD</label>
              <div style={{ position: "relative" }}>
                <select
                  value={defaultSpreadKey || ""}
                  onChange={e => saveDefaultSpread(e.target.value || null)}
                  style={{ width: "100%", appearance: "none", background: "#ede0d4", border: "1px solid #c4a08a", borderRadius: "8px", padding: "12px 44px 12px 16px", color: "#2c1a0e", fontFamily: "'Crimson Text', serif", fontSize: "16px", cursor: "pointer", outline: "none" }}
                >
                  <option value="">No default — always show spread menu</option>
                  <optgroup label="Everyday Readings">
                    {["three","yes_no","four","horseshoe"].map(key => SPREADS[key] && (
                      <option key={key} value={key}>{SPREADS[key].name} — {SPREADS[key].count} cards</option>
                    ))}
                  </optgroup>
                  <optgroup label="Deep Dives">
                    {["five","relationship","shadow_work","celtic_cross"].map(key => SPREADS[key] && (
                      <option key={key} value={key}>{SPREADS[key].name} — {SPREADS[key].count} cards</option>
                    ))}
                  </optgroup>
                  <optgroup label="Bigger Pictures">
                    {["celtic","eight","nine","year_ahead","astrological"].map(key => SPREADS[key] && (
                      <option key={key} value={key}>{SPREADS[key].name} — {SPREADS[key].count} cards</option>
                    ))}
                  </optgroup>
                </select>
                <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#c4714a", fontSize: "14px" }}>▾</div>
              </div>
              {selectedSpread && (
                <div style={{ marginTop: "10px", background: "rgba(196,113,74,0.06)", border: "1px solid rgba(196,113,74,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
                  <div style={{ fontSize: "13px", color: "#9a7055", marginBottom: "4px" }}>{selectedSpread.desc}</div>
                  <div style={{ fontSize: "12px", color: "#b09070" }}>{selectedSpread.positions.join(" · ")}</div>
                </div>
              )}
            </div>

            {/* Current defaults summary */}
            {(defaultDeckId || defaultSpreadKey) && (
              <div style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "8px", padding: "14px 16px", marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "8px" }}>YOUR DEFAULTS</div>
                <div style={{ fontSize: "14px", color: "#5a3a20", lineHeight: 1.8 }}>
                  {defaultDeckId && <div>✦ Deck — {selectedDeck?.name}</div>}
                  {defaultSpreadKey && <div>✦ Spread — {selectedSpread?.name}</div>}
                </div>
                <button className="btn" onClick={clearDefaults} style={{ marginTop: "10px", fontSize: "12px", color: "#b09070", padding: "5px 14px" }}>
                  Clear all defaults
                </button>
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <button className="btn gold" onClick={() => setScreen("home")} style={{ fontSize: "15px", padding: "10px 32px" }}>Done</button>
            </div>
          </div>
      )}

      {/* PICK SPREAD */}
      {screen === "pick-spread" && (
        <div className="fadein" style={{ maxWidth: "700px", margin: "0 auto", padding: "36px 20px" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", marginBottom: "6px", fontSize: "20px" }}>Choose Your Spread</h2>
          <p style={{ color: "#9a7055", marginBottom: "28px", fontSize: "15px" }}>Select the layout that matches the cards you've pulled from your deck.</p>

          {[
            {
              label: "Everyday Readings",
              keys: ["three", "yes_no", "four", "horseshoe"],
            },
            {
              label: "Deep Dives",
              keys: ["five", "relationship", "shadow_work", "celtic_cross"],
            },
            {
              label: "Bigger Pictures",
              keys: ["celtic", "eight", "nine", "year_ahead", "astrological"],
            },
          ].map(group => (
            <div key={group.label} style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "2px", marginBottom: "10px", fontFamily: "'Cinzel', serif" }}>{group.label.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {group.keys.map(key => {
                  const spread = SPREADS[key];
                  if (!spread) return null;
                  return (
                    <div key={key} onClick={() => startSpread(key)}
                      style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "10px", padding: "15px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4714a"; e.currentTarget.style.background = "rgba(196,113,74,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4b89a"; e.currentTarget.style.background = "#ede0d4"; }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "3px" }}>
                          <span style={{ fontFamily: "'Cinzel', serif", color: "#2c1a0e", fontSize: "14px" }}>{spread.name}</span>
                          <span style={{ fontSize: "12px", color: "#b09070" }}>{spread.count} cards</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "#9a7055" }}>{spread.desc}</div>
                      </div>
                      <div style={{ color: "#c4714a", fontSize: "18px", marginLeft: "16px", flexShrink: 0 }}>→</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BUILD READING */}
      {(screen === "build-reading" || screen === "reading") && activeSpread && (
        <div className="fadein" style={{ maxWidth: "860px", margin: "0 auto", padding: "28px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px", flexWrap: "wrap" }}>
            <button className="btn" onClick={() => setScreen("pick-spread")} style={{ fontSize: "13px", padding: "6px 14px" }}>← Spreads</button>
            <div>
              <span style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", fontSize: "17px" }}>{activeSpread.name}</span>
              <span style={{ color: "#9a7055", fontSize: "14px", marginLeft: "10px" }}>{activeSpread.desc}</span>
            </div>
            {activeDeck && (
              <span onClick={() => setScreen("deck-select")} style={{ fontSize: "12px", color: "#b09070", border: "1px solid #d4b89a", borderRadius: "10px", padding: "3px 10px", cursor: "pointer" }}>
                {activeDeck.symbol} {activeDeck.short}
              </span>
            )}
          </div>

          {/* Question + date fields */}
          {screen === "build-reading" && (
            <div style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "8px", padding: "14px 16px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", marginBottom: "10px", alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "5px" }}>YOUR QUESTION (optional)</div>
                  <input
                    placeholder="What would you like guidance on?"
                    value={readingQuestion}
                    onChange={e => setReadingQuestion(e.target.value)}
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "5px" }}>DATE & TIME</div>
                  <input
                    type="datetime-local"
                    value={readingDate}
                    onChange={e => setReadingDate(e.target.value)}
                    style={{ fontSize: "13px", width: "auto", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div style={{ fontSize: "13px", color: "#9a7055", borderTop: "1px solid #d4b89a", paddingTop: "10px" }}>
                {pickingSlot !== null
                  ? <span className="pulse">✦ Selecting card for <strong style={{ color: "#c4714a" }}>{activeSpread.positions[pickingSlot]}</strong> — search or scroll below</span>
                  : <span>Tap an empty position slot to select a card for it.</span>
                }
              </div>
            </div>
          )}

          {/* Spread grid */}
          <div style={{ marginBottom: "24px" }}>
            {activeSpread.layout.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px" }}>
                {row.map((slotIdx, ci) => renderSlotCard(slotIdx, ci))}

              </div>
            ))}
          </div>

          {/* Expanded slot detail */}
          {screen === "reading" && expandedSlot !== null && spreadSlots[expandedSlot] && (
              <div className="fadein" style={{ background: `linear-gradient(135deg, ${SUIT_COLORS[spreadSlots[expandedSlot].card.suit].bg}, #f5ede4)`, border: `1px solid ${SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent}40`, borderRadius: "10px", padding: "20px", marginBottom: "20px", boxShadow: `0 0 24px ${SUIT_COLORS[spreadSlots[expandedSlot].card.suit].glow}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent, letterSpacing: "2px", marginBottom: "4px" }}>POSITION {expandedSlot + 1} · {activeSpread.positions[expandedSlot]}</div>
                    <div style={{ fontFamily: "'Cinzel',serif", color: SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent, fontSize: "16px" }}>{spreadSlots[expandedSlot].card.name}{spreadSlots[expandedSlot].reversed ? " (reversed)" : ""}</div>
                  </div>
                  <div style={{ fontSize: "36px" }}>{spreadSlots[expandedSlot].card.symbol}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#9a7055", fontStyle: "italic", marginBottom: "10px" }}>{activeSpread.positionDesc[expandedSlot]}</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                  {spreadSlots[expandedSlot].card.keywords.map(k => (
                    <span key={k} style={{ background: `${SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent}15`, border: `1px solid ${SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent}30`, borderRadius: "20px", padding: "3px 10px", fontSize: "12px", color: SUIT_COLORS[spreadSlots[expandedSlot].card.suit].accent }}>{k}</span>
                  ))}
                </div>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#3a2010" }}>{spreadSlots[expandedSlot].reversed ? spreadSlots[expandedSlot].card.reversed : spreadSlots[expandedSlot].card.meaning}</p>
              </div>
          )}

          {/* Card slots list (build mode) — show remaining unselected */}
          {screen === "build-reading" && (
            <>
              {/* Mini list of slots to pick */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                {spreadSlots.map((s, i) => (
                  <div key={i}
                    onClick={() => setPickingSlot(pickingSlot === i ? null : i)}
                    style={{
                      padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", transition: "all 0.2s",
                      border: `1px solid ${pickingSlot === i ? "#c4714a" : s ? "#b09070" : "#c4a08a"}`,
                      background: pickingSlot === i ? "#f5e8da" : s ? "#ede0d4" : "#f0e4d8",
                      color: pickingSlot === i ? "#c4714a" : s ? "#8a5a3a" : "#b09070",
                    }}>
                    {i + 1}. {activeSpread.positions[i]} {s ? `· ${s.card.name.split(" ").slice(-1)}` : ""}
                  </div>
                ))}
              </div>

              {/* Card picker */}
              {pickingSlot !== null && (
                <div className="fadein">
                  <div style={{ fontSize: "13px", color: "#9a7055", marginBottom: "10px", letterSpacing: "1px" }}>SELECT CARD FOR: <span style={{ color: "#c4714a" }}>{activeSpread.positions[pickingSlot]}</span></div>
                  <div style={{ marginBottom: "10px" }}>
                    <input placeholder="Search by name or keyword..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {suits.map(s => <button key={s} className={`pill ${filterSuit === s ? "on" : ""}`} onClick={() => setFilterSuit(s)}>{s}</button>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", gap: "8px", maxHeight: "340px", overflowY: "auto" }}>
                    {filtered.map(card => (



                        <div key={card.id} className={`card-tile ${spreadSlots.some(sl => sl && sl.card.id === card.id) ? "used" : ""}`} onClick={() => !spreadSlots.some(sl => sl && sl.card.id === card.id) && assignCard(card)}>
                          <div style={{ fontSize: "18px", marginBottom: "4px" }}>{card.symbol}</div>
                          <div style={{ fontSize: "10px", color: SUIT_COLORS[card.suit].accent, marginBottom: "3px" }}>{card.suit}</div>
                          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "10px", color: "#3a2010", lineHeight: 1.3 }}>{card.name}</div>
                          <div style={{ fontSize: "10px", color: "#b09070", marginTop: "4px" }}>{card.keywords.slice(0,2).join(" · ")}</div>
                        </div>
                      );
                    ))}

                  </div>
                </div>
              )}

              {/* Reversed toggles for filled slots */}
              {spreadSlots.some(s => s) && (
                <div style={{ marginTop: "20px", borderTop: "1px solid #d4c0a8", paddingTop: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#b09070", letterSpacing: "1px", marginBottom: "10px" }}>MARK ANY REVERSED CARDS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {spreadSlots.map((s, i) => s && (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "6px", padding: "8px 12px" }}>
                        <span style={{ fontSize: "14px", color: "#7a5035" }}>{s.card.name}</span>
                        <button className={`btn ${s.reversed ? "gold" : ""}`} style={{ padding: "3px 10px", fontSize: "12px" }} onClick={() => toggleReversed(i)}>
                          {s.reversed ? "↓ Reversed" : "↑ Upright"}
                        </button>
                        <button onClick={() => removeCard(i)} style={{ background: "none", border: "none", color: "#b09070", cursor: "pointer", fontSize: "16px" }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {allFilled && (
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                  <button className="btn gold" style={{ fontSize: "17px", padding: "12px 32px" }} onClick={() => { setScreen("reading"); setExpandedSlot(null); }}>
                    ✦ Read My Spread
                  </button>
                </div>
              )}
            </>
          )}

          {/* READING MODE */}
          {screen === "reading" && (
            <div className="fadein">
              <div style={{ fontSize: "13px", color: "#9a7055", marginBottom: "16px" }}>Tap any card above to expand its meaning. Or get a full reading below.</div>

              {/* All positions list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {spreadSlots.map((s, i) => (


                    <div key={i} onClick={() => setExpandedSlot(expandedSlot === i ? null : i)}
                      style={{ background: "#ede0d4", border: `1px solid ${expandedSlot === i ? (sc?.accent + "50" || "#c4714a") : "#d4b89a"}`, borderRadius: "8px", padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.2s" }}>
                      <div style={{ fontSize: "26px", flexShrink: 0 }}>{s?.card.symbol}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "11px", color: "#9a7055", letterSpacing: "1px", marginBottom: "2px" }}>{i + 1}. {activeSpread.positions[i]}</div>
                        <div style={{ fontFamily: "'Cinzel',serif", fontSize: "13px", color: sc?.accent || "#c4714a" }}>
                          {s?.card.name}{s?.reversed ? " · reversed" : ""}
                        </div>
                        <div style={{ fontSize: "12px", color: "#b09070", marginTop: "2px" }}>{s?.card.keywords.slice(0,3).join(" · ")}</div>
                      </div>
                      <div style={{ color: "#b09070", fontSize: "16px" }}>{expandedSlot === i ? "▲" : "▼"}</div>
                    </div>
                  );
                ))}

              </div>

              {/* Full AI reading */}
              <div style={{ background: "#ede0d4", border: "1px solid #c4a08a", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontFamily: "'Cinzel',serif", color: "#c4714a", fontSize: "14px", marginBottom: "12px" }}>✦ Full Reading</div>
                {!readingInsight && !loadingInsight && (
                  <button className="btn gold" onClick={getReadingInsight} style={{ fontSize: "15px", padding: "10px 24px" }}>
                    Weave these cards together →
                  </button>
                )}
                {loadingInsight && <div style={{ color: "#9a7055", fontStyle: "italic" }} className="pulse">Reading the spread...</div>}
                {readingInsight && (
                  <div className="fadein" style={{ fontSize: "17px", lineHeight: 1.8, color: "#3a2010", fontStyle: "italic" }}>
                    {readingInsight}
                    <button className="btn" style={{ marginTop: "16px", fontSize: "13px", display: "block" }} onClick={getReadingInsight}>Read again →</button>
                  </div>
                )}
              </div>

              {/* Reaction Recorder */}
              <div style={{ marginTop: "16px", background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "10px", padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Cinzel',serif", color: "#9a7055", fontSize: "12px", letterSpacing: "1px", marginBottom: "4px" }}>REACTION RECORDING</div>
                <p style={{ fontSize: "13px", color: "#b09070", marginBottom: "14px" }}>Record your reaction to this reading. Attached to your journal and shared when you share the reading.</p>

                {!showReactionRecorder && !reactionVideoUrl && (
                  <button className="btn gold" onClick={() => setShowReactionRecorder(true)} style={{ fontSize: "14px", padding: "9px 20px" }}>
                    ◉ Record My Reaction
                  </button>
                )}

                {showReactionRecorder && !reactionVideoUrl && (
                  <div className="fadein">
                    {cameraError && (
                      <div style={{ background: "rgba(196,113,74,0.1)", border: "1px solid #c4714a40", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "13px", color: "#8a3a1a" }}>{cameraError}</div>
                    )}
                    <div style={{ position: "relative", background: "#2c1a0e", borderRadius: "10px", overflow: "hidden", marginBottom: "12px", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <video ref={videoPreviewRef} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
                      {!isRecording && (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                          <div style={{ fontSize: "40px", opacity: 0.4 }}>◉</div>
                          <div style={{ fontSize: "13px", color: "#c4a08a", opacity: 0.7 }}>Camera preview will appear here</div>
                        </div>
                      )}
                      {isRecording && (
                        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "4px 10px" }}>
                          <div style={{ width: "8px", height: "8px", background: "#e85d04", borderRadius: "50%", animation: "pulse 1s infinite" }} />
                          <span style={{ color: "#fff", fontSize: "13px", fontFamily: "'Crimson Text', serif" }}>{formatSeconds(recordingSeconds)}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {!isRecording ? (
                        <button className="btn gold" onClick={startRecording} style={{ fontSize: "14px", padding: "9px 20px" }}>◉ Start Recording</button>
                      ) : (
                        <button className="btn gold" onClick={stopRecording} style={{ fontSize: "14px", padding: "9px 20px", borderColor: "#e85d04", color: "#e85d04" }}>◼ Stop Recording</button>
                      )}
                      <button className="btn" onClick={() => { setShowReactionRecorder(false); setCameraError(null); discardRecording(); }} style={{ fontSize: "13px" }}>Cancel</button>
                    </div>
                  </div>
                )}

                {reactionVideoUrl && (
                  <div className="fadein">
                    <div style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "12px", aspectRatio: "16/9", background: "#2c1a0e" }}>
                      <video src={reactionVideoUrl} controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ fontSize: "13px", color: "#9a7055" }}>✦ Reaction saved to this reading</div>
                      <button className="btn" onClick={discardRecording} style={{ fontSize: "12px", color: "#b09070", padding: "5px 12px" }}>Re-record</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Download + Share section */}
              <div style={{ marginTop: "16px", background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "10px", padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Cinzel',serif", color: "#9a7055", fontSize: "12px", letterSpacing: "1px", marginBottom: "12px" }}>SAVE & SHARE</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", marginBottom: "12px", alignItems: "end" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "5px" }}>QUESTION</div>
                    <input placeholder="Add a question or note..." value={readingQuestion} onChange={e => setReadingQuestion(e.target.value)} style={{ fontSize: "14px" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#b09070", letterSpacing: "1px", marginBottom: "5px" }}>DATE & TIME</div>
                    <input type="datetime-local" value={readingDate} onChange={e => setReadingDate(e.target.value)} style={{ fontSize: "13px", width: "auto", cursor: "pointer" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button className="btn gold" onClick={downloadReading} style={{ fontSize: "14px", padding: "9px 20px" }}>↓ Download</button>
                  <button className="btn gold" onClick={() => setShowSharePreview(true)} style={{ fontSize: "14px", padding: "9px 20px" }}>↗ Preview Share Card</button>
                </div>
              </div>

              <div style={{ marginTop: "12px", textAlign: "center" }}>
                <button className="btn" onClick={() => { setScreen("build-reading"); setExpandedSlot(null); }}>← Edit cards</button>
              </div>
            </div>
          )}

          {/* SHARE PREVIEW MODAL */}
          {showSharePreview && (
            <div className="fadein" style={{ position: "fixed", inset: 0, background: "rgba(44,26,14,0.88)", zIndex: 100, overflowY: "auto", padding: "20px 16px" }} onClick={e => { if (e.target === e.currentTarget) setShowSharePreview(false); }}>
              <div style={{ maxWidth: "480px", margin: "0 auto" }}>

                {/* Share card */}
                <div style={{ background: "#f5ede4", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 80px rgba(44,26,14,0.5)", marginBottom: "16px" }}>
                  <div style={{ background: "linear-gradient(135deg, #2c1a0e, #4a2a14)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "#c4a08a", letterSpacing: "3px", marginBottom: "4px" }}>SHARED FROM</div>
                      <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "20px", color: "#c4714a", letterSpacing: "2px" }}>Aurín</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#6a4a2a", letterSpacing: "1px" }}>aurin.app</div>
                  </div>

                  {reactionVideoUrl && (
                    <div style={{ aspectRatio: "16/9", background: "#2c1a0e", position: "relative" }}>
                      <video src={reactionVideoUrl} controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
                      <div style={{ position: "absolute", bottom: "8px", right: "10px", background: "rgba(44,26,14,0.75)", borderRadius: "10px", padding: "3px 10px", fontSize: "11px", color: "#c4714a", fontFamily: "'Cinzel',serif", letterSpacing: "1px" }}>Aurín</div>
                    </div>
                  )}

                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
                        <span style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", fontSize: "14px" }}>{activeSpread?.name}</span>
                        {activeDeck && <span style={{ fontSize: "11px", color: "#b09070" }}>{activeDeck.symbol} {activeDeck.short}</span>}
                      </div>
                      {readingQuestion && <div style={{ fontSize: "14px", color: "#5a3a20", fontStyle: "italic", marginBottom: "3px" }}>"{readingQuestion}"</div>}
                      <div style={{ fontSize: "11px", color: "#b09070" }}>{new Date(readingDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
                    </div>

                    {readingInsight && (
                      <div style={{ background: "rgba(196,113,74,0.06)", border: "1px solid rgba(196,113,74,0.18)", borderRadius: "8px", padding: "12px 14px", marginBottom: "14px" }}>
                        <div style={{ fontSize: "10px", color: "#b09070", letterSpacing: "1px", marginBottom: "7px" }}>THE READING</div>
                        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#3a2010", fontStyle: "italic" }}>{readingInsight}</p>
                      </div>
                    )}

                    {/* Blurred cards with signup overlay */}
                    <div style={{ position: "relative", marginBottom: "14px" }}>
                      <div style={{ fontSize: "10px", color: "#b09070", letterSpacing: "1px", marginBottom: "8px" }}>THE CARDS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px,1fr))", gap: "6px", filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
                        {spreadSlots.slice(0, 6).map((s, i) => s && (
                          <div key={i} style={{ background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                            <div style={{ fontSize: "18px", marginBottom: "3px" }}>{s.card.symbol}</div>
                            <div style={{ fontSize: "8px", color: "#9a7055", marginBottom: "2px" }}>{activeSpread?.positions[i]}</div>
                            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "8px", color: "#2c1a0e", lineHeight: 1.3 }}>{s.card.name}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(245,237,228,0.75)", backdropFilter: "blur(2px)", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "13px", color: "#c4714a", marginBottom: "5px" }}>Aurín</div>
                        <div style={{ fontSize: "12px", color: "#5a3a20", marginBottom: "12px" }}>Sign up free to reveal all {spreadSlots.length} cards</div>
                        <button style={{ background: "#c4714a", border: "none", borderRadius: "7px", padding: "9px 20px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", marginBottom: "6px", width: "100%", letterSpacing: "0.5px" }}>G  Continue with Google</button>
                        <button style={{ background: "transparent", border: "1px solid #c4a08a", borderRadius: "7px", padding: "8px 20px", color: "#8a5a3a", fontFamily: "'Crimson Text', serif", fontSize: "13px", cursor: "pointer", width: "100%" }}>Sign up with email</button>
                        <div style={{ fontSize: "10px", color: "#b09070", marginTop: "6px" }}>Free forever · No card required</div>
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid #d4b89a", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "10px", color: "#b09070" }}>Shared via Aurín · aurin.app</div>
                      <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "11px", color: "#c4714a" }}>Aurín</div>
                    </div>
                  </div>
                </div>

                {/* Share options panel */}
                <div style={{ background: "#f5ede4", borderRadius: "14px", padding: "20px", marginBottom: "12px" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", fontSize: "13px", letterSpacing: "1px", marginBottom: "16px" }}>SHARE THIS READING</div>

                  {/* Native share — primary */}
                  <button onClick={nativeShare} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "13px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", marginBottom: "10px", letterSpacing: "0.5px", transition: "all 0.2s" }}>
                    ↗ Share / Copy Link
                  </button>

                  {/* Platform shortcuts */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                    {[
                      { label: "WhatsApp", platform: "whatsapp", color: "#25D366", icon: "💬" },
                      { label: "X / Twitter", platform: "twitter", color: "#000", icon: "𝕏" },
                      { label: "Facebook", platform: "facebook", color: "#1877F2", icon: "f" },
                      { label: "Telegram", platform: "telegram", color: "#2AABEE", icon: "✈" },
                    ].map(({ label, platform, color, icon }) => (
                      <button key={platform} onClick={() => shareToplatform(platform)} style={{ background: "transparent", border: "1px solid #d4b89a", borderRadius: "8px", padding: "10px", color: "#5a3a20", fontFamily: "'Crimson Text', serif", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4b89a"; e.currentTarget.style.color = "#5a3a20"; }}>
                        <span style={{ fontSize: "15px" }}>{icon}</span> {label}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: "1px solid #d4b89a", paddingTop: "16px", marginBottom: "14px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", color: "#9a7055", fontSize: "11px", letterSpacing: "1px", marginBottom: "12px" }}>COMMUNITY OPTIONS</div>

                    {/* Anonymous toggle */}
                    <div onClick={() => setShareAnonymous(!shareAnonymous)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#ede0d4", borderRadius: "8px", cursor: "pointer", marginBottom: "8px", border: "1px solid #d4b89a" }}>
                      <div>
                        <div style={{ fontSize: "14px", color: "#2c1a0e" }}>Share anonymously</div>
                        <div style={{ fontSize: "12px", color: "#9a7055" }}>Hide your name from this reading</div>
                      </div>
                      <div style={{ width: "40px", height: "22px", borderRadius: "11px", background: shareAnonymous ? "#c4714a" : "#d4b89a", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                        <div style={{ position: "absolute", top: "3px", left: shareAnonymous ? "21px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                      </div>
                    </div>

                    {/* Aurín community opt-in */}
                    <div onClick={() => { setAllowAurinShare(!allowAurinShare); setShareSubmitted(false); }} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 12px", background: allowAurinShare ? "rgba(196,113,74,0.08)" : "#ede0d4", borderRadius: "8px", cursor: "pointer", border: `1px solid ${allowAurinShare ? "#c4714a60" : "#d4b89a"}`, transition: "all 0.2s" }}>
                      <div style={{ flex: 1, paddingRight: "12px" }}>
                        <div style={{ fontSize: "14px", color: "#2c1a0e", marginBottom: "2px" }}>✦ Share my reaction with the Aurín community</div>
                        <div style={{ fontSize: "12px", color: "#9a7055", lineHeight: 1.5 }}>Your reaction may be featured on our TikTok and Instagram. All submissions are reviewed before posting. You can withdraw consent any time.</div>
                      </div>
                      <div style={{ width: "40px", height: "22px", borderRadius: "11px", background: allowAurinShare ? "#c4714a" : "#d4b89a", position: "relative", transition: "background 0.2s", flexShrink: 0, marginTop: "2px" }}>
                        <div style={{ position: "absolute", top: "3px", left: allowAurinShare ? "21px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                      </div>
                    </div>

                    {allowAurinShare && !shareSubmitted && (
                      <div className="fadein" style={{ marginTop: "10px" }}>
                        <button onClick={submitToAurinQueue} style={{ width: "100%", background: "transparent", border: "1px solid #c4714a", borderRadius: "8px", padding: "10px", color: "#c4714a", fontFamily: "'Cinzel', serif", fontSize: "13px", cursor: "pointer", letterSpacing: "0.5px" }}>
                          Submit for Review →
                        </button>
                      </div>
                    )}

                    {shareSubmitted && (
                      <div className="fadein" style={{ marginTop: "10px", background: "rgba(196,113,74,0.08)", border: "1px solid rgba(196,113,74,0.3)", borderRadius: "8px", padding: "10px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: "16px", marginBottom: "4px" }}>✦</div>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#c4714a", marginBottom: "3px" }}>Submitted for review</div>
                        <div style={{ fontSize: "12px", color: "#9a7055" }}>The Aurín team will review your reaction before featuring it. Thank you.</div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <button className="btn" onClick={() => setShowSharePreview(false)} style={{ color: "#c4a08a", borderColor: "#c4a08a40", marginBottom: "8px" }}>Close</button>
                  <div style={{ fontSize: "11px", color: "#6a4a2a", marginTop: "6px" }}>Non-members see your reaction and reading summary only. Cards revealed on sign up.</div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
        </div>
        </div>
      )}

      {/* ADMIN APPROVAL QUEUE */}
      {showAdminQueue && (
        <div className="fadein" style={{ position: "fixed", inset: 0, background: "rgba(44,26,14,0.92)", zIndex: 200, overflowY: "auto", padding: "20px 16px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "18px", color: "#c4714a" }}>Aurín</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#9a7055", marginTop: "2px" }}>Content Review Queue</div>
              </div>
              <button className="btn" onClick={() => setShowAdminQueue(false)} style={{ color: "#c4a08a", borderColor: "#c4a08a40" }}>Close</button>
            </div>

            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {[
                { label: "Pending", count: adminQueue.filter(i => i.status === "pending").length, color: "#c4714a" },
                { label: "Approved", count: adminQueue.filter(i => i.status === "approved").length, color: "#52b788" },
                { label: "Declined", count: adminQueue.filter(i => i.status === "declined").length, color: "#b09070" },
              ].map(({ label, count, color }) => (
                <div key={label} style={{ background: "#f5ede4", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "22px", color, marginBottom: "2px" }}>{count}</div>
                  <div style={{ fontSize: "11px", color: "#9a7055", letterSpacing: "1px" }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {adminQueue.length === 0 && (
              <div style={{ background: "#f5ede4", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#9a7055" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.4 }}>✦</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", marginBottom: "6px" }}>No submissions yet</div>
                <div style={{ fontSize: "13px" }}>Community reactions submitted for review will appear here</div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {adminQueue.map(item => (
                <div key={item.id} style={{ background: "#f5ede4", borderRadius: "10px", overflow: "hidden", border: `1px solid ${item.status === "approved" ? "#52b78840" : item.status === "declined" ? "#c4a08a40" : "#d4b89a"}` }}>
                  {/* Status banner */}
                  {item.status !== "pending" && (
                    <div style={{ background: item.status === "approved" ? "rgba(82,183,136,0.12)" : "rgba(176,144,112,0.15)", padding: "6px 16px", fontSize: "11px", color: item.status === "approved" ? "#2d8a5e" : "#8a6a4a", letterSpacing: "1px", fontFamily: "'Cinzel', serif" }}>
                      {item.status === "approved" ? "✦ APPROVED FOR SOCIALS" : "— DECLINED"}
                    </div>
                  )}

                  <div style={{ padding: "16px" }}>
                    {/* Meta row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <div>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#2c1a0e", marginBottom: "2px" }}>{item.spread}</div>
                        <div style={{ fontSize: "11px", color: "#b09070" }}>{item.date} · {item.deck || "Unspecified deck"}</div>
                        {item.anonymous && <div style={{ fontSize: "11px", color: "#c4714a", marginTop: "2px" }}>Anonymous submission</div>}
                      </div>
                      {item.hasVideo && (
                        <div style={{ background: "rgba(196,113,74,0.1)", border: "1px solid rgba(196,113,74,0.3)", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", color: "#c4714a" }}>◉ Video</div>
                      )}
                    </div>

                    {item.question && (
                      <div style={{ fontSize: "13px", color: "#5a3a20", fontStyle: "italic", marginBottom: "8px" }}>"{item.question}"</div>
                    )}

                    {item.reading && (
                      <div style={{ fontSize: "13px", color: "#3a2010", lineHeight: 1.6, marginBottom: "10px", padding: "10px 12px", background: "rgba(196,113,74,0.05)", borderRadius: "6px", borderLeft: "3px solid #c4714a40" }}>
                        {item.reading.length > 200 ? item.reading.slice(0, 200) + "..." : item.reading}
                      </div>
                    )}

                    {/* Cards list */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
                      {item.cards.map((c, i) => (
                        <span key={i} style={{ fontSize: "10px", background: "#ede0d4", border: "1px solid #d4b89a", borderRadius: "20px", padding: "2px 8px", color: "#9a7055" }}>{c}</span>
                      ))}
                    </div>

                    {/* Platform tags + actions */}
                    {item.status === "pending" && (
                      <div>
                        <div style={{ fontSize: "11px", color: "#b09070", marginBottom: "8px", letterSpacing: "0.5px" }}>TAG FOR PLATFORM</div>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                          {["TikTok", "Instagram", "Both"].map(tag => (
                            <button key={tag} style={{ background: "transparent", border: "1px solid #d4b89a", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", color: "#9a7055", cursor: "pointer", fontFamily: "'Crimson Text', serif", transition: "all 0.2s" }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4714a"; e.currentTarget.style.color = "#c4714a"; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4b89a"; e.currentTarget.style.color = "#9a7055"; }}>
                              {tag}
                            </button>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => updateQueueItem(item.id, "approved")} style={{ flex: 1, background: "rgba(82,183,136,0.15)", border: "1px solid rgba(82,183,136,0.4)", borderRadius: "8px", padding: "9px", color: "#2d8a5e", fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "0.5px" }}>
                            ✦ Approve
                          </button>
                          <button onClick={() => updateQueueItem(item.id, "declined")} style={{ flex: 1, background: "transparent", border: "1px solid #d4b89a", borderRadius: "8px", padding: "9px", color: "#9a7055", fontFamily: "'Crimson Text', serif", fontSize: "13px", cursor: "pointer" }}>
                            Decline
                          </button>
                        </div>
                      </div>
                    )}

                    {item.status === "approved" && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={{ flex: 1, background: "transparent", border: "1px solid #d4b89a", borderRadius: "8px", padding: "8px", color: "#9a7055", fontFamily: "'Crimson Text', serif", fontSize: "13px", cursor: "pointer" }}>
                          Copy for TikTok
                        </button>
                        <button style={{ flex: 1, background: "transparent", border: "1px solid #d4b89a", borderRadius: "8px", padding: "8px", color: "#9a7055", fontFamily: "'Crimson Text', serif", fontSize: "13px", cursor: "pointer" }}>
                          Copy for Instagram
                        </button>
                        <button onClick={() => updateQueueItem(item.id, "pending")} style={{ background: "transparent", border: "1px solid #d4b89a", borderRadius: "8px", padding: "8px 12px", color: "#b09070", fontFamily: "'Crimson Text', serif", fontSize: "12px", cursor: "pointer" }}>
                          Undo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* BROWSE */}
      {screen === "browse" && (
        <div className="fadein" style={{ maxWidth: "860px", margin: "0 auto", padding: "28px 16px" }}>
          <h2 style={{ fontFamily: "'Cinzel',serif", color: "#c4714a", fontSize: "18px", marginBottom: "16px" }}>All 78 Cards</h2>
          <div style={{ marginBottom: "10px" }}>
            <input placeholder="Search by name or keyword..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            {suits.map(s => <button key={s} className={`pill ${filterSuit === s ? "on" : ""}`} onClick={() => setFilterSuit(s)}>{s}</button>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: "9px" }}>
            {filtered.map(card => {
              const sc = SUIT_COLORS[card.suit];
              return (
                <div key={card.id} className="card-tile" onClick={() => { setDetailCard(card); setDetailReversed(false); setScreen("card-detail"); }}>
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>{card.symbol}</div>
                  <div style={{ fontSize: "10px", color: sc.accent, marginBottom: "3px" }}>{card.suit}</div>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: "10px", color: "#3a2010", lineHeight: 1.3 }}>{card.name}</div>
                  <div style={{ fontSize: "11px", color: "#b09070", marginTop: "5px" }}>{card.keywords.slice(0,2).join(" · ")}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CARD DETAIL */}
      {screen === "card-detail" && detailCard && (
          <div className="fadein" style={{ maxWidth: "680px", margin: "0 auto", padding: "28px 16px" }}>
            <button className="btn" onClick={() => setScreen("browse")} style={{ marginBottom: "20px", fontSize: "13px" }}>← Back</button>
            <div style={{ background: `linear-gradient(135deg, ${SUIT_COLORS[detailCard.suit].bg}, #f5ede4)`, border: `1px solid ${SUIT_COLORS[detailCard.suit].accent}50`, borderRadius: "12px", padding: "28px", boxShadow: `0 0 40px ${SUIT_COLORS[detailCard.suit].glow}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: SUIT_COLORS[detailCard.suit].accent, letterSpacing: "2px", marginBottom: "6px" }}>{detailCard.suit} · {detailCard.number} · {detailCard.element}</div>
                  <h2 style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: "clamp(18px,4vw,26px)", color: SUIT_COLORS[detailCard.suit].accent }}>{detailCard.name}</h2>
                </div>
                <div style={{ fontSize: "52px" }}>{detailCard.symbol}</div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                {detailCard.keywords.map(k => <span key={k} style={{ background: `${SUIT_COLORS[detailCard.suit].accent}15`, border: `1px solid ${SUIT_COLORS[detailCard.suit].accent}30`, borderRadius: "20px", padding: "4px 11px", fontSize: "13px", color: SUIT_COLORS[detailCard.suit].accent }}>{k}</span>)}
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {["Upright","Reversed"].map(pos => (
                  <button key={pos} onClick={() => setDetailReversed(pos === "Reversed")} style={{ background: (pos === "Reversed") === detailReversed ? `${SUIT_COLORS[detailCard.suit].accent}20` : "transparent", border: `1px solid ${(pos === "Reversed") === detailReversed ? SUIT_COLORS[detailCard.suit].accent : "#c4a08a"}`, borderRadius: "6px", padding: "6px 16px", color: (pos === "Reversed") === detailReversed ? SUIT_COLORS[detailCard.suit].accent : "#9a7055", cursor: "pointer", fontFamily: "'Crimson Text',serif", fontSize: "14px" }}>{pos}</button>
                ))}
              </div>
              <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#3a2010" }}>{detailReversed ? detailCard.reversed : detailCard.meaning}</p>
            </div>
          </div>
      )}
      {/* ═══════════════════════════════════════
          ONBOARDING OVERLAY
      ═══════════════════════════════════════ */}
      {onboardingStep !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "#0e0805", overflowY: "auto" }}>
          <style>{`
            @keyframes slowfade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
            .slowfade { animation: slowfade 0.6s ease forwards; }
          `}</style>

          {/* SCREEN 0 — Welcome */}
          {onboardingStep === 0 && (
            <div className="slowfade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "52px", marginBottom: "24px", opacity: 0.85 }}>✦</div>
              <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(28px,7vw,48px)", color: "#c4714a", letterSpacing: "3px", marginBottom: "8px" }}>Aurín</div>
              <div style={{ fontSize: "16px", color: "#6a4a2a", letterSpacing: "2px", marginBottom: "40px" }}>golden light</div>
              <p style={{ fontSize: "18px", color: "#c4a08a", lineHeight: 1.8, maxWidth: "380px", marginBottom: "48px" }}>A space for reflection, self-exploration, and a little magic.</p>
              <button onClick={() => setOnboardingStep(1)} style={{ background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px 48px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "15px", cursor: "pointer", letterSpacing: "1px" }}>Begin</button>
              <button onClick={completeOnboarding} style={{ background: "none", border: "none", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px", marginTop: "16px" }}>Skip intro</button>
            </div>
          )}

          {/* SCREEN 1 — Experience level */}
          {onboardingStep === 1 && (
            <div className="slowfade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
              <div style={{ maxWidth: "420px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#4a3020", letterSpacing: "3px", marginBottom: "20px" }}>1 OF 3</div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(20px,5vw,28px)", color: "#c4714a", marginBottom: "12px", lineHeight: 1.3 }}>Where are you with tarot?</h2>
                <p style={{ fontSize: "15px", color: "#6a4a2a", marginBottom: "36px", lineHeight: 1.6 }}>No right answer. This just helps us set things up for you.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {[
                    { id: "new",    emoji: "🌱", title: "Brand new",         sub: "I just bought my first deck or I'm curious" },
                    { id: "some",   emoji: "🌙", title: "Some experience",    sub: "I've done a few readings, still learning" },
                    { id: "fluent", emoji: "✦",  title: "I know my cards",   sub: "Tarot is already part of my practice" },
                  ].map(({ id, emoji, title, sub }) => (
                    <div key={id} onClick={() => { setOnboardLevel(id); setOnboardingStep(2); }}
                      style={{ background: onboardLevel === id ? "rgba(196,113,74,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${onboardLevel === id ? "#c4714a" : "#3a2010"}`, borderRadius: "12px", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", textAlign: "left", transition: "all 0.2s" }}>
                      <span style={{ fontSize: "24px", flexShrink: 0 }}>{emoji}</span>
                      <div>
                        <div style={{ fontFamily: "'Cinzel', serif", color: "#e8d8c0", fontSize: "14px", marginBottom: "3px" }}>{title}</div>
                        <div style={{ fontSize: "13px", color: "#6a4a2a" }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={completeOnboarding} style={{ background: "none", border: "none", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Skip for now</button>
              </div>
            </div>
          )}

          {/* SCREEN 2 — Ritual moment */}
          {onboardingStep === 2 && (
            <div className="slowfade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
              <div style={{ maxWidth: "420px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#4a3020", letterSpacing: "3px", marginBottom: "20px" }}>2 OF 3</div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(20px,5vw,28px)", color: "#c4714a", marginBottom: "12px", lineHeight: 1.3 }}>When do you usually get a moment to yourself?</h2>
                <p style={{ fontSize: "15px", color: "#6a4a2a", marginBottom: "8px", lineHeight: 1.6 }}>Tarot deserves your full attention. Even 10 minutes.</p>
                <p style={{ fontSize: "13px", color: "#4a3020", marginBottom: "32px", fontStyle: "italic" }}>We'll send you a gentle nudge at the right time.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {Object.entries(RITUAL_TIMES).map(([id, { label, emoji, days, time }]) => (
                    <div key={id} onClick={() => { setOnboardMoment(id); setOnboardingStep(3); }}
                      style={{ background: onboardMoment === id ? "rgba(196,113,74,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${onboardMoment === id ? "#c4714a" : "#3a2010"}`, borderRadius: "12px", padding: "14px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                        <span style={{ fontSize: "20px" }}>{emoji}</span>
                        <div style={{ fontFamily: "'Cinzel', serif", color: "#e8d8c0", fontSize: "13px" }}>{label}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#4a3020", flexShrink: 0, marginLeft: "10px" }}>{time}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button onClick={() => setOnboardingStep(1)} style={{ background: "none", border: "1px solid #3a2010", borderRadius: "8px", padding: "8px 20px", color: "#6a4a2a", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>← Back</button>
                  <button onClick={completeOnboarding} style={{ background: "none", border: "none", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Skip</button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3 — Intention */}
          {onboardingStep === 3 && (
            <div className="slowfade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
              <div style={{ maxWidth: "420px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#4a3020", letterSpacing: "3px", marginBottom: "20px" }}>3 OF 3</div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(20px,5vw,26px)", color: "#c4714a", marginBottom: "12px", lineHeight: 1.3 }}>What are you hoping to find here?</h2>
                <p style={{ fontSize: "15px", color: "#6a4a2a", marginBottom: "32px", lineHeight: 1.6 }}>Optional. Your answer shapes your daily card guidance.</p>
                <textarea
                  value={onboardIntention}
                  onChange={e => setOnboardIntention(e.target.value)}
                  placeholder="Clarity on a decision. Understanding myself better. Just curious..."
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid #3a2010", borderRadius: "10px", padding: "14px 16px", color: "#e8d8c0", fontFamily: "'Crimson Text', serif", fontSize: "16px", lineHeight: 1.6, resize: "none", outline: "none", minHeight: "100px", marginBottom: "24px" }}
                />
                <button onClick={completeOnboarding} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "15px", cursor: "pointer", letterSpacing: "1px", marginBottom: "12px" }}>
                  Enter Aurín →
                </button>
                <button onClick={() => setOnboardingStep(4)} style={{ background: "none", border: "none", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>
                  First, show me the do's and don'ts
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4 — Do's and Don'ts */}
          {onboardingStep === 4 && (
            <div className="slowfade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
              <div style={{ maxWidth: "440px", width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#c4714a", marginBottom: "8px" }}>A few things worth knowing</div>
                  <p style={{ fontSize: "14px", color: "#6a4a2a", lineHeight: 1.6 }}>Tarot is a mirror, not a crystal ball. It reflects what's already there.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                  {[
                    { type: "do",   icon: "✦", text: "Come with a question or an open mind" },
                    { type: "do",   icon: "✦", text: "Sit somewhere quiet, even for 10 minutes" },
                    { type: "do",   icon: "✦", text: "Trust your first reaction to a card" },
                    { type: "dont", icon: "—", text: "Ask the same question repeatedly hoping for a different answer" },
                    { type: "dont", icon: "—", text: "Make major life decisions based on a single reading" },
                    { type: "dont", icon: "—", text: "Read someone else without their knowledge or consent" },
                  ].map(({ type, icon, text }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 16px", background: type === "do" ? "rgba(196,113,74,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${type === "do" ? "#c4714a30" : "#3a2010"}`, borderRadius: "10px" }}>
                      <span style={{ color: type === "do" ? "#c4714a" : "#4a3020", fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
                      <span style={{ fontSize: "14px", color: type === "do" ? "#e8d8c0" : "#6a4a2a", lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(196,113,74,0.06)", border: "1px solid #c4714a20", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px" }}>
                  <p style={{ fontSize: "13px", color: "#6a4a2a", lineHeight: 1.6, fontStyle: "italic" }}>
                    Aurín is for reflection, self-exploration, and a bit of magic. It's not a substitute for professional advice — medical, legal, financial, or otherwise. Use your readings as food for thought, not instruction manuals for your life.
                  </p>
                </div>

                <button onClick={completeOnboarding} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "15px", cursor: "pointer", letterSpacing: "1px" }}>
                  I'm ready. Enter Aurín →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════
          DAILY RITUAL MODAL
      ═══════════════════════════════════════ */}
      {showDailyCard && (
          <div style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(10,5,2,0.97)", overflowY: "auto", padding: "24px 16px" }}>
            <div style={{ maxWidth: "460px", margin: "0 auto" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <div>
                  <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "15px", color: "#c4714a" }}>Aurín</div>
                  <div style={{ fontSize: "11px", color: "#4a3020", marginTop: "2px" }}>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
                </div>
                <button onClick={() => setShowDailyCard(false)} style={{ background: "none", border: "1px solid #3a2010", borderRadius: "6px", padding: "6px 14px", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Close</button>
              </div>

              {/* Step 1 — no card selected yet: the ritual setup */}
              {!dailyCard && (
                <div className="fadein">
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.7 }}>✦</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "22px", color: "#c4714a", marginBottom: "10px" }}>Your Daily Ritual</div>
                    <p style={{ fontSize: "16px", color: "#6a4a2a", lineHeight: 1.8 }}>This is your time. Not a quick check between tasks — a real moment with yourself.</p>
                  </div>

                  {/* Ritual steps */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                    {[
                      { num: "01", title: "Find your space", body: "Put your phone down after this. Sit somewhere quiet. Even the bathroom counts." },
                      { num: "02", title: "Set an intention", body: savedIntention ? `Your intention: "${savedIntention}"` : "Before you shuffle, ask yourself — what do I actually need right now? Not want. Need." },
                      { num: "03", title: "Shuffle your deck", body: "Hold your deck, breathe, think of your question or intention. Shuffle however feels right until it feels done." },
                      { num: "04", title: "Pull your card", body: "Trust your hands. Pull one card — or however many your spread needs. Don't second-guess it." },
                    ].map(({ num, title, body }) => (
                      <div key={num} style={{ display: "flex", gap: "16px", padding: "14px 16px", background: "rgba(196,113,74,0.05)", border: "1px solid #2a1a0a", borderRadius: "10px" }}>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#c4714a", opacity: 0.6, flexShrink: 0, marginTop: "2px" }}>{num}</div>
                        <div>
                          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#e8d8c0", marginBottom: "4px" }}>{title}</div>
                          <div style={{ fontSize: "13px", color: "#6a4a2a", lineHeight: 1.6 }}>{body}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setDailyCard("ready")}
                    style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "1px", marginBottom: "10px" }}>
                    I've pulled my card →
                  </button>
                  <p style={{ textAlign: "center", fontSize: "12px", color: "#3a2010", fontStyle: "italic" }}>Take your time. Aurín will be here when you're ready.</p>
                </div>
              )}

              {/* Step 2 — card pulled: pick which card it was */}
              {dailyCard === "ready" && (
                <div className="fadein">
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", color: "#c4714a", marginBottom: "8px" }}>Which card did you pull?</div>
                    <p style={{ fontSize: "14px", color: "#6a4a2a" }}>Find it below and tap it. Trust what came up.</p>
                  </div>

                  {/* Search */}
                  <div style={{ marginBottom: "12px" }}>
                    <input
                      placeholder="Search by name or keyword..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      style={{ fontSize: "15px" }}
                    />
                  </div>

                  {/* Suit filter */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {["All","Major Arcana","Wands","Cups","Swords","Pentacles"].map(s => (
                      <button key={s} className={`pill ${filterSuit === s ? "on" : ""}`} onClick={() => setFilterSuit(s)} style={{ fontSize: "11px", padding: "4px 10px" }}>{s}</button>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))", gap: "8px", maxHeight: "380px", overflowY: "auto", marginBottom: "16px" }}>
                    {ALL_CARDS.filter(c => {
                      const ms = filterSuit === "All" || c.suit === filterSuit;
                      const mq = c.name.toLowerCase().includes(search.toLowerCase()) || c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
                      return ms && mq;
                    }).map(card => {
                      const sc = SUIT_COLORS[card.suit];
                      return (
                        <div key={card.id}
                          onClick={() => { setDailyCard(card); setSearch(""); setFilterSuit("All"); }}
                          style={{ background: "#0e0805", border: `1px solid ${sc.accent}30`, borderRadius: "8px", padding: "12px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = sc.accent; e.currentTarget.style.background = `${sc.bg}aa`; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = `${sc.accent}30`; e.currentTarget.style.background = "#0e0805"; }}>
                          <div style={{ fontSize: "22px", marginBottom: "5px" }}>{card.symbol}</div>
                          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "9px", color: sc.accent, lineHeight: 1.3 }}>{card.name}</div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={() => setDailyCard(null)} style={{ background: "none", border: "none", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px", display: "block", margin: "0 auto" }}>← Back</button>
                </div>
              )}

              {/* Step 3 — card selected: full reading experience */}
              {dailyCard && dailyCard !== "ready" && (
                  <div className="fadein">
                    {/* Card display */}
                    <div style={{ background: `linear-gradient(160deg, ${sc.bg}, #0a0503)`, border: `1px solid ${sc.accent}40`, borderRadius: "14px", padding: "24px", marginBottom: "14px", textAlign: "center", boxShadow: `0 0 50px ${sc.glow}` }}>
                      <div style={{ fontSize: "56px", marginBottom: "12px" }}>{dailyCard.symbol}</div>
                      <div style={{ fontSize: "10px", color: sc.accent, letterSpacing: "2px", marginBottom: "6px" }}>{dailyCard.suit} · {dailyCard.number}</div>
                      <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(16px,4vw,22px)", color: sc.accent, marginBottom: "14px" }}>{dailyCard.name}</div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" }}>
                        {dailyCard.keywords.map(k => (
                          <span key={k} style={{ background: `${sc.accent}15`, border: `1px solid ${sc.accent}25`, borderRadius: "20px", padding: "3px 10px", fontSize: "11px", color: sc.accent }}>{k}</span>
                        ))}
                      </div>
                      <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#c4a08a", fontStyle: "italic" }}>{dailyCard.meaning}</p>
                    </div>

                    {/* Reversed option */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                      {["Upright", "Reversed"].map(pos => (
                        <button key={pos}
                          onClick={() => setDetailReversed(pos === "Reversed")}
                          style={{ flex: 1, background: (pos === "Reversed") === detailReversed ? `${sc.accent}20` : "transparent", border: `1px solid ${(pos === "Reversed") === detailReversed ? sc.accent : "#2a1a0a"}`, borderRadius: "8px", padding: "8px", color: (pos === "Reversed") === detailReversed ? sc.accent : "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text',serif", fontSize: "14px" }}>
                          {pos}
                        </button>
                      ))}
                    </div>

                    {detailReversed && (
                      <div style={{ background: "rgba(196,113,74,0.05)", border: "1px solid #2a1a0a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
                        <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "2px", marginBottom: "8px" }}>REVERSED</div>
                        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#9a7055", fontStyle: "italic" }}>{dailyCard.reversed}</p>
                      </div>
                    )}

                    {/* AI guidance */}
                    <div style={{ background: "rgba(196,113,74,0.06)", border: "1px solid rgba(196,113,74,0.2)", borderRadius: "12px", padding: "16px", marginBottom: "14px" }}>
                      {!dailyCardInsight && !loadingDailyInsight && (
                        <button onClick={() => getDailyInsight(dailyCard, savedIntention)} style={{ width: "100%", background: "transparent", border: "1px solid #c4714a50", borderRadius: "8px", padding: "10px", color: "#c4714a", fontFamily: "'Cinzel', serif", fontSize: "13px", cursor: "pointer", letterSpacing: "0.5px" }}>
                          ✦ Get today's guidance
                        </button>
                      )}
                      {loadingDailyInsight && <div style={{ color: "#6a4a2a", fontStyle: "italic", fontSize: "14px", textAlign: "center" }} className="pulse">Reading for you...</div>}
                      {dailyCardInsight && (
                        <div className="fadein">
                          <div style={{ fontSize: "10px", color: "#6a4a2a", letterSpacing: "2px", marginBottom: "10px" }}>TODAY'S GUIDANCE</div>
                          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#e8d8c0", fontStyle: "italic" }}>{dailyCardInsight}</p>
                        </div>
                      )}
                    </div>

                    {/* Journal */}
                    {dailyCardInsight && (
                      <div className="fadein" style={{ marginBottom: "14px" }}>
                        <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "2px", marginBottom: "8px" }}>YOUR REFLECTION</div>
                        <textarea
                          value={dailyJournal}
                          onChange={e => setDailyJournal(e.target.value)}
                          placeholder="Write your thoughts here. This is just for you."
                          style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid #2a1a0a", borderRadius: "10px", padding: "12px 14px", color: "#c4a08a", fontFamily: "'Crimson Text', serif", fontSize: "15px", lineHeight: 1.6, resize: "none", outline: "none", minHeight: "90px" }}
                        />
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                      <button onClick={() => setShowDailyCard(false)} style={{ flex: 1, background: "#c4714a", border: "none", borderRadius: "10px", padding: "12px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "13px", cursor: "pointer", letterSpacing: "0.5px" }}>
                        Carry this with me today
                      </button>
                      <button onClick={() => { setDailyCard("ready"); setDailyCardInsight(""); setDailyJournal(""); setDetailReversed(false); }} style={{ background: "transparent", border: "1px solid #2a1a0a", borderRadius: "10px", padding: "12px 14px", color: "#4a3020", fontFamily: "'Crimson Text', serif", fontSize: "13px", cursor: "pointer" }}>
                        Change
                      </button>
                    </div>

                    {/* Do a full spread from here */}
                    <div style={{ textAlign: "center", borderTop: "1px solid #1a0e05", paddingTop: "14px" }}>
                      <p style={{ fontSize: "13px", color: "#4a3020", marginBottom: "10px" }}>Want to go deeper with a full spread?</p>
                      <button onClick={() => { setShowDailyCard(false); handleSpreadFromHome(); }} style={{ background: "transparent", border: "1px solid #c4714a40", borderRadius: "8px", padding: "8px 20px", color: "#c4714a", fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "0.5px" }}>
                        Start a spread →
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        );
      })() : null}
      {/* ═══════════════════════════════════════
          GUIDED SESSION OVERLAY
      ═══════════════════════════════════════ */}
      {guidedSession && (
          <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "#080503", overflowY: "auto" }}>
            <style>{`
              @keyframes breatheIn  { from{transform:scale(0.6);opacity:0.4} to{transform:scale(1);opacity:1} }
              @keyframes breatheOut { from{transform:scale(1);opacity:1} to{transform:scale(0.6);opacity:0.4} }
              @keyframes breatheHold{ from{transform:scale(1)} to{transform:scale(1)} }
              @keyframes cardReveal { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
              .breath-circle { border-radius:50%; width:120px; height:120px; border:1px solid #c4714a40; display:flex; align-items:center; justify-content:center; }
              .breath-in   { animation: breatheIn  2s ease-in-out forwards; }
              .breath-hold { animation: breatheHold 2s ease forwards; }
              .breath-out  { animation: breatheOut 2s ease-in-out forwards; }
              .card-reveal { animation: cardReveal 0.3s ease forwards; }
            `}</style>

            {/* Close button — always visible */}
            <button onClick={closeGuidedSession} style={{ position: "fixed", top: "16px", right: "16px", background: "none", border: "1px solid #2a1a0a", borderRadius: "6px", padding: "6px 14px", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px", zIndex: 10 }}>End session</button>

            <div style={{ maxWidth: "460px", margin: "0 auto", padding: "60px 20px 40px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", justifyContent: "center", textAlign: "center" }}>

              {/* ── SETTLE ── */}
              {guidedSession === "settle" && (
                <div className="fadein">
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "24px" }}>GUIDED READING · {currentSpread?.name.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(20px,5vw,28px)", color: "#c4714a", marginBottom: "16px", lineHeight: 1.4 }}>Find your space</div>
                  <p style={{ fontSize: "16px", color: "#6a4a2a", lineHeight: 1.9, marginBottom: "14px" }}>Put your deck on the table in front of you. Sit comfortably. Prop your phone where you can see it easily.</p>
                  <p style={{ fontSize: "15px", color: "#4a3020", lineHeight: 1.8, marginBottom: "40px" }}>This is your time. There's nowhere else to be.</p>
                  <button onClick={startBreathing} style={{ background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px 48px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "15px", cursor: "pointer", letterSpacing: "1px" }}>
                    I'm ready
                  </button>
                </div>
              )}

              {/* ── BREATHE ── */}
              {guidedSession === "breathe" && (
                <div className="fadein">
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "32px" }}>THREE BREATHS</div>
                  <div className={`breath-circle ${breathPhase === "in" ? "breath-in" : breathPhase === "hold" ? "breath-hold" : "breath-out"}`}
                    style={{ background: `rgba(196,113,74,${breathPhase === "hold" ? 0.15 : 0.08})`, margin: "0 auto 32px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#c4714a", letterSpacing: "1px" }}>
                      {breathPhase === "in" ? "Breathe in" : breathPhase === "hold" ? "Hold" : "Breathe out"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i < breathCount ? "#c4714a" : "#2a1a0a", transition: "background 0.4s" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "15px", color: "#4a3020", fontStyle: "italic" }}>Let everything else go.</p>
                </div>
              )}

              {/* ── INTENTION ── */}
              {guidedSession === "intention" && (
                <div className="fadein" style={{ width: "100%" }}>
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "24px" }}>SET YOUR INTENTION</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(18px,4vw,24px)", color: "#c4714a", marginBottom: "16px", lineHeight: 1.4 }}>
                    {currentSpread?.count <= 3 ? "What do you want to understand today?" : "What is on your mind right now?"}
                  </div>
                  {savedIntention && <p style={{ fontSize: "14px", color: "#4a3020", fontStyle: "italic", marginBottom: "20px" }}>Your intention: "{savedIntention}"</p>}
                  <textarea
                    value={guidedQuestion}
                    onChange={e => setGuidedQuestion(e.target.value)}
                    placeholder={currentSpread?.count <= 3 ? "Type your question, or leave blank to read openly..." : "Describe what's weighing on you, or leave blank..."}
                    style={{ width: "100%", background: "rgba(196,113,74,0.05)", border: "1px solid #2a1a0a", borderRadius: "10px", padding: "14px 16px", color: "#c4a08a", fontFamily: "'Crimson Text', serif", fontSize: "16px", lineHeight: 1.6, resize: "none", outline: "none", minHeight: "90px", marginBottom: "24px", textAlign: "left" }}
                  />
                  <button onClick={() => setGuidedSession("shuffle")} style={{ background: "#c4714a", border: "none", borderRadius: "10px", padding: "13px 48px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "1px" }}>
                    Set my intention →
                  </button>
                </div>
              )}

              {/* ── SHUFFLE ── */}
              {guidedSession === "shuffle" && (
                <div className="fadein">
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "24px" }}>SHUFFLE YOUR DECK</div>
                  <div style={{ fontSize: "48px", marginBottom: "20px", opacity: 0.6 }}>✦</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(18px,4vw,24px)", color: "#c4714a", marginBottom: "16px", lineHeight: 1.4 }}>Pick up your deck</div>
                  <p style={{ fontSize: "16px", color: "#6a4a2a", lineHeight: 1.9, marginBottom: "12px" }}>
                    {guidedQuestion ? `Hold your question in mind: "${guidedQuestion}"` : "Hold your intention in mind."}
                  </p>
                  <p style={{ fontSize: "15px", color: "#4a3020", lineHeight: 1.8, marginBottom: "40px" }}>Shuffle until it feels right. There's no wrong way. When you're done, place the deck face down in front of you.</p>
                  <button onClick={startListening} style={{ background: "#c4714a", border: "none", borderRadius: "10px", padding: "13px 48px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "1px" }}>
                    I'm ready to pull →
                  </button>
                </div>
              )}

              {/* ── LISTENING ── */}
              {guidedSession === "listening" && spread && (
                <div className="fadein" style={{ width: "100%" }}>
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "20px" }}>
                    CARD {currentGuidedSlot + 1} OF {currentSpread.count}
                  </div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(18px,4vw,24px)", color: "#c4714a", marginBottom: "6px" }}>
                    {currentSpread.positions[currentGuidedSlot]}
                  </div>
                  <p style={{ fontSize: "13px", color: "#4a3020", fontStyle: "italic", marginBottom: "28px" }}>{currentSpread.positionDesc[currentGuidedSlot]}</p>

                  {/* Filled slots so far */}
                  {guidedSlots.some(s => s) && (
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
                      {guidedSlots.map((s, i) => s && (
                        <div key={i} style={{ background: "rgba(196,113,74,0.08)", border: `1px solid ${s.confidence === "high" ? "#c4714a60" : s.confidence === "medium" ? "#c4714a30" : "#3a2010"}`, borderRadius: "6px", padding: "4px 10px", fontSize: "11px", color: s.confidence === "high" ? "#c4714a" : "#6a4a2a" }}>
                          {s.card.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Listening status */}
                  {listeningStatus === "listening" && (
                    <div className="fadein" style={{ marginBottom: "24px" }}>
                      <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "1px solid #c4714a", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 1.2s infinite" }}>
                        <div style={{ fontSize: "24px" }}>◉</div>
                      </div>
                      <p style={{ fontSize: "14px", color: "#6a4a2a" }}>Listening... say the card name</p>
                    </div>
                  )}

                  {listeningStatus === "heard" && (
                    <div className="fadein" style={{ marginBottom: "24px" }}>
                      <div style={{ background: "rgba(196,113,74,0.1)", border: "1px solid #c4714a40", borderRadius: "10px", padding: "14px", marginBottom: "8px" }}>
                        <div style={{ fontSize: "11px", color: "#4a3020", letterSpacing: "1px", marginBottom: "6px" }}>HEARD</div>
                        <div style={{ fontFamily: "'Cinzel', serif", color: "#c4714a", fontSize: "16px" }}>
                          {guidedSlots[currentGuidedSlot - 1]?.card.name || guidedSlots[currentGuidedSlot]?.card.name}
                        </div>
                      </div>
                    </div>
                  )}

                  {listeningStatus === "nomatch" && (
                    <div className="fadein" style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "14px", color: "#6a4a2a", marginBottom: "12px" }}>Couldn't quite catch that. Try again or tap to find the card.</p>
                      <button onClick={() => { if (recognitionRef.current) { try { recognitionRef.current.start(); setListeningStatus("listening"); setHeardText(""); } catch {} } }} style={{ background: "transparent", border: "1px solid #c4714a40", borderRadius: "8px", padding: "9px 20px", color: "#c4714a", fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", marginRight: "8px" }}>
                        Try again
                      </button>
                    </div>
                  )}

                  {(listeningStatus === "idle" || listeningStatus === "nomatch" || listeningStatus === "nospeech") && (
                    <div style={{ width: "100%" }}>
                      {listeningStatus !== "nospeech" && (
                        <button onClick={() => {
                          try {
                            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
                            const r = new SR();
                            r.lang = "en-GB";
                            r.onstart = () => setListeningStatus("listening");
                            r.onresult = (e) => {
                              const t = e.results[0][0].transcript;
                              setHeardText(t);
                              const match = matchCardFromSpeech(t);
                              if (match) {
                                setListeningStatus("heard");
                                const ns = [...guidedSlots];
                                ns[currentGuidedSlot] = { card: match.card, reversed: false, confidence: match.confidence };
                                setGuidedSlots(ns);
                                setTimeout(() => {
                                  const next = currentGuidedSlot + 1;
                                  if (next < currentSpread.count) { setCurrentGuidedSlot(next); setListeningStatus("idle"); setHeardText(""); }
                                  else setGuidedSession("confirm");
                                }, 1200);
                              } else setListeningStatus("nomatch");
                            };
                            r.onerror = () => setListeningStatus("nomatch");
                            recognitionRef.current = r;
                            r.start();
                          } catch { setListeningStatus("nospeech"); }
                        }} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "13px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px", marginBottom: "10px" }}>
                          ◉ Say the card name
                        </button>
                      )}
                      {/* Tap fallback — always available */}
                      <div style={{ fontSize: "11px", color: "#3a2010", marginBottom: "10px" }}>or tap to find it</div>
                      <div style={{ maxHeight: "260px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px,1fr))", gap: "6px" }}>
                        {ALL_CARDS.map(card => {
                          const sc = SUIT_COLORS[card.suit];
                          return (
                            <div key={card.id} onClick={() => {
                              const ns = [...guidedSlots];
                              ns[currentGuidedSlot] = { card, reversed: false, confidence: "high" };
                              setGuidedSlots(ns);
                              const next = currentGuidedSlot + 1;
                              if (next < currentSpread.count) { setCurrentGuidedSlot(next); setListeningStatus("idle"); setHeardText(""); }
                              else setGuidedSession("confirm");
                            }} style={{ background: "#0a0603", border: `1px solid ${sc.accent}25`, borderRadius: "7px", padding: "10px 8px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = sc.accent}
                              onMouseLeave={e => e.currentTarget.style.borderColor = `${sc.accent}25`}>
                              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{card.symbol}</div>
                              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "8px", color: sc.accent, lineHeight: 1.3 }}>{card.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── CONFIRM ── */}
              {guidedSession === "confirm" && spread && (
                <div className="fadein" style={{ width: "100%" }}>
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "20px" }}>CONFIRM YOUR CARDS</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#c4714a", marginBottom: "8px" }}>These are your cards</div>
                  <p style={{ fontSize: "14px", color: "#4a3020", marginBottom: "24px" }}>Check each one is correct, and mark any that are reversed.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginBottom: "28px" }}>
                    {guidedSlots.map((s, i) => (!s ? (

                        <div key={i} style={{ background: "rgba(196,113,74,0.04)", border: "1px dashed #2a1a0a", borderRadius: "8px", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ fontSize: "10px", color: "#3a2010", letterSpacing: "1px", marginBottom: "3px" }}>{currentSpread.positions[i]}</div>
                            <div style={{ fontSize: "13px", color: "#4a3020" }}>Not filled</div>
                          </div>
                          <button onClick={() => { setCurrentGuidedSlot(i); setListeningStatus("idle"); setGuidedSession("listening"); }} style={{ background: "transparent", border: "1px solid #c4714a40", borderRadius: "6px", padding: "5px 12px", color: "#c4714a", fontFamily: "'Crimson Text', serif", fontSize: "12px", cursor: "pointer" }}>Fill</button>
                        </div>
) : (


                        <div key={i} style={{ background: `${s.confidence === "low" ? "rgba(196,113,74,0.1)" : "rgba(196,113,74,0.05)"}`, border: `1px solid ${s.confidence === "low" ? "#c4714a50" : "#2a1a0a"}`, borderRadius: "8px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <span style={{ fontSize: "22px" }}>{s.card.symbol}</span>
                              <div>
                                <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "1px", marginBottom: "2px" }}>{currentSpread.positions[i]}</div>
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: SUIT_COLORS[s.card.suit].accent }}>{s.card.name}</div>
                              </div>
                            </div>
                            {s.confidence === "low" && <div style={{ fontSize: "10px", color: "#c4714a", border: "1px solid #c4714a30", borderRadius: "10px", padding: "2px 8px" }}>Check me</div>}
                          </div>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {["Upright","Reversed"].map(pos => (
                              <button key={pos} onClick={() => {
                                const ns = [...guidedSlots];
                                ns[i] = { ...s, reversed: pos === "Reversed" };
                                setGuidedSlots(ns);
                              }} style={{ flex: 1, background: (pos === "Reversed") === s.reversed ? `${SUIT_COLORS[s.card.suit].accent}20` : "transparent", border: `1px solid ${(pos === "Reversed") === s.reversed ? SUIT_COLORS[s.card.suit].accent : "#2a1a0a"}`, borderRadius: "6px", padding: "6px", color: (pos === "Reversed") === s.reversed ? SUIT_COLORS[s.card.suit].accent : "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text',serif", fontSize: "12px" }}>{pos}</button>
                            ))}
                            <button onClick={() => { setCurrentGuidedSlot(i); setListeningStatus("idle"); setGuidedSession("listening"); }} style={{ background: "transparent", border: "1px solid #2a1a0a", borderRadius: "6px", padding: "6px 10px", color: "#4a3020", cursor: "pointer", fontFamily: "'Crimson Text',serif", fontSize: "11px" }}>Change</button>
                          </div>
                        </div>
                      );
                    ))}

                  </div>

                  <button onClick={triggerRevealThenRecord} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "14px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "15px", cursor: "pointer", letterSpacing: "1px" }}>
                    ✦ These are my cards — read them
                  </button>
                </div>
              )}

              {/* ── REVEAL ANIMATION ── */}
              {guidedSession === "reveal" && spread && (
                <div className="fadein" style={{ width: "100%" }}>
                  <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "3px", marginBottom: "28px" }}>YOUR SPREAD</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px,1fr))", gap: "8px", marginBottom: "20px" }}>
                    {guidedSlots.map((s, i) => (!s || i >= revealIndex ? (

                        <div key={i} style={{ background: "#0a0603", border: "1px solid #1a0e05", borderRadius: "8px", padding: "14px 8px", textAlign: "center", minHeight: "80px" }}>
                          <div style={{ fontSize: "24px", opacity: 0.1 }}>✦</div>
                        </div>
) : (


                        <div key={i} className="card-reveal" style={{ background: `${SUIT_COLORS[s.card.suit].bg}cc`, border: `1px solid ${SUIT_COLORS[s.card.suit].accent}50`, borderRadius: "8px", padding: "10px 8px", textAlign: "center" }}>
                          <div style={{ fontSize: "22px", marginBottom: "4px" }}>{s.card.symbol}</div>
                          <div style={{ fontSize: "8px", color: SUIT_COLORS[s.card.suit].accent, fontFamily: "'Cinzel',serif", lineHeight: 1.3 }}>{s.card.name}</div>
                          {s.reversed && <div style={{ fontSize: "8px", color: "#4a3020", marginTop: "2px" }}>↓</div>}
                        </div>
                      );
                    ))}

                  </div>
                  <p style={{ fontSize: "15px", color: "#4a3020", fontStyle: "italic" }} className="pulse">Preparing your reading...</p>
                </div>
              )}

              {/* ── READING ── */}
              {guidedSession === "reading" && spread && (
                <div className="fadein" style={{ width: "100%", textAlign: "left" }}>
                  {/* Live camera — recording reaction */}
                  <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "16px", aspectRatio: "16/9", background: "#0a0603" }}>
                    <video ref={guidedVideoRef} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
                    <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "4px 10px" }}>
                      <div style={{ width: "7px", height: "7px", background: "#e85d04", borderRadius: "50%", animation: "pulse 1s infinite" }} />
                      <span style={{ color: "#fff", fontSize: "11px" }}>Recording</span>
                    </div>
                    <div style={{ position: "absolute", bottom: "8px", right: "10px", fontFamily: "'Cinzel Decorative', serif", fontSize: "11px", color: "#c4714a", background: "rgba(8,5,3,0.7)", padding: "3px 8px", borderRadius: "6px" }}>Aurín</div>
                  </div>

                  {/* Cards summary */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {guidedSlots.map((s, i) => s && (
                      <div key={i} style={{ background: "rgba(196,113,74,0.08)", border: "1px solid #2a1a0a", borderRadius: "6px", padding: "5px 10px", fontSize: "11px" }}>
                        <span style={{ color: "#4a3020", marginRight: "4px" }}>{currentSpread.positions[i]}:</span>
                        <span style={{ color: "#c4714a" }}>{s.card.name}{s.reversed ? " ↓" : ""}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Reading */}
                  <div style={{ background: "rgba(196,113,74,0.06)", border: "1px solid rgba(196,113,74,0.2)", borderRadius: "12px", padding: "16px", marginBottom: "14px" }}>
                    {!readingInsight && !loadingInsight && (
                      <button onClick={getReadingInsight} style={{ width: "100%", background: "transparent", border: "1px solid #c4714a50", borderRadius: "8px", padding: "11px", color: "#c4714a", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" }}>
                        ✦ Read my cards
                      </button>
                    )}
                    {loadingInsight && <div style={{ color: "#4a3020", fontStyle: "italic", fontSize: "15px", textAlign: "center" }} className="pulse">Reading your cards...</div>}
                    {readingInsight && (
                      <div className="fadein">
                        <div style={{ fontSize: "10px", color: "#4a3020", letterSpacing: "2px", marginBottom: "10px" }}>YOUR READING</div>
                        <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#c4a08a", fontStyle: "italic" }}>{readingInsight}</p>
                      </div>
                    )}
                  </div>

                  {readingInsight && (
                    <button onClick={() => {
                      stopGuidedRecording();
                      closeGuidedSession();
                      setScreen("reading");
                    }} style={{ width: "100%", background: "#c4714a", border: "none", borderRadius: "10px", padding: "13px", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" }}>
                      Save & share this reading →
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
      </div>
        </div>
      )}
    </div>
  );
}

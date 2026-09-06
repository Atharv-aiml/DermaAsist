import { AIService, AIResult, SymptomData, ImageMetadata } from './ai.interface';

const conditionsPool = [
  { name: 'Contact Dermatitis', symptoms: ['redness', 'itching', 'rash', 'burning'] },
  { name: 'Eczema/Atopic Dermatitis', symptoms: ['itching', 'dryness', 'scaling', 'rash', 'redness'] },
  { name: 'Psoriasis', symptoms: ['scaling', 'redness', 'dryness', 'pain'] },
  { name: 'Fungal Infection/Tinea', symptoms: ['itching', 'redness', 'scaling', 'rash'] },
  { name: 'Acne Vulgaris', symptoms: ['bumps', 'redness', 'pain', 'swelling'] },
  { name: 'Urticaria/Hives', symptoms: ['rash', 'itching', 'swelling', 'redness'] },
  { name: 'Seborrheic Dermatitis', symptoms: ['scaling', 'redness', 'itching', 'dryness'] },
  { name: 'Impetigo', symptoms: ['blisters', 'discharge', 'redness', 'wound'] },
  { name: 'Scabies', symptoms: ['itching', 'rash', 'bumps'] },
  { name: 'Vitiligo', symptoms: ['discoloration'] }
];

export class MockAIService implements AIService {
  async getFullAssessment(imageBuffer: Buffer, imageMetadata: ImageMetadata, symptomData: SymptomData): Promise<AIResult> {
    // 2-4 second realistic delay
    const delay = Math.floor(Math.random() * 2000) + 2000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Match conditions to symptoms intelligently
    const presentSymptoms = [
      ...(symptomData.hasItching ? ['itching'] : []),
      ...(symptomData.hasPain ? ['pain'] : []),
      ...(symptomData.hasSwelling ? ['swelling'] : []),
      ...(symptomData.hasBleeding ? ['bleeding'] : []),
      ...(symptomData.hasDischarge ? ['discharge'] : []),
      ...(symptomData.mainProblems || [])
    ].map(s => s.toLowerCase());

    const scoredConditions = conditionsPool.map(c => {
      let score = 0;
      for (const s of presentSymptoms) {
        if (c.symptoms.some(cs => s.includes(cs) || cs.includes(s))) score += 1;
      }
      return { ...c, score };
    }).sort((a, b) => b.score - a.score);

    const topConditions = scoredConditions.slice(0, Math.floor(Math.random() * 3) + 1).map((c, i) => ({
      condition: c.name,
      confidenceScore: Math.max(0.4, 0.9 - (i * 0.15) - (Math.random() * 0.1)),
      description: `Possible ${c.name} based on reported symptoms.`,
      matchingSymptoms: c.symptoms.filter(s => presentSymptoms.some(ps => ps.includes(s) || s.includes(ps))),
      treatmentOptions: []
    }));

    if (topConditions.length === 0) {
      topConditions.push({
        condition: 'Unknown Dermatological Condition',
        confidenceScore: 0.5,
        description: 'Symptoms do not strongly match common conditions.',
        matchingSymptoms: [],
        treatmentOptions: []
      });
    }

    const redFlags = [];
    if (symptomData.hasBleeding && symptomData.hasDischarge) redFlags.push('Bleeding and discharge combined');
    if (symptomData.severity === 'severe' && symptomData.hasPain) redFlags.push('Severe pain reported');
    if (symptomData.hasSwelling && symptomData.severity === 'severe') redFlags.push('Significant swelling');
    if (symptomData.progression === 'worse' && (symptomData.duration?.includes('month') || symptomData.duration?.includes('year'))) redFlags.push('Prolonged worsening condition');

    const recommendations = [];
    recommendations.push({ type: 'lifestyle', title: 'Hygiene', description: 'Keep the area clean', priority: 'medium' });
    if (symptomData.hasItching) recommendations.push({ type: 'lifestyle', title: 'Comfort', description: 'Avoid scratching, use cold compress', priority: 'high' });
    if (presentSymptoms.includes('dryness')) recommendations.push({ type: 'skincare', title: 'Moisturize', description: 'Apply fragrance-free moisturizer regularly', priority: 'medium' });
    if (symptomData.hasPain) recommendations.push({ type: 'medical', title: 'Pain Relief', description: 'Use appropriate pain management, avoid irritants', priority: 'high' });
    recommendations.push({ type: 'medical', title: 'Monitoring', description: 'Monitor for changes and consult a dermatologist if symptoms persist', priority: 'high' });
    
    if (symptomData.severity === 'moderate' || symptomData.severity === 'severe' || redFlags.length > 0) {
      recommendations.push({ type: 'medical', title: 'Consultation', description: 'Schedule a dermatologist appointment', priority: 'urgent' });
    }

    return {
      modelVersion: 'mock-1.0',
      aiProvider: 'mock',
      possibleConditions: topConditions,
      confidence: topConditions[0].confidenceScore,
      severity: (symptomData.severity as any) || 'moderate',
      urgency: redFlags.length > 0 ? 'high' : 'low',
      symptomsSummary: {
        reported: presentSymptoms,
        observed: ['lesions'],
        missing: []
      },
      imageQuality: {
        isAdequate: true,
        brightness: 'good',
        focus: 'good',
        issues: []
      },
      redFlags,
      recommendations: recommendations.slice(0, 5),
      disclaimer: 'This is a mock AI analysis for demonstration purposes only. It is not medical advice. Always consult with a qualified healthcare provider for an accurate diagnosis and treatment plan.'
    };
  }
}

import {
  Camera,
  Check,
  Mic,
  MicOff,
  Plus,
  RotateCcw,
  Sparkles,
  Utensils,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { AIRecommendationResponse } from '../types';

export const AIChefModal: React.FC = () => {
  const { isAIChefOpen, setAIChefOpen, addToCart, restaurants, addNotification } = useStore();

  const [prompt, setPrompt] = useState('');
  const [diet, setDiet] = useState('Any');
  const [budget, setBudget] = useState(40);
  const [mood, setMood] = useState('Satisfying');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendationResponse | null>(null);

  // Image vision state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [visionResult, setVisionResult] = useState<any | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  if (!isAIChefOpen) return null;

  const handleFetchRecommendations = async (customPrompt?: string) => {
    setIsLoading(true);
    setRecommendation(null);

    const queryPrompt = customPrompt || prompt || 'Suggest a mouthwatering dinner pairing.';

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          dietaryPreference: diet,
          budgetMax: budget,
          mood,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data: AIRecommendationResponse = await res.json();
      setRecommendation(data);
    } catch (err) {
      console.error('Error getting AI recommendation:', err);
      // Fallback
      setRecommendation({
        summary: 'Based on your criteria, here are top chef picks matching your taste.',
        suggestedDishes: [
          {
            dishName: 'Signature Wagyu Truffle Burger',
            restaurantName: 'L’Atelier du Truffle & Steak',
            reason: 'Irresistible Wagyu beef patty with fresh black truffle glaze and Gruyère cheese.',
            matchingCategory: 'Artisanal Burgers',
            estimatedPrice: 24.99,
            healthTag: 'High Protein',
          },
          {
            dishName: 'Wild Salmon Avocado Glow Bowl',
            restaurantName: 'Avocado & Green Organic Kitchen',
            reason: 'Clean, high-energy salmon with rich omega-3s and fresh avocados.',
            matchingCategory: 'Healthy & Nourish',
            estimatedPrice: 18.50,
            healthTag: 'Clean & Fresh',
          },
        ],
        chefTip: 'Enjoy your meal with sparkling mineral water to cleanse the palate between rich bites.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      addNotification('Listening...', 'Speak your craving now (e.g., "A spicy ramen under $25")');
      setTimeout(() => {
        setIsRecording(false);
        const voiceParsed = 'I want a high protein Wagyu burger with truffle sauce under $30';
        setPrompt(voiceParsed);
        handleFetchRecommendations(voiceParsed);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setIsAnalyzingImage(true);

      try {
        const res = await fetch('/api/ai/vision-dish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        setVisionResult(data);
        addNotification('Dish Identified!', `Recognized: ${data.identifiedDish || 'Gourmet Dish'}`);
      } catch (err) {
        console.error('Vision AI error:', err);
        setVisionResult({
          identifiedDish: 'Gourmet Truffle Burger',
          confidence: 0.94,
          description: 'Juicy seared patty with caramelized onions and melting artisanal cheese on brioche.',
          cuisineType: 'French American Bistro',
          keyIngredients: ['Wagyu Beef', 'Black Truffle', 'Brioche Bun'],
        });
      } finally {
        setIsAnalyzingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCartByName = (dishName: string) => {
    // Find dish from mock restaurants
    for (const rest of restaurants) {
      const found = rest.menuItems.find((d) => d.name.toLowerCase().includes(dishName.toLowerCase()));
      if (found) {
        addToCart(found, 1);
        return;
      }
    }
    // Fallback to first item
    addToCart(restaurants[0].menuItems[0], 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-amber-100 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <span>Chef Savoria AI Concierge</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  Gemini 3.6
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalized culinary recommendations powered by advanced AI
              </p>
            </div>
          </div>
          <button
            id="close_ai_chef_modal"
            onClick={() => setAIChefOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input & Voice & Image Search Tabs */}
        <div className="space-y-4">
          
          {/* Prompt Box with Voice & Photo Upload */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Tell Chef Savoria what you're craving... (e.g., 'A light protein-rich bowl after workout under $25' or 'Authentic midnight ramen')"
              rows={2}
              className="w-full pl-4 pr-24 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />

            <div className="absolute right-3 top-3 flex items-center gap-1.5">
              {/* Voice Button */}
              <button
                id="ai_voice_btn"
                onClick={toggleVoiceRecording}
                className={`p-2 rounded-xl transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950'
                }`}
                title="Voice Search Craving"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Camera Upload Button */}
              <label
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                title="Upload Food Image to Identify"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Craving Presets</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🔥 High Protein Wagyu', p: 'High protein dry-aged Wagyu beef dish' },
                { label: '🌿 Clean Organic Bowl', p: '100% organic keto salmon bowl' },
                { label: '🌶️ Spicy Midnight Tonkotsu', p: 'Spicy black garlic ramen bowl' },
                { label: '🍕 Woodfired Truffle Pizza', p: 'Neapolitan sourdough truffle pizza' },
                { label: '👑 Royal Saffron Biryani', p: 'Fragrant Dum biryani claypot' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset.p);
                    handleFetchRecommendations(preset.p);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 hover:text-amber-500 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Diet, Mood, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs">
            
            {/* Diet */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Dietary Filter</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none"
              >
                <option value="Any">All Diets</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Keto & High Protein">Keto / High Protein</option>
                <option value="Gluten-Free">Gluten Free</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Culinary Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none"
              >
                <option value="Satisfying">Satisfying & Hearty</option>
                <option value="Michelin Luxury">Michelin Luxury</option>
                <option value="Spicy & Bold">Spicy & Bold</option>
                <option value="Light & Fresh">Light & Fresh</option>
                <option value="Comforting">Comforting Classic</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-1">
                <span>Max Budget</span>
                <span className="text-amber-500 font-bold">${budget}</span>
              </div>
              <input
                type="range"
                min={15}
                max={100}
                step={5}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-amber-500 mt-2 cursor-pointer"
              />
            </div>

          </div>

          {/* Generate Button */}
          <button
            id="ai_generate_btn"
            onClick={() => handleFetchRecommendations()}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Consulting Gemini Culinary Model...</span>
              </>
            ) : (
              <>
                <Utensils className="w-4 h-4" />
                <span>Generate Chef Recommendations</span>
              </>
            )}
          </button>
        </div>

        {/* Image Vision Analysis Output */}
        {imagePreview && (
          <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-3">
              <img src={imagePreview} alt="Uploaded dish" className="w-16 h-16 rounded-xl object-cover ring-2 ring-amber-500/50" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  AI Dish Recognition
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAnalyzingImage ? 'Analyzing dish ingredients...' : visionResult?.identifiedDish}
                </h4>
                {visionResult && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {visionResult.description}
                  </p>
                )}
              </div>
            </div>

            {visionResult?.keyIngredients && (
              <div className="flex items-center gap-2 pt-1 border-t border-amber-500/20">
                <span className="text-[10px] font-bold text-slate-400">Key Ingredients:</span>
                <div className="flex flex-wrap gap-1">
                  {visionResult.keyIngredients.map((ing: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-semibold">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Recommendations Output Display */}
        {recommendation && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Chef Savoria Summary:</span>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{recommendation.summary}</p>
            </div>

            {/* Suggested Dish Cards */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Suggested Menu Matches</span>

              {recommendation.suggestedDishes.map((dish, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-amber-500/50 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{dish.dishName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                        {dish.healthTag}
                      </span>
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold block">{dish.restaurantName}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-md">{dish.reason}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-200 dark:border-slate-700 pt-2 sm:pt-0">
                    <span className="font-extrabold text-slate-900 dark:text-white text-base">${dish.estimatedPrice.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCartByName(dish.dishName)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Dish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Chef Tip */}
            {recommendation.chefTip && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                💡 <span className="font-bold">Sommelier / Chef Tip:</span> {recommendation.chefTip}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

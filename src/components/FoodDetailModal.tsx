import { Check, Flame, Minus, Plus, Star, UtensilsCrossed, X } from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const FoodDetailModal: React.FC = () => {
  const { isFoodDetailOpen, closeFoodDetail, selectedMenuItem, addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isFoodDetailOpen || !selectedMenuItem) return null;

  const item = selectedMenuItem;

  const toggleOption = (groupTitle: string, optionName: string, price: number) => {
    const existsIndex = selectedOptions.findIndex(
      (o) => o.groupTitle === groupTitle && o.optionName === optionName
    );
    if (existsIndex > -1) {
      setSelectedOptions(selectedOptions.filter((_, i) => i !== existsIndex));
    } else {
      setSelectedOptions([...selectedOptions, { groupTitle, optionName, price }]);
    }
  };

  const extraPrice = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
  const unitPrice = item.price + extraPrice;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedOptions, specialInstructions);
    closeFoodDetail();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4">
        
        {/* Cover Image Header */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

          {/* Close Button */}
          <button
            id="close_food_detail_btn"
            onClick={closeFoodDetail}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Overlays */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                item.isVeg ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
              }`}>
                {item.isVeg ? 'Veg Pure' : 'Non-Veg Gourmet'}
              </span>
              {item.isBestseller && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  Bestseller
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-400 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating}</span>
              <span className="text-slate-400 text-[10px]">({item.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-serif">{item.name}</h2>
              <span className="text-xl font-extrabold text-amber-500 font-mono">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{item.description}</p>
          </div>

          {/* Nutrition Macros */}
          {item.nutrition && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Nutritional Information</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Calories</span>
                  <span className="font-extrabold text-amber-500 text-xs">{item.nutrition.calories} kcal</span>
                </div>
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Protein</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{item.nutrition.proteinGrams}g</span>
                </div>
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Carbs</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{item.nutrition.carbsGrams}g</span>
                </div>
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Fat</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{item.nutrition.fatGrams}g</span>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Artisanal Ingredients</span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization Options */}
          {item.customizationGroups && item.customizationGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{group.title}</span>
                <span className="text-[10px] text-amber-500 font-semibold">{group.required ? 'Required' : 'Optional'}</span>
              </div>

              <div className="space-y-1.5">
                {group.options.map((opt) => {
                  const isChecked = selectedOptions.some((o) => o.groupTitle === group.title && o.optionName === opt.name);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOption(group.title, opt.name, opt.price)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-semibold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{opt.name}</span>
                      </div>
                      {opt.price > 0 && <span className="font-mono text-amber-500">+${opt.price.toFixed(2)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kitchen Preparation Notes</label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Dressing on side, no onions, extra crispy..."
              className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Quantity & Add Button Footer */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-slate-900 dark:text-white px-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              id="confirm_add_to_cart_btn"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center justify-between"
            >
              <span>Add to Gourmet Bag</span>
              <span className="font-mono text-sm">${totalPrice}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

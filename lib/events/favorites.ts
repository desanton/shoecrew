// Favorites event system - stub for backend integration
// This module provides a simple event emitter pattern for favorite actions

type FavoriteEventHandler = (productId: string, isFavorited: boolean) => void;

const listeners: FavoriteEventHandler[] = [];

export const favoritesEvents = {
  /**
   * Subscribe to favorite events
   * @param handler - Callback function when a product is favorited/unfavorited
   * @returns Unsubscribe function
   */
  subscribe(handler: FavoriteEventHandler): () => void {
    listeners.push(handler);
    return () => {
      const index = listeners.indexOf(handler);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },

  /**
   * Emit a favorite event - called when user favorites/unfavorites a product
   * @param productId - The product ID being favorited
   * @param isFavorited - Whether the product is now favorited
   */
  emit(productId: string, isFavorited: boolean): void {
    // Log for debugging - this is where backend integration would happen
    console.log(`[Favorites] Product ${productId} ${isFavorited ? "favorited" : "unfavorited"}`);
    
    // Notify all listeners
    listeners.forEach(handler => handler(productId, isFavorited));
    
    // TODO: Backend integration
    // This is where you would call an API to persist the favorite status
    // Example:
    // fetch('/api/favorites', {
    //   method: isFavorited ? 'POST' : 'DELETE',
    //   body: JSON.stringify({ productId }),
    // });
  }
};

// Initialize safety status if it doesn't exist
export const initSafetyStatus = () => {
  const existing = localStorage.getItem('safetyStatus');
  if (!existing) {
    const initialStatus = {
      status: 'safe',
      message: 'Safe Zone',
      timestamp: Date.now()
    };
    localStorage.setItem('safetyStatus', JSON.stringify(initialStatus));
  }
};

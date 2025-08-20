import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import { Store } from 'redux';
import Navigation from './Navigation';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/weather',
    state: null,
    key: 'test',
    search: '',
    hash: '',
  }),
}));

// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { 
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock usePlaceContext
const mockUsePlaceContext = () => ({
  place: {
    redirectURL: '/test-location',
  },
});

// Create a mock SpeechContext
const mockCancelSpeech = jest.fn();

// Mock the speech context with all required properties
const mockSpeechContext = {
  cancelSpeech: mockCancelSpeech,
  speakText: jest.fn(),
  isSpeaking: false,
  error: null,
  voices: [],
  setSelectedVoice: jest.fn(),
};

// Create a mock context provider
const MockSpeechProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div data-testid="speech-provider">
      {children}
    </div>
  );
};

// Mock the contexts module with CommonJS syntax
const originalContexts = jest.requireActual('../../contexts');

jest.mock('../../contexts', () => ({
  __esModule: true,
  ...originalContexts,
  usePlaceContext: () => mockUsePlaceContext(),
  SpeechContext: {
    ...originalContexts.SpeechContext,
    _currentValue: mockSpeechContext,
    _currentValue2: mockSpeechContext,
    Consumer: ({ children }: { children: (value: typeof mockSpeechContext) => React.ReactNode }) => 
      children(mockSpeechContext),
    Provider: MockSpeechProvider,
  }
}));

// Mock components
jest.mock('./Navigation.styles', () => ({
  NavigationPaper: 'div',
  NavigationToolbar: 'div',
  NavigationButton: 'button',
  NavigationLeftBox: 'div',
  NavigationRightBox: 'div',
  NavigationLeftBoxItem: 'div',
  mobileHidden: {},
  tabletVisible: {},
}));

// Mock Place and Time components
jest.mock('./Place', () => 'div');
jest.mock('./Time', () => 'div');
jest.mock('./ResetButton', () => 'button');

// Mock reducer
interface RootState {
  hasFavorites: boolean;
}

interface SetHasFavoritesAction extends AnyAction {
  type: 'setHasFavorites';
  payload: boolean;
}

describe('Navigation Component - No Favorites Scenario', () => {
  let store: Store;
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    
    store = configureStore({ 
      reducer: (state: RootState = { hasFavorites: false }, action: SetHasFavoritesAction) => {
        if (action.type === 'setHasFavorites') {
          return { ...state, hasFavorites: action.payload };
        }
        return state;
      },
      preloadedState: { hasFavorites: false }
    });
  });

  const renderWithProviders = (ui: React.ReactNode) => {
    // Reset the mock before each render
    mockCancelSpeech.mockClear();
    
    return render(
      <MockSpeechProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/weather']}>
            <Routes>
              <Route path="/weather" element={ui} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </MockSpeechProvider>
    );
  };
  
  // Add a test to verify SpeechContext is being used
  it('calls cancelSpeech when a navigation button is clicked', () => {
    renderWithProviders(<Navigation />);
    
    // Click the home button
    fireEvent.click(screen.getByText('navigation.home'));
    
    // Verify cancelSpeech was called
    expect(mockCancelSpeech).toHaveBeenCalled();
  });

  it('renders navigation with all main elements', () => {
    renderWithProviders(<Navigation />);
    
    // Check main navigation elements
    expect(screen.getByText('navigation.weather')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Check all navigation buttons
    const navButtons = [
      'navigation.home',
      'navigation.search',
      'navigation.weather_page',
      'navigation.forecast',
      'navigation.comparison'
    ];
    
    navButtons.forEach(buttonText => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });

  it('disables comparison button when there are no favorites', () => {
    renderWithProviders(<Navigation />);
    
    const comparisonButton = screen.getByText('navigation.comparison');
    expect(comparisonButton).toBeDisabled();
  });

  it('calls navigate with correct path when navigation items are clicked', () => {
    renderWithProviders(<Navigation />);
    
    // Test home button
    fireEvent.click(screen.getByText('navigation.home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
    
    // Test search button
    fireEvent.click(screen.getByText('navigation.search'));
    expect(mockNavigate).toHaveBeenCalledWith('/search');
    
    // Test weather button
    fireEvent.click(screen.getByText('navigation.weather_page'));
    expect(mockNavigate).toHaveBeenCalledWith('/weather/test-location');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    // Mock mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600, // Mobile width
    });
    
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(max-width: 900px)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    
    renderWithProviders(<Navigation />);
    
    // Menu should be closed by default
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Click menu button
    const menuButton = screen.getByLabelText('open menu');
    fireEvent.click(menuButton);
    
    // Menu should now be open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click menu button again to close
    fireEvent.click(menuButton);
    
    // Menu should be closed again
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

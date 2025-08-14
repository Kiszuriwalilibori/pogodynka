import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import { Store } from 'redux';
import Navigation from './Navigation';
import reducer from '../../js/Redux/reducer';

// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

// Mock hooks
jest.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    Favorites: {
      getLength: () => 2,
      placeAlreadyStored: () => false,
    },
  }),
}));

// Mock contexts
jest.mock('../../contexts', () => ({
  SpeechContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

// Mock components
jest.mock('./Navigation.styles', () => ({
  NavigationPaper: 'div',
  NavigationToolbar: 'div',
  NavigationButton: 'button',
  NavigationLeftBox: 'div',
  NavigationRightBox: 'div',
  NavigationLeftBoxItem: 'div',
}));

// Mock Place and Time components
jest.mock('./Place', () => 'div');
jest.mock('./Time', () => 'div');

// Mock reducer
interface RootState {
  hasFavorites: boolean;
}

interface SetHasFavoritesAction extends AnyAction {
  type: 'setHasFavorites';
  payload: boolean;
}

jest.mock('../../js/Redux/reducer', () => ({
  reducer: (state: RootState = { hasFavorites: false }, action: SetHasFavoritesAction) => {
    if (action.type === 'setHasFavorites') {
      return { ...state, hasFavorites: action.payload };
    }
    return state;
  },
}));

describe('Navigation Component', () => {
  let store: Store;
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({ 
      reducer,
      preloadedState: { hasFavorites: false }
    });
  });

  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/weather']}>
          <Routes>
            <Route path="/weather" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByText('navigation.weather')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('navigation.home')).toBeInTheDocument();
    expect(screen.getByText('navigation.search')).toBeInTheDocument();
    expect(screen.getByText('navigation.weather_page')).toBeInTheDocument();
    expect(screen.getByText('navigation.forecast')).toBeInTheDocument();
    expect(screen.getByText('navigation.comparison')).toBeInTheDocument();
  });

  it('handles navigation correctly', () => {
    renderWithProviders(<Navigation />);
    
    const searchButton = screen.getByText('navigation.search');
    fireEvent.click(searchButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('disables comparison button when no favorites', () => {
    store.dispatch({ type: 'setHasFavorites', payload: false } as AnyAction);
    renderWithProviders(<Navigation />);
    
    const comparisonButton = screen.getByText('navigation.comparison');
    expect(comparisonButton).toBeDisabled();
  });

  it('enables comparison button when favorites exist', () => {
    store.dispatch({ type: 'setHasFavorites', payload: true } as AnyAction);
    renderWithProviders(<Navigation />);
    
    const comparisonButton = screen.getByText('navigation.comparison');
    expect(comparisonButton).not.toBeDisabled();
  });

  it('does not render on landing page', () => {
    const { container } = renderWithProviders(<Navigation />);
    
    expect(container).toBeEmptyDOMElement();
  });
});

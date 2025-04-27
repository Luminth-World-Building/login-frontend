// Branding configuration for login-frontend (easily override for other apps)
export interface BrandingConfig {
  appName: string;
  logoSrc: string;
  headlineFont: string;
  bodyFont: string;
  colorPalette: string[];
  backgroundColor: string;
  accentColor: string;
  description?: string;
}

export const defaultBranding: BrandingConfig = {
  appName: 'Luminth',
  logoSrc: '/src/images/logo.png', // Place your logo here
  headlineFont: 'serif', // Replace with actual font if needed
  bodyFont: 'sans-serif',
  colorPalette: ['#E7E8E6', '#283138', '#3A5C54'],
  backgroundColor: '#19202A',
  accentColor: '#3A5C54',
  description: 'Craft Your Universe',
};

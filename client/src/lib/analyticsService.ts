/**
 * Analytics Service Integration
 * Supports Plausible and Fathom for tracking user engagement
 */

export type AnalyticsProvider = 'plausible' | 'fathom';

export interface AnalyticsConfig {
  provider: AnalyticsProvider;
  domain?: string; // Plausible
  siteId?: string; // Fathom
  enabled: boolean;
}

/**
 * Initialize analytics based on provider
 */
export function initializeAnalytics(config: AnalyticsConfig): void {
  if (!config.enabled) return;

  if (config.provider === 'plausible') {
    initPlausible(config.domain || window.location.hostname);
  } else if (config.provider === 'fathom') {
    initFathom(config.siteId || '');
  }
}

/**
 * Initialize Plausible Analytics
 */
function initPlausible(domain: string): void {
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', domain);
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}

/**
 * Initialize Fathom Analytics
 */
function initFathom(siteId: string): void {
  const script = document.createElement('script');
  script.src = `https://cdn.usefathom.com/script.js`;
  script.setAttribute('data-site', siteId);
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }

  // Fathom
  if (window.fathom) {
    window.fathom.trackGoal(eventName, 0);
  }

  // Console log for debugging
  console.log(`[Analytics] Event: ${eventName}`, properties);
}

/**
 * Track page view
 */
export function trackPageView(path: string): void {
  // Plausible
  if (window.plausible) {
    window.plausible('pageview', { u: window.location.origin + path });
  }

  // Fathom
  if (window.fathom) {
    window.fathom.trackPageview();
  }

  console.log(`[Analytics] Page view: ${path}`);
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string): void {
  trackEvent('cta_click', { cta: ctaName });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(): void {
  let maxScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollPercentage =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      // Track at 25%, 50%, 75%, 100%
      if (maxScroll >= 25 && maxScroll < 50) {
        trackEvent('scroll_depth', { depth: '25%' });
      } else if (maxScroll >= 50 && maxScroll < 75) {
        trackEvent('scroll_depth', { depth: '50%' });
      } else if (maxScroll >= 75 && maxScroll < 100) {
        trackEvent('scroll_depth', { depth: '75%' });
      } else if (maxScroll >= 100) {
        trackEvent('scroll_depth', { depth: '100%' });
      }
    }
  });
}

/**
 * Track shader performance
 */
export function trackShaderPerformance(fps: number, gpuMemory: number): void {
  trackEvent('shader_performance', {
    fps: Math.round(fps),
    gpu_memory_mb: Math.round(gpuMemory),
  });
}

/**
 * Track feature card interaction
 */
export function trackFeatureCardView(featureName: string): void {
  trackEvent('feature_card_view', { feature: featureName });
}

/**
 * Track pricing tier view
 */
export function trackPricingTierView(tierName: string): void {
  trackEvent('pricing_tier_view', { tier: tierName });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(success: boolean): void {
  trackEvent('newsletter_signup', { success });
}

// Extend window type for analytics
declare global {
  interface Window {
    plausible?: (eventName: string, options?: Record<string, unknown>) => void;
    fathom?: {
      trackPageview: () => void;
      trackGoal: (goalId: string, value: number) => void;
    };
  }
}

/**
 * Email Service Integration
 * Supports Mailchimp and SendGrid for newsletter subscriptions
 */

export type EmailProvider = 'mailchimp' | 'sendgrid';

export interface EmailServiceConfig {
  provider: EmailProvider;
  apiKey: string;
  listId?: string; // Mailchimp
  fromEmail?: string; // SendGrid
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

/**
 * Mailchimp Integration
 */
export async function subscribeMailchimp(
  email: string,
  apiKey: string,
  listId: string,
): Promise<SubscribeResponse> {
  try {
    // Extract server prefix from API key (e.g., "us1" from "abc123def456-us1")
    const serverPrefix = apiKey.split('-')[1];
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
        tags: ['newsletter'],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Subscription failed',
    };
  }
}

/**
 * SendGrid Integration
 */
export async function subscribeSendGrid(
  email: string,
  apiKey: string,
): Promise<SubscribeResponse> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contacts: [
          {
            email,
            custom_fields: {
              source: 'newsletter_signup',
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Subscription failed',
    };
  }
}

/**
 * Generic subscribe function
 */
export async function subscribeToNewsletter(
  email: string,
  config: EmailServiceConfig,
): Promise<SubscribeResponse> {
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Please enter a valid email address',
    };
  }

  if (config.provider === 'mailchimp') {
    if (!config.listId) {
      return {
        success: false,
        message: 'Mailchimp list ID not configured',
      };
    }
    return subscribeSendGrid(email, config.apiKey);
  }

  if (config.provider === 'sendgrid') {
    return subscribeSendGrid(email, config.apiKey);
  }

  return {
    success: false,
    message: 'Email provider not configured',
  };
}

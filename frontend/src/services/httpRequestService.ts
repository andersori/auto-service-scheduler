// Utilitário para fetch com timeout global
export async function fetchWithTimeout(resource: RequestInfo, options: RequestInit = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(resource, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// HTTP Service with common methods
const httpRequestService = {
  async get(url: string, headers: Record<string, string> = {}) {
    return fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
  },

  async post(url: string, data: any, headers: Record<string, string> = {}) {
    return fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    });
  },

  async put(url: string, data: any, headers: Record<string, string> = {}) {
    return fetchWithTimeout(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    });
  },

  async delete(url: string, headers: Record<string, string> = {}) {
    return fetchWithTimeout(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
  }
};

export default httpRequestService;
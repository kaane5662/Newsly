export function getAuthToken() {
    const cookies = document.cookie.split('; ');
    // Loop through the cookies to find the one containing the CSRF token
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'authtoken') {
        // Return the CSRF token value
        return decodeURIComponent(value);
      }
    }
    // Return null if the CSRF token cookie is not found
    return null;
}
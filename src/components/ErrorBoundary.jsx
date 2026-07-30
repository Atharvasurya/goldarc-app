import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'sans-serif',
          backgroundColor: '#faf8f5',
          color: '#1a1a1a'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#b48629' }}>
              GoldArc Portal Notice
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
              The application encountered a brief runtime issue. Details below:
            </p>
            
            <div style={{
              textAlign: 'left',
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#dc2626',
              marginBottom: '1.5rem',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              <strong>Error:</strong> {this.state.error?.toString() || 'Unknown Error'}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyCenter: 'center' }}>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Clear Cache & Reset
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#d6ab4b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
